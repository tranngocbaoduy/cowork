import json, os
import jsonpickle,flask

from datetime import datetime, date
from flask_login import login_user, current_user, logout_user, login_required
from flask import request, render_template, Blueprint, send_from_directory, current_app,redirect, url_for,flash, Response   

from Server import bcrypt 
from Server.helper import Respone, save_picture, convert_and_save
from Server.model import User, Board, Task, Category


taskBP = Blueprint('task', __name__) 

from PIL import Image
@taskBP.route("/api/upload",methods=['POST'])  
def upload():
    # print(request.get_json())
    res = request.get_json()['data'] 
    convert_and_save(res)
    # i=Image.open(res['uri'])
    # print(i)
    # save_picture(res['uri'])

    # if current_user.is_authenticated: 
    #     # user = User.objects.filter(username=username).first()
    #     # token = user.get_login_token(600)
    #     # answer = Respone(True, {'token':token}, "User have been already login")
    #     answer = Respone(True, {}, "User have been already login")
    #     return json.dumps(answer)   

    # user = User.objects.filter(username=username).first()
    # if user and bcrypt.check_password_hash(user.password, password): 
    #     time_expires = 600 #milisecond
    #     login_user(user, remember=False,duration=time_expires) #save user login 
    #     token = user.get_login_token(time_expires)
    #     payload = {
    #         "username":user.username,
    #         "email":user.email, 
    #         "role":user.role,
    #         "token": token
    #     } 
    #     message="Login Successful"
    #     answer = Respone(True, payload, message)   
    # else:
    answer = Respone(False, {}, "Email or Password isn't correct")  
    return json.dumps(answer)   


from bson.json_util import dumps

@taskBP.route("/api/task/get_by_ids",methods=['POST'])  
def get_by_ids():
    print(request.get_json())
    info = request.get_json()['info'] 
    list_task = []
    for id in info:
        list_task.append(Task.objects(id=id).first().to_json())  
    answer = Respone(True, list_task, "Get task success")   
    return dumps(answer)



@taskBP.route("/api/task/create",methods=['POST'])  
def create(): 
    info = request.get_json()['info'] 
    code_board = info['codeBoard']
    code_cate = info['codeCategory']
    name_task = info['nameTask']
    content = info['content']
    startTime = info['startTime'] 
    finishTime = info['finishTime'] 
    friend = info['dataFriendChecked']
    tags = info['listTag']
    print(code_board, code_cate, name_task, content, friend, startTime, finishTime, tags)
    list_image = info['listImage']
    images = info['images']
    list_path = []
    for im in images: 
        list_path.append(convert_and_save(im, "category")) 
    list_user = []
    for username in friend:
        list_user.append(User.objects(username=username).first()) 
    board = Board.objects(id=code_board).first()
    category = Category.objects(id=code_cate).first()
    task = Task(name=name_task,
        images=list_path,
        content=content,
        tags=tags,
        list_user_task=list_user).save()
    category.list_task.append(task)
    category.save() 
    answer = Respone(True, {task.to_json()}, "Create task success")   
    return dumps(answer)
        