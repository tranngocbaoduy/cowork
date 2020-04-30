import os
import secrets
import requests
import base64

from PIL import Image
from flask import current_app,url_for 
from io import BytesIO
from Server.model import User, Board, Task, Category, Notification

def CreateRespone():
    answer={
        "status":False,
        "payload":{},
        "message":""
    } 
    return answer

def Respone(status, payload, message):
    answer = CreateRespone()
    answer['status']= status
    answer['payload']= payload
    answer['message']= message
    return answer

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(current_app.root_path, 'static/profile_pics', picture_fn)

    output_size = (200, 200)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn
 
import re
import time

def decode_base64(data, altchars=b'+/'):
    """Decode base64, padding being optional.

    :param data: Base64 data as an ASCII byte string
    :returns: The decoded byte string.

    """
    data = re.sub(rb'[^a-zA-Z0-9%s]+' % altchars, b'', data)  # normalize
    missing_padding = len(data) % 4
    if missing_padding:
        data += b'='* (4 - missing_padding)
    return base64.b64decode(data, altchars)

 
def convert_and_save(b64_string, component):  
    imgdata = base64.b64decode(b64_string) 
    random_hex = secrets.token_hex(8) 
    picture_fn = random_hex + str(time.time()) + '.png'
    picture_path = os.path.join(current_app.root_path, 'static', component, picture_fn)
    with open(picture_path, 'wb') as f:
        f.write(imgdata)
    return os.path.join('static', component, picture_fn)
  
def convert_img_tob64(path): 
    imgdata = base64.b64decode(img) 
 

def send_notification(token, message, user, id_board, id_category, id_task, activity, obj, name, image): 
    try: 
        noti = Notification(token=str(token), message=str(message), user=str(user), id_board=str(id_board), id_category=str(id_category), 
            id_task=str(id_task), activity=str(activity), obj=str(obj), name=str(name), image=str(image)).save()
        user = User.objects(username=user).first() 
        user.list_notifications.append(noti) 
        user.save() 
    except:
        print("Can't save notification")

