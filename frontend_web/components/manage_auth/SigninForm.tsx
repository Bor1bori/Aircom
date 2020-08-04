import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin } from "../../store/auth/action";
import { useRouter } from "next/router";

const SignIn = () => {
    const dispatch = useDispatch(); // dispatch를 사용하기 쉽게 하는 hook
    const router = useRouter();
    const [signinInput, setSigninInput] = useState({
        email: "",
        password: "",
    });
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSigninInput({
            ...signinInput,
            [e.target.name]: e.target.value,
        });
    };
    const onSignin = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        axios.post("http://api.myaircom.co.kr/pp-auth/signin", signinInput)
            .then((res) => {
                console.log(res);
                dispatch(signin(res.data.loginToken));
                router.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <form onSubmit={onSignin}>
                <label>이메일</label>
                <input
                    value={signinInput.email}
                    onChange={onInputChange}
                    name="email"
                />
                <label>비밀번호</label>
                <input
                    type="password"
                    value={signinInput.password}
                    onChange={onInputChange}
                    name="password"
                />
                <button >로그인</button>
            </form>
        </div>
    );
};

export default SignIn;
