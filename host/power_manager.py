import socket, struct
import pymysql
import getmac
from datetime import datetime

class PowerManager:

    def __init__(self):
        self.mac = getmac.get_mac_address()
        self.internal_ip = socket.gethostbyname(socket.gethostname())

    def get_com_info(self):
        return self.mac, self.internal_ip
    
    def WOL_com(MAC_addr):
        sep = MAC_addr[2]
        MAC_addr = MAC_addr.replace(sep, '')

        data = b'FFFFFFFFFFFF' + (MAC_addr*16).encode()
        send_data = b''

        for num1 in range(0, len(data), 2):
            send_data += struct.pack('B', int(data[num1:num1 + 2], 16))

        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        sock.sendto(send_data, ('192.168.0.255', 7))

    def connect_db(self):
        self.pm_db = pymysql.connect(
            host = 'aircom-1.cvofbm1mn8lt.ap-northeast-2.rds.amazonaws.com',
            user = 'admin',
            passwd = 'vineyard!DB',
            db = 'aircomDev',
            port = 3306,
            charset='utf8'
        )
        self.pm_db_cursor = self.pm_db.cursor()

        create_table_query = '''create table if not exists power_pc (
        mac varchar(255),
        ip varchar(255),
        onoff tinyint(1),
        recenttime datetime not null
        )'''

        self.pm_db_cursor.execute(create_table_query)
        self.pm_db.commit()

        curtime = datetime.today().strftime("%Y-%m-%d %H:%M:%S")
        insert_data_power_pc_query = '''
        insert into power_pc (mac, ip, onoff, recenttime)
        select '%s', '%s', 1, '%s'
        where not exists (select * from power_pc where ip = '%s') limit 1;
        ''' % (self.mac, self.internal_ip, curtime, self.internal_ip)
        self.pm_db_cursor.execute(insert_data_power_pc_query)
        self.pm_db.commit()
        

    def update_db(self):
        curtime = datetime.today().strftime("%Y-%m-%d %H:%M:%S")
        update_db_query = '''update power_pc set recenttime = '%s' where mac = '%s' ''' % (curtime, self.mac)
        self.pm_db_cursor.execute(update_db_query)
        self.pm_db.commit()
        
    def check_db(self):
        get_db_query = '''select * from power_pc'''
        self.pm_db_cursor.execute(get_db_query)
        pm_db_data = self.pm_db_cursor.fetchall()
        com_to_wol = []
        for com_data in pm_db_data:
            if com_data[2] == 0:
                continue
            else:
                time_diff = (datetime.today() - com_data[3]).total_seconds() / 60
                if time_diff > 2:
                    com_to_wol.append(com_data)
        for wol_com_data in com_to_wol:
            WOL_com(wol_com_data[0])
    
    def disconnect_db(self):
        self.pm_db.close()

        

        
            
