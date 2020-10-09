import socketio
from config import Config

CONF_DIRECTORY = "conf.ini"
config = Config(CONF_DIRECTORY)

class SIOEvent(socketio.ClientNamespace):
    uuid = ""
    def __init__(self, namespace, uuid):
        super().__init__(namespace)
        self.uuid = uuid

    def signinCallback(self, data):
        print('signin 결과: ', data)

    def on_connect(self): # connect 될 경우 호출됨
        print(self.uuid)
        print('Connected!')
        self.emit('signin', {
            'uuid': self.uuid
        }, callback=self.signinCallback)

    def on_ask_state(self, data):
        # TODO: p2p 연결 상태 확인해서 p2p_state에 저장
        p2p_state = 'inUse'
        return {
            'state': p2p_state
        }
    
    def on_assure_termination(self, data):
        # TODO: P2P 연결이 되어있는 상태면 연결 종료시키기
        return {
            'success': True
        }

class SIO():
    sio = socketio.Client()
    def __init__(self, back_url, uuid):
        self.sio.register_namespace(SIOEvent('', uuid))
        self.sio.connect(back_url)
        self.sio.wait()


