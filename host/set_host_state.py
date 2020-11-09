import os, winreg

class SetComputer:
    def set_display_resolution(self):
        # only in 64bit
        proc_arch = os.environ['PROCESSOR_ARCHITECTURE'].lower()
        arch_key = winreg.KEY_WOW64_64KEY
        key = winreg.OpenKey(winreg.HKEY_CURRENT_USER,
                             r"Control Panel\Desktop\WindowMetrics", 0,
                             winreg.KEY_READ | arch_key)
        try:
            dn = winreg.QueryValueEx(key, 'AppliedDPI')
            self.resolution = dn[0]//96*100)
        finally:
            key.Close()
        return self.resolution
