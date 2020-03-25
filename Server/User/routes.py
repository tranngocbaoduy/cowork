import json, os
import jsonpickle,flask

from datetime import datetime, date
from flask_login import login_user, current_user, logout_user, login_required
from flask import request, render_template, Blueprint, send_from_directory, current_app,redirect, url_for,flash   

from Server import bcrypt 
from Server.helper import Respone
from Server.model import User


userBP = Blueprint('user', __name__) 

@userBP.route("/api/login",methods=['POST'])  
def login():
    info = request.get_json()['info']
    username = info['username']
    password = info['password']
    if current_user.is_authenticated: 
        # user = User.objects.filter(username=username).first()
        # token = user.get_login_token(600)
        # answer = Respone(True, {'token':token}, "User have been already login")
        answer = Respone(True, {}, "User have been already login")
        return json.dumps(answer)   

    user = User.objects.filter(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password): 
        time_expires = 600 #milisecond
        login_user(user, remember=False,duration=time_expires) #save user login 
        token = user.get_login_token(time_expires)
        payload = {
            "username":user.username,
            "email":user.email, 
            "role":user.role,
            "token": token
        } 
        message="Login Successful"
        answer = Respone(True, payload, message)   
    else:
        answer = Respone(False, {}, "Email or Password isn't correct")  
    return json.dumps(answer)   
 
@userBP.route("/api/register", methods=['POST'])
def register():
    if current_user.is_authenticated:  
        return Respone(False, {}, "Logout before sign in")  

    info = request.get_json()['info']
    username = info['username']
    email = info['email']
    password = info['password']
    role = info['role']

    user = User.objects.filter(username=username).first() 
    if not user: 
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8') 
        user = User(username=username, email=email,password=hashed_password, role=role)
        user.save()
        
        payload = {
            "username":user.username,
            "email":user.email,
            "image_file":user.image_file,
            "role":user.role
        } 
        message = "Create User Success"
        answer = Respone(True, payload, message)   
    else:
        answer = Respone(False, {}, "Email is exist")   
    return json.dumps(answer) 

# logout function 
@userBP.route("/api/logout",methods=['POST'])
@login_required
def logout():
    if current_user.is_authenticated: 
        logout_user()
        answer = Respone(True, {}, "Logout Success")  
        return json.dumps(answer)
    return render_template('index.html')
  