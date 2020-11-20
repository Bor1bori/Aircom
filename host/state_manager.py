from pywinauto import Application
import threading
import psutil
import os


class StateManager:
    state = 'usable'
    nvc_num = 0

    def __init__(self):
        n = 0
        for process in psutil.process_iter():
            if process.name() == 'nvcontainer.exe':
                n += 1
        self.nvc_num = n
        pass

    def manage_run(self):
        n = 0
        current_state = 'usable'
        for process in psutil.process_iter():
            if process.name() == 'nvcontainer.exe':
                n += 1
            elif process.name() == 'nvstreamer.exe':
                current_state = 'inUse'
        if n > self.nvc_num:
            self.auto_input_writer()
        self.nvc_num = n

        if self.state == 'usable' and current_state == 'inUse':
            self.state = current_state
            print('연결 확인')
        elif self.state == 'inUse' and current_state == 'usable':
            self.state = current_state
            print('종료 확인')

        threading.Timer(2, self.manage_run).start()

    def auto_input_writer(self):
        try:
            app = Application().connect(path='nvcontainer.exe')
            dialog = app.top_window()
            if dialog.is_visible():
                dialog.Edit.type_keys('1111')
                dialog.Button.click()
                self.state = 'reserved'
        except Exception:
            print(Exception)

    def terminate_connection(self):
        for process in psutil.process_iter():
            if process.name() == 'nvstreamer.exe':
                process.kill()
        self.state = 'usable'

    def restart_os(self):
        os.system("shutdown /r /f /t 5")


if __name__ == '__main__':
    for proc in psutil.process_iter():
        if proc.name() == 'nvstreamer.exe':
            print(1)