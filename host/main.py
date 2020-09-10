import socket
import pywinauto
from pywinauto.application import Application
from streaming_tester import StreamingTester
from api_sender import APISender
import sio

CONF_DIRECTORY = "conf.ini";
BACKEND_URL = "http://api.myaircom.co.kr";

if __name__== "__main__" :
    sio.init();
    auth_token = input("홈페이지에서 발급받은 인증코드를 입력하세요 : ")
    print(auth_token)
    tester = StreamingTester()
    is_test_success = tester.test_streaming()
    host_ip = tester.get_ip_address()

    sender = APISender(BACKEND_URL)
    #sender.register("1234", host_ip)
    uuid = sender.register(auth_token, "192.168.0.1", 8080)
    if uuid:
        print("authorized clear")
        userfile = open(CONF_DIRECTORY, "w")
        userfile.write(uuid)
        userfile.close()
    else:
        print("authorized failed")
    '''
    sender = APISender(BACKEND_URL)
    sender.shield_connect()
    '''
