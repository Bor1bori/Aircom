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
                <img src={require("../../styles/images/logo.png")} />
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
                다운로드
            </button>
            <style jsx>{`
                    *{
                        font-size: 18px;
                        font-family: "Apple SD Gothic"
                    }
                    .container{
                        width: 1440px;
                        height: 80px;
                        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
                        background-color: #ffffff;
                        display: flex;
                    }
                    a {
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: -0.17px;
                        color: #000000;
                        text-decoration: none;
                        margin-right: 57px;
                        margin-top: 28px;
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
                        letter-spacing: -0.17px;
                        color: #0052cc;
                        background-color: #ffffff;
                        margin-right: 123px;
                        margin-top: 20px;
                    }
                    img {
                        width: 101.8px;
                        height: 24px;
                        margin-left: 123px;
                        margin-top: 31px;
                        margin-bottom: 31px;
                        margin-right: 820px;
                    }
                 `}
            </style>
        </div>
    );
};

export default Header;
