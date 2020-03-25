import json, os   
import jsonpickle,flask

from flask import request, render_template, Blueprint, send_from_directory, current_app,redirect, url_for,flash
from Server.model import Vocabulary
from datetime import datetime, date


vocab = Blueprint('vocab', __name__) 

@vocab.route("/api/vocab/<string:lesson>",methods=['GET','POST'])  
def index(lesson):
    list_vocab = Vocabulary.objects(lesson=lesson)  
    # json_string  = [ jsonpickle.encode(item) for item in list_vocab]  
    json_string = dict()
    for item in list_vocab: 
        json_string[str(item.id)] = {
            "hiragana":item.hiragana,
            "katakana":item.katakana,
            "kanji":item.kanji,
            "romanji":item.romanji,
            "vi_translate":item.vi_translate,
            "en_translate":item.en_translate
        }  
    return flask.jsonify(json_string)

@vocab.route("/api/vocab/create_data",methods=['POST'])
def create_data(): 
    Vocabulary(hiragana='わたし',katakana='',kanji='私 - tư',romanji='watashi',vi_translate='tôi',en_translate='I',lesson='1').save()
    Vocabulary(hiragana='わたしたち',katakana='',kanji='私たち- tư',romanji='watashitachi',vi_translate='chúng tôi, chúng ta',en_translate='we',lesson='1').save()
    Vocabulary(hiragana='あなた',katakana='',kanji='貴方 - quý phương',romanji='anata',vi_translate='anh/ chị/ ông/ bà, bạn ngôi thứ 2 số ít',en_translate='he, she, it, you',lesson='1').save()
    Vocabulary(hiragana='あのひと',katakana='',kanji='あの人 - nhân',romanji='anohito',vi_translate='người kia, người đó',en_translate='he, she, it',lesson='1').save()
    return 'create success'