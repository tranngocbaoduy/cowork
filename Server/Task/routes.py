import json, os
import jsonpickle,flask

from datetime import datetime, date
from flask_login import login_user, current_user, logout_user, login_required
from flask import request, render_template, Blueprint, send_from_directory, current_app,redirect, url_for,flash, Response   

from Server import bcrypt 
from Server.helper import Respone, save_picture, convert_and_save, send_notification
from Server.model import User, Board, Task, Category, Notification


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
    id_cate = info['id']
    cate = Category.objects(id=id_cate).first()
    list_task = [] 
    for item in cate.list_task:
        try:
            list_task.append(item.to_json())   
        except:
            continue
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
    tokens = []

    board = Board.objects(id=code_board).first()
    category = Category.objects(id=code_cate).first()
    task = Task(name=name_task,
        images=list_path,
        content=content,
        tags=tags
     ).save()
    category.list_task.append(task)
    category.save() 

    for username in friend:
        user = User.objects(username=username).first()
        list_user.append(user)

        tokens.append(user.expo_token)  
        token = user.expo_token
        message = current_user.username + " has just created task " + task.name + " successfully"
        id_board = board.id
        id_category = category.id
        id_task = task.id
        name = task.name
        image = task.images[0]
        activity = "create"
        obj = "task"
        send_notification(token=token, message=message, user=user.username,
                    id_board=id_board,id_category=id_category,id_task=id_task, activity=activity, obj=obj, name=name, image=image)
 
    task.list_user_task=list_user
    task.save()

    result = []
    result.append(tokens)
    result.append(category.to_json())   
    answer = Respone(True, result, "Create task success")  
    print(answer) 
    return dumps(answer)

@taskBP.route("/api/task/update",methods=['POST'])  
def update(): 
    info = request.get_json()['info'] 
    print(request.get_json())
    id_task = info['codeTask']
    name_task = info['nameTask']
    content = info['content']
    startTime = info['startTime'] 
    finishTime = info['finishTime'] 
    friend = info['dataFriendChecked']
    tags = info['listTag'] 
    list_image = info['listImage']
    images = info['images']
    list_path = []
    task = Task.objects(id=id_task).first()
    if task is not None:
        task.name = name_task
        task.content = content
        task.tags = tags
        list_user = []
        tokens = []
        for username in friend:
            user = User.objects(username=username).first()
            list_user.append(user)
            tokens.append(user.expo_token) 

            token = user.expo_token
            message = "Task "+task.name + " has recently updated by " + current_user.username  + " successfully"
            id_board = ""
            id_category = ""
            id_task = task.id
            name = task.name
            image = task.images[0]
            activity = "update"
            obj = "task"
            send_notification(token=token, message=message, user=user.username,
                        id_board=id_board,id_category=id_category,id_task=id_task, activity=activity, obj=obj, name=name, image=image)

        for im in images: 
            list_path.append(convert_and_save(im, "category"))  
        task.list_user_task = list_user  
        task.save()
 
        result = []
        result.append(tokens)
        result.append(task.to_json())
        answer = Respone(True, result, "Update task success")   
    else:
        answer = Respone(False, {}, "Update task failed")   
    print(answer)
    return dumps(answer)      

@taskBP.route("/api/task/remove",methods=['POST'])  
def remove(): 
    info = request.get_json()['info']  
    id_task = info['codeTask'] 
    task = Task.objects(id=id_task).first()
    if task is not None:
        tokens = []
        for user in task.list_user_task: 
            tokens.append(user.expo_token)

            token = user.expo_token
            message =  "Task "+ task.name + " has removed by " + current_user.username  + " ~~!"
            id_board = ""
            id_category = ""
            id_task = ""
            name = task.name 
            image = task.images[0]
            activity = "remove"
            obj = "task"
            send_notification(token=token, message=message, user=user.username,
                        id_board=id_board,id_category=id_category,id_task=id_task, activity=activity, obj=obj, name=name, image=image)


        result = []
        result.append(tokens)
        result.append(task.to_json()) 
        task.delete()
        answer = Respone(True, result, "Remove task success")  
    else:
        answer = Respone(False, {}, "Can't find task")   
    return dumps(answer)
         