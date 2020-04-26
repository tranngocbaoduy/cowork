import os
import urllib.parse
from mongoengine import *
from Server.model import User, Task, Board, ContactGroup, Category, Role
import json
import random 
import datetime  
from Server import bcrypt
 

def connect_db():
  MONGODB_DB = urllib.parse.quote_plus("co_work")
  MONGODB_USERNAME = urllib.parse.quote_plus('tamaki')
  MONGODB_PASSWORD = urllib.parse.quote_plus('mushroomzz99')
  MONGODB_HOST = 'mongodb+srv://%s:%s@cluster0-qz9ip.mongodb.net/%s?retryWrites=true' % (MONGODB_USERNAME, MONGODB_PASSWORD,MONGODB_DB)
  connect(username='tamaki', password='mushroomzz99', authentication_source='admin', host=MONGODB_HOST)


def create_board(): 

    admin = User(username="admin",password=bcrypt.generate_password_hash("1").decode('utf-8'),email="admin@gmail.com",phone="0793335049",
        first_name="Tamaki",last_name="Yui",image_file="static/avatar/ava.jpg",role=Role(name="admin").save()).save() 
    user1 = User(username="user1",password=bcrypt.generate_password_hash("1").decode('utf-8'),email="user1@gmail.com",phone="0237281726",
        first_name="User",last_name="Hokage",image_file="static/avatar/ava.jpg",role=Role(name="user").save()).save()
    user2 = User(username="user2",password=bcrypt.generate_password_hash("1").decode('utf-8'),email="user2@gmail.com",phone="0142221020",
        first_name="Hikari",last_name="Namida",image_file="static/avatar/ava.jpg",role=Role(name="user").save()).save()

    Board(id_board="EL001",name="English", tags=["red","pink"],images=["static/board/english.png","static/board/neural.png"],
        info="This is course about english. ",
        list_category=[
            Category(name="Writing", content="This is topic writing", list_task=[
                Task(name="Lecture 01",images=["static/task/draw.png","static/task/vision.png"], 
                content="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ",
                tags=['#FFDD9B','#FFAA53', '#F43759','#FFDE9B'],
                list_user_task=[admin]).save(),
                Task(name="Lecture 02",images=["static/task/topic_1.png","static/task/topic_2.png"], 
                content="Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
                tags=['#FFDD9B','#FFAA53', '#F43759','#FFDE9B'],
                list_user_task=[admin,user2]).save(),
            ],
            images=["static/task/draw.png","static/task/topic_1.png"],
            ).save(),
            Category(name="Reading", content="This is topic reading", list_task=[
                Task(name="Lecture 01",images=["static/task/draw.png","static/task/draw_2.png"], 
                content="On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
                tags=['#FFDD9B','#FFAA53','#FFBB53'],
                list_user_task=[admin,user1]).save(),
                Task(name="Lecture 02",images=["static/task/draw.png","static/task/draw_2.png"], 
                content="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
                tags=['#FFAA53','#B4FF3A','#FFBB53'],
                list_user_task=[admin,user1]).save()
            ], 
            images=["static/task/draw_2.png","static/task/topic_2.png"]).save()
        ],
        list_user=[admin,user1,user2]
    ).save()

    Board(id_board="ML001",name="Machine Learning", tags=["yellow","green","blue"],images=["static/task/neural.png","static/task/japan.png"],
        info="This is course about machine learning. ",
        list_category=[
            Category(name="Linear Regression", content="This is topic linear regression", list_task=[
                Task(name="Lecture 01",images=["static/task/draw.png","static/task/topic_2.png"], 
                content="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
                tags=['#FFDD9B','#FFAA53', '#F43759','#FFDE9B'],
                list_user_task=[admin,user1, user2]).save(),
                Task(name="Lecture 02",images=["static/task/draw.png","static/task/topic_2.png"], content="abc",
                tags=['#B4FF3A','#668EF6','#FFDE9B'],
                list_user_task=[admin]).save()
            ],
            images=["static/task/draw_2.png","static/task/topic_2.png"]).save(),
            Category(name="Logistic Regression", content="This is topic logistic regression", list_task=[
                Task(name="Lecture 01",images=["static/task/draw_2.png","static/task/topic_2.png"], content="abc",
                tags=['#FFDD9B','#F064C9', '#F43759','#FFDE9B'],
                list_user_task=[admin]).save(),
                Task(name="Lecture 02",images=["static/task/japan.png","static/task/topic_2.png"], content="abc",
                tags=['#FFDD9B','#FFAA53','#B4FF3A','#FFBB53'],
                list_user_task=[admin,user1]).save()
            ],
            images=["static/task/draw_2.png","static/task/topic_2.png"]).save()
        ],
        list_user=[admin,user1]
    ).save() 
 
connect_db()
create_board()