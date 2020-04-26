import os
import urllib.parse

class Config:   
    SECRET_KEY = '4039f53a0856b3012f91bcaf1b49ad80'
    DROPZONE_UPLOAD_MULTIPLE = True
    DROPZONE_ALLOWED_FILE_CUSTOM = True
    DROPZONE_ALLOWED_FILE_TYPE = 'image/*'
    DROPZONE_MAX_FILE_SIZE = 8
    UPLOADED_PHOTOS_DEST = os.getcwd() + '/static/input'

    MONGODB_DB = urllib.parse.quote_plus("co_work")
    MONGODB_USERNAME = urllib.parse.quote_plus('tamaki')
    MONGODB_PASSWORD = urllib.parse.quote_plus('mushroomzz99')

    MONGODB_HOST = 'mongodb+srv://%s:%s@cluster0-qz9ip.mongodb.net/%s?retryWrites=true' % (MONGODB_USERNAME, MONGODB_PASSWORD,MONGODB_DB)
  
    # mail server
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    # MAIL_USERNAME = os.environ.get('EMAIL_USER') get environment variable 
    MAIL_USERNAME = 'baoduy19971997@gmail.com'
    MAIL_PASSWORD = 'mushroomzz99'

    # CUDA_VISIBLE_DEVICES= ''