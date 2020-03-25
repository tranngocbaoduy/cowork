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


class User(db.Document, UserMixin,JsonSerializable):
    # query_class = UserModel
    email = db.StringField(max_length=50,required=True, primary_key=True)
    username = db.StringField(max_length=50,required=True)
    image_file = db.StringField(max_length=50,required=True, default='avatar.png')
    password = db.StringField(max_length=100,required=True)
    role = db.StringField(max_length=100,required=True)

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
    
