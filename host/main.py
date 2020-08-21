import socket
import pywinauto
from pywinauto.application import Application
from streaming_tester import StreamingTester
from api_sender import APISender

CONF_DIRECTORY = "conf.ini";
BACKEND_URL = "https://a1504d41-f8dd-4e01-94d3-9793f3e1d68b.mock.pstmn.io";

if __name__== "__main__" :
    auth_token = input("홈페이지에서 발급받은 인증코드를 입력하세요 : ")
    print(auth_token)
    tester = StreamingTester()
    is_test_success = tester.test_streaming()
    host_ip = tester.get_ip_address()

    sender = APISender(BACKEND_URL)
    sender.register("1234", host_ip)
    
    userfile = open(CONF_DIRECTORY, "w")
    userfile.write(hello!" )
    #TODO uuid 저장 
    userfile.close()
