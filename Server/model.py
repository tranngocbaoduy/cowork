import json

from Server import db, login_manager
from datetime import datetime
from flask import current_app 
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask_login import UserMixin, logout_user

@login_manager.user_loader
def load_user(user_id): 
    return User.objects.filter(email=user_id).first() 

class JsonSerializable(object):
    def toJson(self):
        return json.dumps(self.__dict__)

    def __repr__(self):
        return self.toJson()
 
class Vocabulary(db.Document): 
    hiragana = db.StringField(required=True)
    katakana = db.StringField()
    kanji = db.StringField()
    romanji = db.StringField()
    vi_translate = db.StringField()
    en_translate = db.StringField()
    lesson = db.StringField() 
    created_date = db.DateTimeField(default = datetime.utcnow())

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4) 
 
class Role(db.Document):
    name = db.StringField(max_length=25,required=True)
    is_activate = db.BooleanField(default=True)

class User(db.Document, UserMixin,JsonSerializable):
    # query_class = UserModel
    phone = db.StringField(max_length=50,required=True)  
    email = db.StringField(max_length=50,required=True)
    first_name = db.StringField(max_length=1000,required=True, default="")
    last_name = db.StringField(max_length=100,required=True, default="")
    username = db.StringField(max_length=50,required=True, primary_key=True)
    image_file = db.StringField(max_length=50,required=True, default='avatar.png')
    password = db.StringField(max_length=100,required=True)
    # address = db.StringField(max_length=200,required=True, default="")
    role = db.StringField(max_length=100,required=True)
    created_date = db.DateTimeField(default = datetime.utcnow())  
    # birth = db.DateTimeField(default = datetime.utcnow())
    # gender = db.StringField(max_length=10,required=True, default="") 
    # status = db.BooleanField(default=True) 
    # is_activate = db.BooleanField(default=True) 
    role = db.ReferenceField(Role, required=True)  
    # is_confirmed = db.BooleanField(default=True) 
    # list_friend = db.ListField(db.ReferenceField(ContactGroup,default=[])) 
    # get code token for reset password
    def get_reset_token(self, expires_sec = 1800):
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    def get_login_token(self, expires_sec = 600):
        s = Serializer(current_app.config['SECRET_KEY']+'login', expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.objects.filter(email=user_id).first()

    @staticmethod
    def verify_login_token(token):
        s = Serializer(current_app.config['SECRET_KEY']+'login')
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.objects.filter(email=user_id).first()

    def __repr__(self):
        return f"User('{self.username}','{self.email}','{self.password}','{self.image_file}','{self.role}')" 

class ContactGroup(db.Document):
    name = db.StringField(required=True)
    list_people = db.ListField(db.ReferenceField(User, default=[]))
    created_date = db.DateTimeField(default = datetime.utcnow())

class Task(db.Document):
    name = db.StringField(required=True)
    content = db.StringField(required=True)
    date_start = db.DateTimeField(default = datetime.utcnow())
    date_end = db.DateTimeField(default = datetime.utcnow())
    images = db.ListField(db.StringField(required=True, default=[])) 
    tags = db.ListField(db.StringField(required=True)) 
    list_user_task = db.ListField(db.ReferenceField(User, default=[]))
    created_date = db.DateTimeField(default = datetime.utcnow())
    tags = db.ListField(db.StringField(required=True))


class Category(db.Document):
    name = db.StringField(required=True)
    content = db.StringField(required=True)
    tags = db.ListField(db.StringField(required=True))
    list_task = db.ListField(db.ReferenceField(Task, default=[]))
    images = db.ListField(db.StringField(required=True, default=[]))
    created_date = db.DateTimeField(default = datetime.utcnow())

class Board(db.Document):
    id_board = db.StringField(required=True)
    name = db.StringField(required=True)
    info = db.StringField(required=True)
    tags = db.ListField(db.StringField(required=True))
    images = db.ListField(db.StringField(required=True, default=[]))
    list_category = db.ListField(db.ReferenceField(Category, default=[]))
    list_user = db.ListField(db.ReferenceField(User, default=[]))
    created_date = db.DateTimeField(default = datetime.utcnow())


class Customer(db.Document):
    token = db.StringField(required=True,primary_key=True)
    altitude = db.StringField(required=True)
    altitudeAccuracy = db.StringField(required=True)
    latitude = db.StringField(required=True)
    longitude = db.StringField(required=True) 
    heading = db.StringField(required=True)
    speed = db.StringField(required=True)  
    created_date = db.DateTimeField(default = datetime.utcnow())
