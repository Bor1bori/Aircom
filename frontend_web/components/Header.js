import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import GoogleButton from './GoogleButton';

const linkStyle = {
    marginRight: 15
};

const Header = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth)
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