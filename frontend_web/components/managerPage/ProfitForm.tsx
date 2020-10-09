import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis } from 'recharts';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CountUp from 'react-countup';

const Profit = () => {
    const ppLoginToken = useSelector((state: RootState) => state.ppAuth.ppLoginToken);
    const [pcData, setPcData] = useState([]);
    const [graphData, setGraphData] = useState([{
        month: 0,
        date: 0,
        hour: 0,
    }]);
    const [totalHour, setTotalHour] = useState(0);
    const getPcHistory = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/pc-providers/current/use-pcs`,
            { headers: { ppLoginToken: ppLoginToken } })
            .then((res) => {
                console.log(res.data.usePcs);
                setPcData(res.data.usePcs);
            })
            .catch((err) => {
                console.log(err);
            })
    };
    const setData = () => {
        const data: ObjectInterface.GraphData[] = [];
        let hour = 0;
        pcData.forEach(value => {
            const date1 = new Date(value.endTime);
            const date2 = new Date(value.startTime);
            if (value.endTime != null) {
                const diff = (date1.getTime() - date2.getTime()) / 3600000;
                const element = {
                    month: 0,
                    date: 0,
                    hour: 0,
                };
                element.date = date2.getDate();
                element.hour = diff;
                element.month = date2.getMonth() + 1;
                hour += element.hour;
                console.log(hour);
                let isPushed = false;
                data.forEach(item => {
                    if (item.date == element.date && item.month == element.month) {
                        item.hour += element.hour;
                        isPushed = true;
                    }
                })
                if (!isPushed) {
                    data.push(element);
                }
            }
        });
        data.sort(function (x: ObjectInterface.GraphData, y: ObjectInterface.GraphData) {
            return x.month < y.month ? -1 : x.month > y.month ? 1 : 0;
        });
        data.sort(function (x: ObjectInterface.GraphData, y: ObjectInterface.GraphData) {
            return x.date < y.date ? -1 : x.date > y.date ? 1 : 0;
        });
        setGraphData(data);
        setTotalHour(Math.round(hour));
    }
    useEffect(() => {
        getPcHistory();
    }, [ppLoginToken]);
    useEffect(() => {
        setData();
    }, [pcData]);
    return (
        <div className="primaryContainer">
            <div className="monthlyProfit">
                <h2>이번 달 수익</h2>
                <p className="profit">
                    <strong>
                        <CountUp end={totalHour * 1000}
                            duration={1.5} />원
                    </strong>
                </p>
                <div className="chart">
                    {graphData[0] && <AreaChart width={730} height={230} data={graphData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0052cc" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#0052cc" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" tick={{ fontSize: 14 }} unit={"일"} />
                        <YAxis tick={{ fontSize: 14 }} unit={"시간"} />
                        <Area type="monotone" dataKey="hour" stroke="#0052cc"
                            fillOpacity={1} fill="url(#color)" />
                    </AreaChart>}
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
                .profit {
                    font-size: 30px;
                }
            `}</style>
        </div>
    );
};

export default Profit;