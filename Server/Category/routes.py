import json, os
import jsonpickle,flask

from datetime import datetime, date
from flask_login import login_user, current_user, logout_user, login_required
from flask import request, render_template, Blueprint, send_from_directory, current_app,redirect, url_for,flash, Response   

from Server import bcrypt 
from Server.helper import Respone, save_picture, convert_and_save, send_notification
from Server.model import User, Board, Category, Notification
from bson.json_util import dumps
from PIL import Image

categoryBP = Blueprint('category', __name__) 

@categoryBP.route("/api/upload",methods=['POST'])  
def upload(): 
    res = request.get_json()['data'] 
    convert_and_save(res) 
    answer = Respone(False, {}, "Email or Password isn't correct")  
    return json.dumps(answer)   

@categoryBP.route("/api/category/get_by_ids",methods=['POST'])  
def get_by_ids():
    info = request.get_json()['info'] 
    id_board = info['id']
    board = Board.objects(id=id_board).first()
    list_category = [] 
   
    for item in board.list_category:   
        try:
            list_category.append(item.to_json())  
        except:
            continue

    print("list_catego",list_category)
    answer = Respone(True, list_category, "Get category success")    
    return dumps(answer)
         

@categoryBP.route("/api/category/create",methods=['POST'])  
def create(): 
    info = request.get_json()['info'] 
    code_board = info['codeBoard']
    name_category = info['nameCategory']
    content = info['content']
    create_time = info['createTime'] 
    friend = info['dataFriendChecked'] 
    list_image = info['listImage']
    images = info['images']
    list_path = []
    list_user = []
    tokens = [] 
    board = Board.objects(id=code_board).first();

    for im in images: 
        list_path.append(convert_and_save(im, "category")) 
        cate = Category(name=name_category, content=content, 
                    list_task=[], images=list_path, tags=[]).save()
    for username in friend:
        user = User.objects(username=username).first()
        list_user.append(user)
        tokens.append(user.expo_token) 
        
        token = user.expo_token
        message = current_user.username + " has just created category " + cate.name + " . Hoorayyyy ^^!"
        id_board = board.id
        id_category = cate.id
        id_task = ""
        name = cate.name
        image = cate.images[0]
        activity = "create"
        obj = "category"
        send_notification(token=token, message=message, user=user.username,
                    id_board=id_board,id_category=id_category,id_task=id_task, activity=activity, obj=obj, name=name, image=image)

    cate.list_user = list_user
    cate.save()
   
    board.list_category.append(cate);
    board.save();      

    result = []
    result.append(tokens)
    result.append(cate.to_json())

    answer = Respone(True, result, "Create category success")   
    return dumps(answer)
        

@categoryBP.route("/api/category/update",methods=['POST'])  
def update(): 
    info = request.get_json()['info'] 
    code_board = info['codeBoard']
    id_cate = info['codeCategory']
    name_category = info['nameCategory']
    content = info['content']
    create_time = info['createTime'] 
    friend = info['dataFriendChecked'] 
    list_image = info['listImage']
    images = info['images']
    list_path = [] 
    board = Board.objects(id=code_board).first(); 
    for im in images: 
        list_path.append(convert_and_save(im, "category")) 

    cate = Category.objects(id=id_cate).first()
    if cate is not None and board is not None:
        cate.content = content
        cate.name = name_category 
        cate.image = list_path
        cate.save()   
        tokens = []
        for user in cate.list_user:
            tokens.append(user.expo_token) 

            token = user.expo_token
            message = "Category " +cate.name + " has just been updated by " + current_user.username + " . Check-it \"@@!\""
            id_board = board.id
            id_category = cate.id 
            name = cate.name
            image = cate.images[0]
            id_task = ""
            activity = "update"
            obj = "category"
            send_notification(token=token, message=message, user=user.username,
                        id_board=id_board,id_category=id_category,id_task=id_task, activity=activity, obj=obj, name=name, image=image)
        result = []
        result.append(tokens)
        result.append(cate.to_json())

        answer = Respone(True, result, "Update category success")   
    else:
        answer = Respone(False, {}, "Update category failed")   
    return dumps(answer)
        


@categoryBP.route("/api/category/remove",methods=['POST'])  
def remove(): 
    info = request.get_json()['info']  
    id_cate = info['id_cate'] 
    cate = Category.objects(id=id_cate).first()
    if cate is not None:
        tokens = []
        for user in cate.list_user:
            tokens.append(user.expo_token)

            token = user.expo_token
            message = "Recently, category "+cate.name + " has been removed by " + current_user.username
            id_board = ""
            id_category = cate.id
            id_task = "" 
            name = cate.name
            image = cate.images[0]
            activity = "remove"
            obj = "category"
            send_notification(token=token, message=message, user=user.username,
                        id_board=id_board,id_category=id_category,id_task=id_task, activity=activity, obj=obj, name=name, image=image)
        result = []
        result.append(tokens)
        result.append(cate.to_json())
        cate.delete()
        answer = Respone(True, result, "Remove category success")  
    else:
        answer = Respone(False, {}, "Can't find category")   
    return dumps(answer)
         