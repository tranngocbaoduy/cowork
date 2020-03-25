import flask
import os
import urllib.parse 
 
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from Server.config import Config 
from flask_mongoengine import *


db = MongoEngine() 
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'danger'
mail = Mail()

def create_app(class_config=Config):
    app = Flask(__name__) 
    app.config.from_object(Config)  

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)

    from Server.Vocabulary.routes import vocab
    from Server.User.routes import userBP

    app.register_blueprint(vocab)  
    app.register_blueprint(userBP)   
 
    return app
