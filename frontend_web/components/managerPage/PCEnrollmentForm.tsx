import React, { useEffect } from "react";

const Enrollment = () => {
    const data = [
        {
            no: "1",
            uuid: "abcdefg",
            privateIp: "192.168.0.1",
            publicIp: "123.123.123.123",
            status: "사용중"
        },
        {
            no: "2",
            uuid: "abcdefg",
            privateIp: "192.168.0.1",
            publicIp: "123.123.123.123",
            status: "사용중"
        },
        {
            no: "3",
            uuid: "abcdefg",
            privateIp: "192.168.0.1",
            publicIp: "123.123.123.123",
            status: "사용중"
        }
    ]
    const pcNum = data.length;
    const setList = () => {
        const noList = document.getElementById("noList");
        const uuidList = document.getElementById("uuidList");
        const privateIpList = document.getElementById("privateIpList");
        const publicIpList = document.getElementById("publicIpList");
        const statusList = document.getElementById("statusList");
        for (let i = 0; i < data.length; i++) {
            let no = data[i].no;
            let uuid = data[i].uuid;
            let privateIp = data[i].privateIp;
            let publicIp = data[i].publicIp;
            let status = data[i].status;
            let noLi = document.createElement('li');
            noLi.appendChild(document.createTextNode(no));
            let uuidLi = document.createElement('li');
            uuidLi.appendChild(document.createTextNode(uuid));
            let privateIpLi = document.createElement('li');
            privateIpLi.appendChild(document.createTextNode(privateIp));
            let publicIpLi = document.createElement('li');
            publicIpLi.appendChild(document.createTextNode(publicIp));
            let statusLi = document.createElement('li');
            statusLi.appendChild(document.createTextNode(status));
            const array = [noLi, uuidLi, privateIpLi, publicIpLi, statusLi];
            array.forEach((item)=>{
                item.style.paddingTop = "30px";
                item.style.fontSize = "18px";
            })
            statusLi.style.color = "#0052cc";
            noList.appendChild(noLi);
            uuidList.appendChild(uuidLi);
            privateIpList.appendChild(privateIpLi);
            publicIpList.appendChild(publicIpLi);
            statusList.appendChild(statusLi);
        }
    }

    useEffect(() => {
        setList();
    }, []);
    return (
        <div className="container">
            <h1>등록된 PC 관리 (총 {pcNum}대)</h1>
            <div className="standard">
                <div className="no">No</div>
                <div className="uuid">uuid</div>
                <div className="privateIp">private IP</div>
                <div className="publicIp">public IP</div>
                <div className="status">status</div>
            </div>
            <div className="list">
                <div className="no">
                    <ul id="noList"></ul>
                </div>
                <div className="uuid">
                    <ul id="uuidList"></ul>
                </div>
                <div className="privateIp">
                    <ul id="privateIpList"></ul>
                </div>
                <div className="publicIp">
                    <ul id="publicIpList"></ul>
                </div>
                <div className="status">
                    <ul id="statusList"></ul>
                </div>
            </div>
            <style jsx>{`
            .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
            }
            h1 {
                font-size: 32px;
                margin-top: 60px;
            }
            .standard {
                width: 1000px;
                height: 40px;
                border-radius: 20px;
                border: solid 1px #0052cc;
                background-color: #0052cc;
                margin-top: 30px;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding-left: 60px;
            }
            .standard div {
                color: #ffffff;
                font-size: 18px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .no {
                width: 60px;  
            }
            .uuid {
                width: 440px;
            }
            .privateIp, .publicIp {
                width: 160px;
            }
            .status {
                width: 120px;
            }
            .list {
                width: 1000px;
                height: 100vh;
                display: flex;
                padding-left: 60px;
                box-sizing: border-box;
            }
            .list div {
                font-size: 18px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            ul {
               list-style: none;
               font-size: 18px; 
               padding-left: 0px;
               margin-top: 0px;
               text-align: center;
            }
            button {
                width: 240px;
                height: 40px;
                border-radius: 20px;
                border: solid 1px #0052cc;
            }
            `}</style>
        </div>
    );
};

export default Enrollment;