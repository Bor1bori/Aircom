import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Enrollment = () => {
    const ppLoginToken = useSelector((state: RootState) => state.ppAuth.ppLoginToken);
    const [pcData, setPcData] = useState([]);
    const [pcNum, setPcNum] = useState(-1);

    const getPcList = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/pc-providers/current/pcs`,
            { headers: { ppLoginToken: ppLoginToken } })
            .then((res) => {
                console.log(res.data.pcs);
                setPcData(res.data.pcs);
                setPcNum(res.data.pcs.length);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const setList = () => {
        const noList = document.getElementById("noList");
        const uuidList = document.getElementById("uuidList");
        const privateIpList = document.getElementById("privateIpList");
        const portsList = document.getElementById("portsList");
        const statusList = document.getElementById("statusList");
        console.log("hi", pcData.length)
        for (let i = 0; i < pcData.length; i++) {
            let no = i + 1;
            let uuid = pcData[i].uuid;
            let privateIp = pcData[i].ip;
            const portNums = [pcData[i].port1, pcData[i].port2, pcData[i].port3,
            pcData[i].port4, pcData[i].port5, pcData[i].port6, pcData[i].port7]
            let ports = portNums;
            let status = pcData[i].state == "unusable" ? "사용중" : "대기중";
            let noLi = document.createElement('li');
            noLi.appendChild(document.createTextNode(no));
            let uuidLi = document.createElement('li');
            uuidLi.appendChild(document.createTextNode(uuid));
            let privateIpLi = document.createElement('li');
            privateIpLi.appendChild(document.createTextNode(privateIp));
            let portsLi = document.createElement('li');
            portsLi.appendChild(document.createTextNode(ports));
            let statusLi = document.createElement('li');
            statusLi.appendChild(document.createTextNode(status));
            const array = [noLi, uuidLi, privateIpLi, portsLi, statusLi];
            array.forEach((item) => {
                item.style.paddingTop = "30px";
                item.style.fontSize = "18px";
            })
            status == "사용중" ? statusLi.style.color = "#0052cc" : statusLi.style.color = "#b1b1b1";
            noList.appendChild(noLi);
            uuidList.appendChild(uuidLi);
            privateIpList.appendChild(privateIpLi);
            portsList.appendChild(portsLi);
            statusList.appendChild(statusLi);
        }
    }

    useEffect(() => {
        getPcList();
    }, [ppLoginToken]);
    useEffect(() => {
        setList();
    }, [pcData])
    return (
        <div className="container">
            {pcNum != -1 && <h1>등록된 PC 관리 (총 {pcNum}대)</h1>}
            {pcNum != -1 && <div className="standard">
                <div className="no">No</div>
                <div className="uuid">uuid</div>
                <div className="privateIp">private IP</div>
                <div className="ports">ports</div>
                <div className="status">status</div>
            </div>}
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
                <div className="ports">
                    <ul id="portsList"></ul>
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
                width: 360px;
            }
            .privateIp {
                width: 160px;
            }
            .ports {
                width: 240px;
                white-space: nowrap;
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