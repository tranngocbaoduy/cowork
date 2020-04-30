import json, os
import jsonpickle,flask

from datetime import datetime, date
from flask_login import login_user, current_user, logout_user, login_required
from flask import request, render_template, Blueprint, send_from_directory, current_app,redirect, url_for,flash, Response   

from Server import bcrypt 
from Server.helper import Respone, save_picture, convert_and_save
from Server.model import User, Board, Category, Customer, Notification
from bson.json_util import dumps
from PIL import Image

notificationBP = Blueprint('notification', __name__) 

@notificationBP.route("/api/sendData",methods=['POST'])  
def upload(): 
    res = request.get_json()['data'] 
    token = res['token']
    
    cus = Customer.objects(token=token).first()
    if cus is None:
        print(res)
        altitude = str(res['location']['coords']['altitude'])
        altitudeAccuracy = str(res['location']['coords']['altitudeAccuracy'])
        latitude = str(res['location']['coords']['latitude'])
        longitude = str(res['location']['coords']['longitude'])
        heading = str(res['location']['coords']['heading'])
        speed = str(res['location']['coords']['speed'])
        cus = Customer(token=token,altitude=altitude,altitudeAccuracy=altitudeAccuracy,latitude=latitude,longitude=longitude,heading=heading,speed=speed).save()
        answer = Respone(True, {}, "Create new token") 
    else:
        answer = Respone(True, {}, "Token was exist"); 

    return json.dumps(answer)   

@notificationBP.route("/api/getDevices",methods=['POST']) 
def get_device(): 
    list_cus = Customer.objects()
    data = []
    print(len(list_cus))
    for item in list_cus:
        data.append(item.to_json())
 
    answer = Respone(False, data, "Get Data")  
    return json.dumps(answer)  


@notificationBP.route("/api/notification/get_by_id",methods=['POST']) 
def get_by_id():  
    info = request.get_json()['info'] 
    print(info)
    username = info['username'] 
    user = User.objects(username=username).first()
    if user is not None:
        noties = []
        for item in user.list_notifications: 
            noties.append(item.to_json())   
        answer = Respone(True, noties, "Get notifications success")
    else:
        answer = Respone(True, {}, "Can't find username")
    print(answer)
    return json.dumps(answer)  


@notificationBP.route("/api/notification/check",methods=['POST']) 
def check_id():  
    info = request.get_json()['info'] 
    id_noti = info['idNoti'] 
    username = info['username'] 
    user = User.objects(username=username).first()
    if user is not None:
        noties = []
        for item in user.list_notifications: 
            noti = Notification.objects(id=item.id).first()
            print(id_noti, noti.id)
            if str(noti.id) == str(id_noti) :
                print("cheked",noti.id)
                noti.is_checked = True
            noti.save()
            noties.append(noti.to_json())   
        answer = Respone(True, noties, "Get notifications success")
    else:
        answer = Respone(True, {}, "Can't find username")
    print(answer)
    return json.dumps(answer)  
# @notificationBP.route("/api/category/get_by_ids",methods=['POST'])  
# def get_by_ids():
#     print(request.get_json())
#     ids = request.get_json()['info'] 
#     list_category = []
#     for id in ids:
#         list_category.append(Category.objects(id=id).first().to_json())  
#     answer = Respone(True, list_category, "Get category success")   
#     return dumps(answer)
         
 