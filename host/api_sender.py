import requests, json
from pywinauto import Application
import pyautogui
import time

class APISender:
    backend_url = ""
    uuid = ""
    def __init__(self, backend_url):
        self.backend_url = backend_url

    def register(self, auth_token, host_ip, port):
        post_data = {"authToken" : auth_token, "ip" : host_ip, "port": port}
        res = requests.post(self.backend_url + "/pc-providers/n/pcs", data = post_data)
        if res.status_code == 200:
            self.uuid = json.loads(res.text)["uuid"]
            return self.uuid
        if res.status_code == 401:
            print("401 unauthorized")
        elif res.status_code == 404:
            print("404 not found")
       
        #TODO 401, 404 등 에러 처리
        #TODO uuid 리턴 
    def shield_connect(self):
        shield_connect_windows_app = Application().connect(path = "nvcontainer.exe")
        pyautogui.click(1443, 953)
        pyautogui.typewrite('1111')
        time.sleep(1)
        pyautogui.click(1500, 990)

        

        
