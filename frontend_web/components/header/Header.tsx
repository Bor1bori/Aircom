import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import GoogleButton from '../auth/GoogleButton';
import { RootState } from '../../store/store';

const linkStyle = {
    marginRight: 15
};

const Header = () => {
    const authState = useSelector((state: RootState) => state.auth)
    return (
        <div>
            <Link href="/">
                <a style={linkStyle}>Home</a>
            </Link>
            {authState.isSignedin ? <>
                <a>로그아웃</a>
            </>
            : <>
                <Link href="/signin">
                <a style={linkStyle}>로그인</a>
                </Link>
                <Link href="/signup">
                    <a style={linkStyle}>회원가입</a>
                </Link>
            </>
            }

            <GoogleButton/>
        </div>
    )
};

export default Header;
