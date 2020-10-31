import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Header = () => {
    const authState = useSelector((state: RootState) => state.auth);
    const ppAuthState = useSelector((state: RootState) => state.ppAuth);
    const state = authState.isSignedin ? "user" : ppAuthState.isSignedin ? "pp" : "none";
    return (
        <div className="container">
            <Link href="/">
                <img src={require("../../public/images/logo.png")} />
            </Link>
            {state == "none" ?
                <Link href="/signinusertype">
                    <a>로그인</a>
                </Link> :
                state == "user" ?
                    <Link href="/user/accountinfo">
                        <a>마이 페이지</a>
                    </Link>
                    :
                    <Link href="/manager/manual">
                        <a>관리 페이지</a>
                    </Link>
            }
            <button>
                <a href="https://drive.google.com/file/d/1sbPvznE84yC7RgFZ9gt98q-qR_hWq0GB/view?usp=sharing"
                    target="_blank">
                    다운로드
                </a>
            </button>
            <style jsx>{`
                    *{
                        font-size: 1.8rem;
                    }
                    .container{
                        width: 100%;
                        height: 80px;
                        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
                        background-color: #ffffff;
                        display: flex;
                        align-items: center;
                    }
                    button a {
                        color :#0052cc;
                    }
                    a {
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        color: #000000;
                        text-decoration: none;
                        margin-right: 4%;
                        white-space: nowrap;
                    }
                    button {
                        width: 120px;
                        height: 40px;
                        border-radius: 20px;
                        border: solid 1px #0052cc;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        color: #0052cc;
                        background-color: #ffffff;
                        margin-right: 8.5%;
                        white-space: nowrap;
                    }
                    img {
                        width: 125px;
                        height: 30px;
                        margin-left: 8.5%;
                        margin-right: 57%;
                    }
                    @media(max-width: 1000px){
                        img {
                            width: 100px;
                            height: 24px;
                        }
                    }
                    @media(max-width: 900px){
                        img {
                            margin-right: 45%;
                        }
                    }
                    @media(max-width: 700px){
                        img {
                            margin-right: 35%;
                        }
                        * {
                            font-size: 1.5rem;
                        }
                        button {
                            width: 105px;
                            height: 35px;
                        }
                    }
                    @media(max-width: 500px){
                        img {
                            margin-right: 30%;
                            width: 75px;
                            height: 18px;
                        }
                        * {
                            font-size: 1.2rem;
                        }
                        button {
                            width: 90px;
                            height: 30px;
                        }
                    }
                 `}
            </style>
        </div>
    );
};

export default Header;
