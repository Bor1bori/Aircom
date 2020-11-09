import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ppSignin } from "../../../store/pp_auth/action";
import { useRouter } from "next/router";
import GoogleButton from "./GoogleButtonForm"

const SignIn = () => {
    const dispatch = useDispatch(); // dispatch를 사용하기 쉽게 하는 hook
    const router = useRouter();
    const [signinInput, setSigninInput] = useState({
        email: "",
        password: "",
    });
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        setSigninInput({
            ...signinInput,
            [e.target.name]: e.target.value,
        });
    };
    const onSignin = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/pp-auth/signin`, signinInput, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res);
                dispatch(ppSignin(res.data.ppLoginToken, signinInput.email));
                localStorage.setItem(
                    "managerInfo",
                    JSON.stringify({
                        managerEmail: signinInput.email,
                        ppLoginToken: res.data.ppLoginToken,
                    })
                );
                router.push("/");
            })
            .catch((err) => {
                if (err.response.status==401) alert("이메일 혹은 비밀번호를 다시 확인해주세요");
                if (err.response.status==400) alert("이메일 혹은 비밀번호 형식이 올바르지 않습니다");
            });
    };
    return (
        <div>
    <form onSubmit={onSignin}>
                <h1>관리자 로그인</h1>
                <input id="email"
                    value={signinInput.email}
                    onChange={onInputChange}
                    name="email"
                    placeholder="이메일"
                />
                <input id="password"
                    type="password"
                    value={signinInput.password}
                    onChange={onInputChange}
                    name="password"
                    placeholder="비밀번호"
                />
                <button>로그인</button>
                <p></p>
                <div className="googleLogin">
                    <GoogleButton />
                </div>
            </form>
            <style jsx>{`
                h1, div{
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }
                h1 {
                    font-size: 24px;
                    margin-top: 87px;
                }
                form{
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                }
                #email{
                    margin-top: 53px;
                }
                #password{
                    margin-top: 10px;
                }
                input {
                    width: 420px;
                    height: 50px;
                    border-radius: 15px;
                    border: solid 1px #bbbbbb;
                    box-sizing: border-box;
                    padding-left: 14px;
                    font-size: 18px;
                }
                button {
                    margin-top: 15px;
                    width: 420px;
                    height: 50px;
                    border-radius: 15px;
                    background-color: #0052cc;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: -0.17px;
                    color: #ffffff;
                    border: none;
                }
               .googleLogin {
                    margin-top: 35px;
               }
               a{
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: -0.17px;
                color: #0052cc;
                text-decoration: none;
                margin-top: 60px;
               }
               button:active {
                background-color: #bbbbbb;
               }
               p {
                   border: solid 1px #bbbbbb;
                   opacity: 0.5;
                   margin-top: 50px;
               }
            `}</style>
        </div>
    );
};

export default SignIn;
