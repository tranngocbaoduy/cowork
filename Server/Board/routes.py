import json, os
import jsonpickle,flask

from datetime import datetime, date
from flask_login import login_user, current_user, logout_user, login_required
from flask import request, render_template, Blueprint, send_from_directory, current_app,redirect, url_for,flash, Response   

from Server import bcrypt 
from Server.helper import Respone, save_picture, convert_and_save
from Server.model import User, Board


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
    for im in images: 
        list_path.append(convert_and_save(im, "Board"))

    list_user = []
    for username in friend:
        list_user.append(User.objects(username=username).first())

    board = Board(id_board=code_board,name=name_board, tags=[],
        images=list_path,
        info=content,
        list_category=[],
        list_user=list_user
    ).save()
    answer = Respone(True, {board.to_json()}, "Create board success")   
    return dumps(answer)
        