import Link from 'next/link';

const linkStyle = {
    marginRight: 15
    
};

const Header = () => (
    <div>
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/signIn">
            <a style={linkStyle}>로그인</a>
        </Link>
        <Link href="/signUp">
            <a style={linkStyle}>회원가입</a>
        </Link>
    </div>
);

export default Header;