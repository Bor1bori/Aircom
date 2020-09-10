import socketio

sio = socketio.Client()

def init(back_url = 'http://localhost:3000'):
    sio.connect(back_url)

def signinCallback(data):
    print('signin 결과: ', data)

@sio.event
def connect():
    print('Connected!')
    sio.emit('signin', {
        'uuid': '0fa822bf-d254-4cc3-9bbe-d26cab243c99'
    }, callback=signinCallback)

@sio.on('allocate')
def on_allocate(data):
    return {
        'success': True,
        'ip': '192.168.0.1',
        'ports': [1, 2, 3, 4, 5]   
    }

@sio.on('ask_state')
def on_ask_state(data):
    return {
        'state': 'inUse'
    }

@sio.on('assure_termination')
def on_assure_termination(data):
    return {
        'success': True
    }
