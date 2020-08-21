import requests, json

class APISender:
    backend_url = ""
    def __init__(self, backend_url):
        self.backend_url = backend_url

    def register(self, auth_token, host_ip):
        post_data = {"authToken" : auth_token, "ip" : host_ip}
        res = requests.post(self.backend_url + "/pcs", data = json.dumps(post_data))
        print(res)
        #TODO 401, 404 등 에러 처리
        #TODO uuid 리턴 
