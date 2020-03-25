
import os
import secrets
from PIL import Image

ROOT_DIR = os.path.abspath(os.getcwd())

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(ROOT_DIR, 'static/sake_upload', picture_fn) 
    
    i = Image.open(form_picture) 
    i.save(picture_path)

    return picture_fn