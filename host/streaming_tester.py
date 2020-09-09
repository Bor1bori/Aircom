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
            
            for window in navwin.descendants():
                '''
                print("@@@@@@@@@@@@@@@")
                print(window.window_text())
                print("@@@@@@@@@@@@@@@")
                print(window.class_name())
                '''
                ip_pos = window.window_text().find("Moonlight's Add PC dialog:")
                if ip_pos > 0:
                    self.host_ip = window.window_text()[ip_pos + 27:]
                    break
        return True

    def get_ip_address(self):
        return self.host_ip
    
