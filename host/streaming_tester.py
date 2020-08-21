import pywinauto
from pywinauto.application import Application

class StreamingTester:
    host_ip = None
    def test_streaming(self):
        moonlight_alert_windows = pywinauto.findwindows.find_windows(title = "Moonlight Internet Streaming Tester")
        print(len(moonlight_alert_windows))
        for handle in moonlight_alert_windows:
            app = Application().connect(handle = handle)
            navwin = app.window(handle = handle)
            '''
            for window in navwin.descendants():
                print("@@@@@@@@@@@@@@@")
                print(window.window_text())
                print("@@@@@@@@@@@@@@@")
                print(window.class_name())
                '''
                #TODO IP 주소 찾기

        self.host_ip = "1.1.1.2"
        return True

    def get_ip_address(self):
        return self.host_ip
    
