import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Nav = () => {
    const ppUserEmail = useSelector((state:RootState)=>state.ppAuth.ppUserEmail);
    const logout = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/';
    }
    return (
        <div className="nav">
            <section id="account">
                <label htmlFor="email">관리자 계정</label><br />
                {console.log(ppUserEmail)}
                <p>{ppUserEmail}</p>
            </section>
            <ul className="main">
                <Link href="/manager/manual">
                    <a><li>PC 등록 메뉴얼</li></a>
                </Link>
                <Link href="/manager/pcenrolled">
                    <a><li>등록된 PC 확인</li></a>
                </Link>
                <Link href="/manager/profit">
                    <a><li>내 수익</li></a>
                </Link>
                <Link href="/manager/bankaccount">
                    <a><li>내 계좌 정보</li></a>
                </Link>
            </ul>
            <ul className="bottom">
                <Link href="/manager/accountinfo">
                    <a><li>내 정보 수정</li></a>
                </Link>
                <li id="logout" onClick={logout}>로그아웃</li>
            </ul>
            <style jsx>{`
                *{
                    font-family: "Apple SD Gothic";
                }
                .nav{
                    flex-direction: column;
                    border-right: solid 0.5px #b1b1b1;
                    display: flex;
                    width: 240px;   
                    height: 100vh;
                    font-size: 18px;
                    line-height: 2.0em;
                    z-index: 1;
                }
                ul{
                    list-style:none;
                }
                #account {
                    width: 200px;
                    height: 80px;
                    border-radius: 10px;
                    background-color: #f6f6f6;
                    margin: 20px;
                    padding-left: 20px;
                    box-sizing: border-box;
                    padding-top: 15px;
                    padding-bottom: 15px;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    color: #141414;
                }
                label{
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0052cc;
                }
                li {
                    margin-top: 25px;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: -0.17px;
                    color: #000000;
                }
                a{
                    text-decoration: none;
                }
                bottom{
                    margin-top: 50px;
                }
                p {
                    margin-top: 5px;
                    font-size: 16px;
                    white-space: nowrap;
                }
                @media(max-width: 700px){
                    .nav{
                        display: none;
                    }
                }
            `}
            </style>
        </div>
    );
};

export default Nav;