import React from "react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis } from 'recharts';

const Profit = () => {
    const data = [
        {
            "name": "18일",
            "hour": 15,
        },
        {
            "name": "19일",
            "hour": 30,
        },
        {
            "name": "20일",
            "hour": 20,
        },
        {
            "name": "21일",
            "hour": 25,
        },
        {
            "name": "22일",
            "hour": 40,
        },
        {
            "name": "23일",
            "hour": 30,
        },
        {
            "name": "24일",
            "hour": 60,
        }
    ]
    return (
        <div className="primaryContainer">
            <div className="monthlyProfit">
                <h2>이번 달 수익</h2>
                <h2>3,245,000원</h2>
                <div className="chart">
                    <AreaChart width={730} height={230} data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0052cc" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#0052cc" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{ fontSize: 16 }} />
                        <YAxis tick={{ fontSize: 16 }} />
                        <Area type="monotone" dataKey="hour" stroke="#0052cc"
                            fillOpacity={1} fill="url(#color)" />
                    </AreaChart>
                </div>
            </div>
            <div className="secondaryContainer">
                <div className="profitAnalysis">
                    <h2>수익 분석 결과</h2>
                    <p>이번 달 수익이 24% 올랐어요!</p>
                    <Link href="#">
                        <a>자세히 보기</a>
                    </Link>
                </div>
                <div className="account">
                    <h2>내 정산 계좌</h2>
                    <p>카카오뱅크 3333-05-7312465</p>
                    <Link href="/manager/bankaccount">
                        <a>계좌 정보 수정하기</a>
                    </Link>
                </div>
            </div>
            <style jsx>{`
                .primaryContainer {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 60px;
                    margin-bottom: 100px;
                }
                .monthlyProfit {
                    width: 840px;
                    height: 400px;
                    border-radius: 20px;
                    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
                    background-color: #ffffff;
                }
                .profitAnalysis {
                    width: 400px;
                    height: 200px;
                    border-radius: 20px;
                    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
                    background-color: #0052cc;
                }
                .account {
                    width: 400px;
                    height: 200px;
                    border-radius: 20px;
                    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
                    background-color: #ffffff;
                }
                .profitAnalysis, .account {
                    display: flex;
                    flex-direction: column;
                    margin-right: 20px;
                    margin-left: 20px;
                    margin-top: 40px
                }
                .secondaryContainer {
                    display: flex;
                }
                h2 {
                    font-size: 24px;
                    padding-top: 15px;
                }
                p {
                    margin-top: 15px;
                    font-size: 20px;
                }
                h2, p {
                    padding-left: 24px;
                }
                a {
                    margin-left: auto;
                    margin-right: 24px;
                    margin-top: 15px;
                    text-decoration: none;
                    font-size: 18px;
                    color: #0052cc;
                }
                .profitAnalysis h2, .profitAnalysis p,  .profitAnalysis a{
                    color: #ffffff;
                }
                .chart {
                    padding-left: 60px;
                }
            `}</style>
        </div>
    );
};

export default Profit;