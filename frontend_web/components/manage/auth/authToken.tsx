import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../../store/store";

const AuthToken = () => {
    const [reloadTick, setReloadTick] = useState(false);
    const [authCode, setAuthCode] = useState("");
    const [remainTime, setRemainTime] = useState(0);

    useEffect(() => {
        
        const timer = setInterval(() => {
            console.log(1);
            if (remainTime > 0) {
                setRemainTime(prevTime => (prevTime - 1));
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [remainTime]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/pp-auth/auth-token`, {
            withCredentials: true
        })
            .then((res) => {
                setAuthCode(res.data.authToken);
                setRemainTime(1 * 60 * 5);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reloadTick]);

    return (
        <div>
            <a>{authCode} 유효시간 {remainTime}</a>
            <button onClick={() => setReloadTick(!reloadTick)}>
                새로고침
            </button>
        </div>
    );
};

export default AuthToken;
