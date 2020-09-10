import socketio

sio = socketio.Client()

def init(back_url = 'http://localhost:3000'):
    sio.connect(back_url)

def signinCallback(data):
    print('signin 결과: ', data)

@sio.event
def connect(): # connect 될 경우 호출됨
    print('Connected!')
    # TODO: uuid 실제 값을 쓰기.
    sio.emit('signin', {
        'uuid': '0fa822bf-d254-4cc3-9bbe-d26cab243c99'
    }, callback=signinCallback)

@sio.on('allocate')
def on_allocate(data): # 반대쪽(Server)에서 allocate event를 emit할 경우 이 함수로 전달됨.
    # TODO: UDP 홀펀칭 통해 ip, ports 받아오기.
    return {
        'success': True,
        'ip': '192.168.0.1',
        'ports': [1, 2, 3, 4, 5]   
    }

@sio.on('ask_state')
def on_ask_state(data):
    # TODO: p2p 연결 상태 확인해서 p2p_state에 저장
    p2p_state = 'inUse'
    return {
        'state': p2p_state
    }

@sio.on('assure_termination')
def on_assure_termination(data):
    # TODO: P2P 연결이 되어있는 상태면 연결 종료시키기
    return {
        'success': True
    }
