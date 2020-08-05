import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import GoogleButton from "../auth/GoogleButton";
import { RootState } from "../../../store/store";
import AuthToken from "../auth/authToken";

const linkStyle = {
    marginRight: 15
};

const ManageHeader = () => {
    const ppAuthState = useSelector((state: RootState) => state.ppAuth);
    return (
        <div>
            <Link href="/">
                <a style={linkStyle}>Home</a>
            </Link>
            {ppAuthState.isSignedin ? <>
                <AuthToken/>
                <a>로그아웃</a>
            </>
                : <>
                    <Link href="/manage/signin">
                        <a style={linkStyle}>로그인</a>
                    </Link>
                    <Link href="/manage/signup">
                        <a style={linkStyle}>회원가입</a>
                    </Link>
                    <Link href="/">
                        <a style={linkStyle}>메인페이지로 이동</a>
                    </Link>
                </>
            }

            <GoogleButton/>
        </div>
    );
};

export default ManageHeader;
