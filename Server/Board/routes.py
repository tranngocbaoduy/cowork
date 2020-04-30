import json, os
import jsonpickle,flask

from datetime import datetime, date
from flask_login import login_user, current_user, logout_user, login_required
from flask import request, render_template, Blueprint, send_from_directory, current_app,redirect, url_for,flash, Response   

from Server import bcrypt 
from Server.helper import Respone, save_picture, convert_and_save, send_notification
from Server.model import User, Board, Category, Task, Notification



boardBP = Blueprint('board', __name__) 

from PIL import Image
@boardBP.route("/api/upload",methods=['POST'])  
def upload():
    # print(request.get_json())
    res = request.get_json()['data'] 
    convert_and_save(res, "Task")
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

@boardBP.route("/api/board/get_all",methods=['POST'])  
def get_all():
    print(request.get_json())
    info = request.get_json()['info']
    username = info['username']
    print("board",username)
    list_board = Board.objects() 
    boards = []
    # print(len(list_board))
    for item in list_board: 
        for user in item.list_user:
            if user.username == username:
                boards.append(Board.objects(id=item.id).to_json()) 
     
    answer = Respone(True, boards, "Get boards success")   
    return dumps(answer)

@boardBP.route("/api/board/search_all",methods=['POST'])  
def search_all():
    print(request.get_json())
    info = request.get_json()['info'] 
    username = info['username']
    query = info['query'] 
    if query != "":
        list_board = Board.objects(name__icontains=query).limit(3)
        list_cate = Category.objects(name__icontains=query).limit(3)
        list_task = Task.objects(name__icontains=query).limit(3)
        boards = []
        cates = []
        tasks = [] 
        
        for item in list_board: 
            for user in item.list_user:
                if user.username == username:
                    boards.append(item.to_json()) 
        for item in list_cate:  
            cates.append(item.to_json()) 
        for item in list_task:  
            tasks.append(item.to_json())  
        answer = Respone(True, {"boards":boards, "cates":cates, "tasks":tasks}, "Search success")
    else:
        answer = Respone(True, {"boards":[], "cates":[], "tasks":[]}, "Search success")
    print(answer)
    return dumps(answer)     

@boardBP.route("/api/board/create",methods=['POST'])  
def create(): 
    info = request.get_json()['info'] 
    code_board = info['codeBoard']
    name_board = info['nameBoard']
    content = info['content']
    create_time = info['createTime'] 
    friend = info['dataFriendChecked']
    list_image = info['listImage']
    images = info['images']
    list_path = [] 
    tokens = []
    for im in images: 
        list_path.append(convert_and_save(im, "Board"))


    board = Board(id_board=code_board,name=name_board, tags=[],
        images=list_path,
        info=content,
        list_category=[],
    ).save()

    list_user = []
    for username in friend:
        user = User.objects(username=username).first()
        if user is not None:
            list_user.append(user)
            tokens.append(user.expo_token)

            token = user.expo_token
            message = current_user.username + " has just created board " + board.name + " successfully"
            id_board = board.id
            id_category = ""
            id_task = ""
            name = board.name
            image = board.images[0]
            activity = "create"
            obj = "board"
            send_notification(token=token, message=message, user=user.username,
                     id_board=id_board,id_category=id_category,id_task=id_task, activity=activity, obj=obj, name=name, image=image)
    board.list_user = list_user
    board.save()

    result = []
    result.append(tokens)
    result.append(board.to_json())
    
    answer = Respone(True, result, "Create board success")  
    print(answer)
    return dumps(answer)
        

@boardBP.route("/api/board/update",methods=['POST'])  
def update():  
    info = request.get_json()['info'] 
    code_board = info['codeBoard']
    name_board = info['nameBoard']
    content = info['content']
    create_time = info['createTime'] 
    friend = info['dataFriendChecked']
    list_image = info['listImage']
    images = info['images']
    list_path = []
    tokens = []
    board  = Board.objects(id_board=code_board).first()
    if board is not None:
        board.name = name_board
        board.info = content  
   

        if images != "none":
            for im in images: 
                list_path.append(convert_and_save(im, "Board"))

        list_user = []
        for username in friend:
            user = User.objects(username=username).first()
            
            token = user.expo_token
            message = current_user.username + " has just updated board " + board.name + " successfully. Go to see now >_<"
            id_board = board.id
            name = board.name
            image = board.images[0]
            id_category = ""
            id_task = ""
            activity = "update"
            obj = "board"
            send_notification(token=token, message=message, user=user.username,
                     id_board=id_board,id_category=id_category,id_task=id_task, activity=activity, obj=obj, name=name, image=image)

            tokens.append(user.expo_token)
            list_user.append(user)


        board.list_user = list_user 
        board.save()

        result = []
        result.append(tokens)
        result.append(board.to_json())
        answer = Respone(True, result, "Update board success")  
        print(answer)
    else:
        answer = Respone(False, {}, "Can't find board ")  
   
    return dumps(answer)

@boardBP.route("/api/board/remove",methods=['POST'])  
def remove():  
    info = request.get_json()['info']  
    id_board = info['id_board'] 
    board  = Board.objects(id=id_board).first()
   
    if board is not None: 
        result = []
        tokens = []
        for user in board.list_user:
            tokens.append(user.expo_token)

            token = user.expo_token
            message = current_user.username + " has just removed board " + board.name + " !!!"
            id_board = board.id
            id_category = ""
            id_task = ""
            name = board.name
            image = board.images[0]
            activity = "remove"
            obj = "board"
            send_notification(token=token, message=message, user=user.username,
                     id_board=id_board,id_category=id_category,id_task=id_task, activity=activity, obj=obj, name=name,image=image)

        result.append(tokens)
        result.append(board.to_json())
        board.delete()
        answer = Respone(True, result, "Remove board success")  
        print(answer)
    else:
        answer = Respone(False, {}, "Can't find board ")   
    return dumps(answer)
        