def CreateRespone():
    answer={
        "status":False,
        "payload":{},
        "message":""
    } 
    return answer

def Respone(status, payload, message):
    answer = CreateRespone()
    answer['status']= status
    answer['payload']= payload
    answer['message']= message
    return answer