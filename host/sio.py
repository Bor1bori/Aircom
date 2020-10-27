import socketio
from state_manager import StateManager
from config import Config

class SIOEvent(socketio.ClientNamespace):
    uuid = ""
    def __init__(self, namespace, uuid, state_mgr: StateManager):
        super().__init__(namespace)
        self.uuid = uuid
        self.state_mgr = state_mgr

    def signinCallback(self, data):
        print('signin 결과: ', data)

    def on_connect(self): # connect 될 경우 호출됨
        print('Connected!')
        self.emit('signin', {
            'uuid': self.uuid
        }, callback=self.signinCallback)

    def on_ask_state(self, data):
        p2p_state = self.state_mgr.state
        return {
            'state': p2p_state
        }
    
    def on_assure_termination(self, data):
        # TODO: P2P 연결이 되어있는 상태면 연결 종료시키기
        self.state_mgr.restart_os()
        return {
            'success': True
        }


class SIO():
    sio = socketio.Client()

    def __init__(self, back_url, uuid, state_mgr: StateManager):
        self.state_mgr = state_mgr
        self.sio.register_namespace(SIOEvent('', uuid, self.state_mgr))
        self.sio.connect(back_url)
        self.sio.wait()


