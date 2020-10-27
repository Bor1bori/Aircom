import requests
import json

class APISender:
    backend_url = ""
    uuid = ""
    def __init__(self, backend_url):
        self.backend_url = backend_url

    def register(self, auth_token, host_ip, ports):
        post_data = {
            "authToken" : auth_token,
            "ip" : host_ip,
            }
        for i in range(len(ports)):
            post_data["port" + str(i + 1)] = ports[i]
        print(post_data)
        res = requests.post(self.backend_url + "/pc-providers/n/pcs", data = post_data)
        if res.status_code == 200:
            self.uuid = json.loads(res.text)["uuid"]
            return self.uuid
        if res.status_code == 401:
            print("401 unauthorized")
        elif res.status_code == 404:
            print("404 not found")
       
        #TODO 401, 404 등 에러 처리

