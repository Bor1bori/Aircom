import socket
import pywinauto
from pywinauto.application import Application
from api_sender import APISender
import sio
from config import Config

CONF_DIRECTORY = "conf.ini"
BACKEND_URL = "http://api.myaircom.co.kr"

config = Config(CONF_DIRECTORY)
sender = APISender(BACKEND_URL)

if __name__== "__main__" :
    uuid = config.getValue('id', 'uuid')
    if (not uuid):
        auth_token = input("홈페이지에서 발급받은 인증코드를 입력하세요 : ")
        uuid = sender.register(auth_token, "192.168.0.1", 8080)
        if uuid:
            print("등록 완료!")
            config.setValue("id", "uuid", uuid)
        else:
            print("authorized failed")
            exit()

    sio.init(BACKEND_URL)

    #sender.register("1234", host_ip)
    '''
    sender = APISender(BACKEND_URL)
    sender.shield_connect()
    '''
