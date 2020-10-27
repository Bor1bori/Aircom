from api_sender import APISender
from sio import SIO
from config import Config
from pathlib import Path
from state_manager import StateManager
import threading

CONF_DIRECTORY = str(Path.home()) + "\\aircom\\conf.ini"
BACKEND_URL = "http://api.myaircom.co.kr"

config = Config(CONF_DIRECTORY)
sender = APISender(BACKEND_URL)

if __name__== "__main__" :
    uuid = config.getValue('id', 'uuid')
    if (not uuid):
        auth_token = input("홈페이지에서 발급받은 인증코드를 입력하세요 : ")
        ip = input("공인 ip를 입력하세요 : ")
        ports = input("포트포워딩된 포트를 입력하세요(7개, 공백으로 구분) : ").split()
        uuid = sender.register(auth_token, ip, ports)
        if uuid:
            print("등록 완료!")
            config.setValue("id", "uuid", uuid)
        else:
            print("authorized failed")
            exit()
    state_mgr = StateManager()
    mgr_thread = threading.Thread(target=state_mgr.manage_run)
    mgr_thread.start()
    SIO(BACKEND_URL, uuid, state_mgr)
