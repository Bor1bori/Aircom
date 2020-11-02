import socket, struct
import pymysql

class PowerManager:
    
    def WOL_comp(self, MAC_addr):
        sep = MAC_addr[2]
        MAC_addr = MAC_addr.replace(sep, '')

        data = b'FFFFFFFFFFFF' + (MAC_addr*16).encode()
        send_data = b''

        for num1 in range(0, len(data), 2):
            send_data += struct.pack('B', int(data[num1:num1 + 2], 16))

        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        sock.sendto(send_data, ('192.168.0.255', 7))

    def connect_db(self, mac):
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
        id int(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        mac varchar(255),
        ip varchar(255),
        onoff tinyint(1)
        )'''

        self.pm_db_cursor.execute(create_table_query)
        self.pm_db.commit()

    def disconnect_db(self):
        self.pm_db.close()

        

        
            
