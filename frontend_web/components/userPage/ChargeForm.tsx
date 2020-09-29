import React, { useEffect, useState } from "react";

const Charge = () => {
    const [hour, setHour] = useState(1);
    const [productName, setProductName] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [timeSelected, setTimeSelected] = useState(false);
    const [agreement, setAgreement] = useState(false);
    useEffect(() => {
        timeSelected && setTotalPrice(String(300 * hour) + "원");
    }, [hour]);
    return (
        <div className="primaryContainer">
            <h1>시간 충전하기</h1>
            <div className="secondaryContainer">
                <div className="product">
                    <h2>충전 상품 선택</h2>
                    <input type="radio"
                        id="basic"
                        name="product"
                        value="basic"
                        onClick={() => {
                            setProductName("정액제 - 기본형");
                            setTotalPrice("9,900원");
                            setTimeSelected(false);
                        }} />
                    <label htmlFor="basic">
                        <div className="name">정액제 - 기본형
                        <img src={require("../../public/images/plan_basic.png")} />
                        </div>
                        <div className="details">월 최대 72시간 사용 가능</div>
                        <div className="price">월 / 9,900원</div>
                    </label>
                    <input type="radio"
                        id="pro"
                        name="product"
                        value="pro"
                        onClick={() => {
                            setProductName("정액제 - 프로형");
                            setTotalPrice("19,900원");
                            setTimeSelected(false);
                        }} />
                    <label htmlFor="pro">
                        <div className="name">정액제 - 프로형
                        <img src={require("../../public/images/plan_pro.png")} />
                        </div>
                        <div className="details">월 최대 160시간 사용 가능</div>
                        <div className="price">월 / 19,900원</div>
                    </label>
                    <input type="radio"
                        id="time"
                        name="product"
                        value="time"
                        onClick={() => {
                            setProductName("시간제");
                            setTotalPrice(String(300 * hour) + "원");
                            setTimeSelected(true);
                        }} />
                    <label htmlFor="time">
                        <div className="name">시간제
                        <img id="time" src={require("../../public/images/plan_time.png")} />
                        </div>
                        <div className="details">1시간 기준</div>
                        <div className="price" id="timePrice">
                            <div className="calculateHour">
                                <button
                                    id="minusButton"
                                    onClick={() => setHour(hour == 0 ? 0 : hour - 1)}>
                                    -
                                </button>
                                <div id="hour">{hour}</div>
                                <button
                                    id="plusButton"
                                    onClick={() => setHour(hour + 1)}>
                                    +
                                </button>
                            </div>
                            <div className="pricePerHour">
                                1시간 / 300원
                            </div>
                        </div>
                    </label>
                </div>
                <div className="chargeInfo">
                    <h2>결제 정보</h2>
                    <div className="chargeDetails">
                        <div className="title">상품명</div>
                        <div className="value">{productName}</div>
                    </div>
                    <div className="chargeDetails">
                        <div className="title">사용기간</div>
                        <div className="value">{productName}</div>
                    </div>
                    <div className="chargeDetails">
                        <div className="title">현재 잔여시간</div>
                        <div className="value">{productName}</div>
                    </div>
                    <div className="chargeDetails">
                        <div className="title">충전 후 잔여시간</div>
                        <div className="value">{productName}</div>
                    </div>
                    <div className="chargeDetails">
                        <div className="title">총 결제금액</div>
                        <div className="value">{totalPrice}</div>
                    </div>
                    <div className="agreement">
                        <p>약관 동의</p>
                        <div className="agreementDetails">
                            <p>위 상품 정보 및 거래 조건을 확인하였으며, 구매<br />진행에 동의합니다. (필수)</p>
                            <img
                                id="checkForAgree"
                                src={agreement ?
                                    require("../../public/images/check_active.png")
                                    : require("../../public/images/check_inactive.png")}
                                onClick={() => setAgreement(agreement ? false : true)} />
                        </div>
                    </div>
                    <button>결제하기</button>
                </div>
            </div>
            <style jsx>{`
                .primaryContainer, h1 {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    flex-direction: column;
                }
                h1 {
                    font-size: 32px;
                    margin-top: 60px;
                }
                .secondaryContainer{
                    display: flex;
                }
                h2 {
                    font-size: 24px;
                    white-space: nowrap;
                    margin-bottom: 30px;
                }
                .product, .chargeInfo {
                    margin-top: 20px;
                    margin-left: 40px;
                    margin-right: 40px;
                    margin-bottom: 50px;
                }
                input[type="radio"] {
                    display: none;
                }
                input[type="radio"]:checked+label {
                    border: solid 2px #0052cc;
                }   
                .product label {
                    display: flex;
                    flex-direction: column;
                    width: 320px;
                    height: 160px;
                    border-radius: 20px;
                    border: solid 2px #bbbbbb;
                    background-color: #ffffff;
                    cursor: pointer;
                    box-sizing: border-box;
                    transition: box-shadow 400ms ease;
                    margin-top: 20px;
                    margin-bottom: 20px;
                }  
                .name {
                    font-size: 22px;
                    font-weight: bold;
                    text-align: left;
                    padding-left: 30px;
                    padding-top: 22px;
                    display: inline-block;
                }
                img {
                    width: 40px;
                    height: 35px;
                    padding-left: 80px;
                    vertical-align: middle;
                }
                #time {
                    padding-left: 159px;
                }
                .details {
                    font-size: 18px;
                    text-align: left;
                    padding-left: 30px;
                    margin-top: 12px;
                }
                .price {
                    font-size: 20px;
                    font-weight: bold;
                    text-align: right;
                    padding-right: 30px;
                    margin-top: 23px;
                }
                #timePrice {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }
                .calculateHour {
                    display: flex;
                    padding-right: 56px;
                }
                #minusButton, #plusButton {
                    border: solid 1px #a1a1a1;
                    background-color: #ffffff;
                    width: 30px;
                    height: 32px;
                }
                #minusButton {
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                }
                #plusButton {
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                }
                #hour {
                    border: solid 1px #b1b1b1;
                    border-right: 0px;
                    border-left: 0px;
                    width: 30px;
                    text-align: center;   
                    font-size: 16px;
                    line-height: 30px;
                }
                .chargeDetails {
                    display: flex;
                    width: 360px;
                    margin-top: 20px;
                }
                .title {
                    font-size: 20px;
                    font-weight: bold;
                }
                .value {
                    font-size: 20px;
                    margin-left: auto;
                }
                input[type="checkbox"] {
                    display: none;
                }
                #checkForAgree {
                    height: 16px;
                    width: 16px;
                }
                .agreementDetails {
                    display: flex;
                    width: 360px;
                }
                p {
                    font-size: 20px;
                    margin-top: 150px;
                }
                .agreementDetails p {
                    font-size: 16px;
                    color: #a1a1a1;
                    margin-top: 0px;
                    margin-right: -50px;
                }
                .chargeInfo button:active {
                    background-color: #b1b1b1;
                    border: solid 1px #b1b1b1;
                }
                .chargeInfo button {
                    width: 360px;
                    height: 50px;
                    border-radius: 15px;
                    background-color: #0052cc;
                    border: solid 1px #0052cc;
                    margin-top: 10px;
                    color: #ffffff;
                }
            `}</style>
        </div>
    );
};

export default Charge;