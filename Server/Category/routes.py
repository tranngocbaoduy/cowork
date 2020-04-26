import json, os
import jsonpickle,flask

from datetime import datetime, date
from flask_login import login_user, current_user, logout_user, login_required
from flask import request, render_template, Blueprint, send_from_directory, current_app,redirect, url_for,flash, Response   

from Server import bcrypt 
from Server.helper import Respone, save_picture, convert_and_save
from Server.model import User, Board, Category
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
    print(request.get_json())
    ids = request.get_json()['info'] 
    list_category = []
    for id in ids:
        list_category.append(Category.objects(id=id).first().to_json())  
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
    print(code_board,name_category,content,create_time,friend)
    list_image = info['listImage']
    images = info['images']
    list_path = []
    for im in images: 
        list_path.append(convert_and_save(im, "category"))

    # list_user = []
    # for username in friend:
    #     list_user.append(User.objects(username=username).first())
    cate = Category(name=name_category, content=content, 
                list_task=[], 
                tags=[]).save()
    board = Board.objects(id=code_board).first();
    board.list_category.append(cate);
    board.save();                
    # board = Board(id_board=code_board,name=name_board, tags=[],
    #     images=list_path,
    #     info=content,
    #     list_category=[],
    #     list_user=list_user
    # ).save()
    answer = Respone(True, {cate.to_json()}, "Create category success")   
    return dumps(answer)
        