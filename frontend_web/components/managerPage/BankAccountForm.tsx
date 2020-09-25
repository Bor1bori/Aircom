import React, { useEffect } from "react";

const AccountManage = () => {
    const data = [
        {
            no: "1",
            bank: "우리은행",
            account: "111111-111-1111111",
        },
        {
            no: "2",
            bank: "카카오 뱅크",
            account: "111111-111-111111",
        },
        {
            no: "3",
            bank: "신한은행",
            account: "111111-111-111111",
        }
    ]
    const accountNum = data.length;
    const setList = () => {
        const noList = document.getElementById("noList");
        const bankList = document.getElementById("bankList");
        const accountList = document.getElementById("accountList");
        const manageList = document.getElementById("manageList");
        for (let i = 0; i < data.length; i++) {
            let no = data[i].no;
            let bank = data[i].bank;
            let account = data[i].account;
            let noLi = document.createElement('li');
            noLi.appendChild(document.createTextNode(no));
            let bankLi = document.createElement('li');
            bankLi.appendChild(document.createTextNode(bank));
            let accountLi = document.createElement('li');
            accountLi.appendChild(document.createTextNode(account));
            const array = [noLi, bankLi, accountLi];
            array.forEach((item) => {
                item.style.paddingTop = "30px";
                item.style.fontSize = "18px";
            });
            let btn1 = document.createElement("button");
            btn1.innerHTML = "수정";
            let btn2 = document.createElement("button");
            btn2.innerHTML = "삭제"; 
            const buttons = [btn1, btn2];
            buttons.forEach((btn)=> {
                btn.style.width = "60px";
                btn.style.height = "32px";
                btn.style.borderRadius = "16px";
                btn.style.border = "solid 1px #a1a1a1";
                btn.style.backgroundColor = "#ffffff";
                btn.style.fontSize = "16px";
                btn.style.marginTop = "20px";
                btn.style.marginRight = "10px";
            });
            noList.appendChild(noLi);
            bankList.appendChild(bankLi);
            accountList.appendChild(accountLi);
            manageList.appendChild(btn1);
            manageList.appendChild(btn2);
            btn2.onclick = () => {
                if (window.confirm("계좌를 삭제하시겠습니까?")){
                    array.forEach((item) => {
                        item.remove();
                    });
                    buttons.forEach((btn)=> {
                        btn.remove();
                    });
                }
            }
        }
    }
    useEffect(() => {
        setList();
    }, []);
    return (
        <div className="container">
            <h1>등록된 계좌 관리 (총 {accountNum}대)</h1>
            <div className="standard">
                <div className="no">No</div>
                <div className="bank">은행명</div>
                <div className="account">계좌번호</div>
                <div className="manage">관리</div>
            </div>
            <div className="list">
                <div className="no">
                    <ul id="noList"></ul>
                </div>
                <div className="bank">
                    <ul id="bankList"></ul>
                </div>
                <div className="account">
                    <ul id="accountList"></ul>
                </div>
                <div className="manage">
                    <ul id="manageList"></ul>
                </div>
            </div>
            <button>새 계좌 등록하기</button>
            <style jsx>{`
                * {
                    font-family: "Apple SD Gothic";
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    height: 100vh;
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
                .bank {
                    width: 250px;
                }
                .account{
                    width: 430px;
                }
                .manage {
                    width: 200px;
                }
                .list {
                    width: 1000px;
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
                    margin-top: 0px;
                    list-style: none;
                    font-size: 18px; 
                    padding-left: 0px;
                    text-align: center;
                }
                button {
                    margin-left: auto;
                    width: 200px;
                    height: 40px;
                    border-radius: 20px;
                    border: solid 1px #0052cc;
                    font-size: 18px;
                    color: #0052cc;
                    background-color: #ffffff;
                    margin-right: 100px;
                    margin-top: 50px;
                    white-space: nowrap;
                }
            `}</style>
        </div>
    );
};

export default AccountManage;