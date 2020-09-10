import React, {useState} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {ppSignin} from "../../../store/pp_auth/action";

const SignUp = () => {
    const router = useRouter();
    const dispatch = useDispatch(); // dispatch를 사용하기 쉽게 하는 hook
    const [signupInput, setSignupInput] = useState({
        email: "",
        password: "",
        gender: "male",
        birthdate: "",
    });
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSignupInput({
            ...signupInput,
            [e.target.name]: e.target.value,
        });
    };
    const onSignup = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/pp-auth/signup`, signupInput, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res);
                dispatch(ppSignin(res.data.ppLoginToken));
                router.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <form onSubmit={onSignup}>
                <h1>관리자 회원가입</h1>
                <label id="email">이메일</label>
                <input className="signUp"
                    value={signupInput.email}
                    onChange={onInputChange}
                    name="email"
                    placeholder="예: aircom@naver.com"
                />
                <label id="password">비밀번호</label>
                <input className="signUp"
                    type='password'
                    value={signupInput.password}
                    onChange={onInputChange}
                    name="password"
                    placeholder="8자 이상 입력해주세요"
                />
                <label id="gender">성별</label>
                <select name="gender" value={signupInput.gender} onChange={onInputChange}>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                </select>
                <label id="birthDate">생년월일</label>
                <input className="signUp"
                    value={signupInput.birthdate}
                    onChange={onInputChange}
                    name="birthdate"
                    type="date"
                    placeholder="예: 980421"
                />
                <button>
                    회원가입
                </button>
            </form>
            <style jsx>{`
                * {
                    font-family: "Apple SD Gothic"
                }
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
                .signUp {
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
                    margin-top: 71px;
                }
                .userType{
                    margin-top: 59px;
                }
                #user{
                    margin-left: 20px;
                }
                #email{
                    margin-top: 40px;
                }
                .signUp{
                    margin-top: 10px;
                }
                #password, #gender, #birthDate{
                    margin-top: 20px;
                }
                button:active {
                    background-color: #bbbbbb;
                }
            `}</style>
        </div>
    );
};
export default SignUp;
