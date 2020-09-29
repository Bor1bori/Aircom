import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";


const ModifyAccountInfo = () => {
    const loginToken = useSelector((state: RootState) => state.ppAuth.ppLoginToken);
    const email = useSelector((state: RootState) => state.ppAuth.ppUserEmail);
    const [signInType, setSignInType] = useState("");
    const [updateInput, setUpdateInput] = useState({
        password: "",
        gender: "",
        birthdate: "",
    });
    const router = useRouter();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateInput({
            ...updateInput,
            [e.target.name]: e.target.value,
        });
    };
    const getAccountInfo = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/pc-providers/current`, { headers: { ppLoginToken: loginToken } })
            .then((res) => {
                console.log(res);
                let birthDate = res.data.birthdate;
                birthDate = birthDate.substring(0, 10);
                setSignInType(res.data.signinType);
                setUpdateInput({
                    ...updateInput,
                    gender: res.data.gender,
                    birthdate: birthDate,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const updateAccountInfo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (updateInput.password.length>0){
            axios.put(`${process.env.NEXT_PUBLIC_API_HOST}/pc-providers/current`,  {
                birthdate: updateInput.birthdate, gender: updateInput.gender, password: updateInput.password},  {
                headers: {ppLoginToken: loginToken}})
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            axios.put(`${process.env.NEXT_PUBLIC_API_HOST}/pc-providers/current`,  {
                birthdate: updateInput.birthdate, gender: updateInput.gender},  {
                headers: {ppLoginToken: loginToken}})
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const deleteAccount = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        e.preventDefault();
        if (window.confirm('정말로 탈퇴하겠습니까?')){
            axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/pc-providers/current`, {
                headers: {ppLoginToken: loginToken}})
                .then((res) => {
                    console.log(res);
                    router.push("/");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    useEffect(() => {
        getAccountInfo();        
    }, [])
    return (
        <div>
            <form onSubmit={updateAccountInfo}>
                <h1>내 정보 수정</h1>
                <label id="email">이메일</label>
                <p className="signUp">{email}</p>
                {signInType == "email" && <label id="password">비밀번호</label>}
                {signInType == "email" &&
                    <input className="signUp"
                        onChange={onInputChange}
                        type='password'
                        name="password"
                        value={updateInput.password}
                        placeholder="8자 이상 입력해주세요"
                    />}
                {signInType == "email" && <label id="gender">성별</label>}
                {signInType == "email" && <div className="gender">
                    <input type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        onChange={onInputChange}
                        checked={updateInput.gender=="male"}
                        />
                    <label htmlFor="male">남성</label>
                    <input type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        onChange={onInputChange}
                        checked={updateInput.gender=="female"}
                        />
                    <label htmlFor="female">여성</label>
                </div>}
                {signInType == "email" && <label id="birthDate">생년월일</label>}
                {signInType == "email" &&
                    <input className="signUp"
                        name="birthdate"
                        type="date"
                        placeholder="예: 1998-04-21"
                        value={updateInput.birthdate}
                        onChange={onInputChange}
                    />}
                <p className="deletion" onClick={deleteAccount}>탈퇴하기</p>
                {signInType == "email" && 
                <button>
                    수정하기
                </button>}
            </form>
            <style jsx>{`
            h1, div{
                display: flex;
                width: 100%;
                justify-content: center;
            }
            h1 {
                font-size: 32px;
                margin-top: 60px;
            }
            form{
                height: 100vh;
                display: flex;
                flex-direction: column;
            }
            p {
                padding-top: 13px;
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
                margin-top: 30px;
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
            .userType{
                margin-top: 59px;
            }
            #email{
                margin-top: 27px;
                font-size: 18px;
                }
                input::placeholder {
                    color: #bbbbbb;
                  }
                .signUp, .gender{
                    margin-top: 10px;
                }
                #password, #gender, #birthDate{
                    font-size: 18px;
                    margin-top: 20px;
                }
                input[type="radio"] {
                    display: none;
                  }
                  
                .gender label {
                    width: 200px;
                    height: 50px;
                    border-radius: 15px;
                    border: solid 1px #bbbbbb;
                    background-color: #ffffff;
                    cursor: pointer;
                    margin: 5px;
                    font-size: 18px;
                    text-align: center;
                    padding-top: 13px;
                    box-sizing: border-box;
                    color: #bbbbbb;
                    transition: box-shadow 400ms ease;
                }       
                input[type="radio"]:checked+label {
                    color: #0052cc;
                    border-color: #0052cc;
                  }
            button:active {
                background-color: #bbbbbb;
            }
            .deletion{
                text-decoration: none;
                color: #bbbbbb;
                margin-top: 10px;
                text-align: right;
                font-size: 18px;
                cursor: pointer;
            }
        `}</style>
        </div>
    );
};

export default ModifyAccountInfo;