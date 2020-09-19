import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Nav = () => {
    const userEmail = useSelector((state:RootState)=>state.auth.userEmail);
    const logout = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/';
    }
    return (
        <div className="nav">
            <section id="account">
                <label htmlFor="email">사용자 계정</label><br/>
                <p>{userEmail}</p>
            </section>
            <ul>
                <Link href="/user/accountinfo">
                    <a><li className="list">내 정보 수정</li></a>
                </Link>
                <Link href="/user/charge">
                    <a><li className="list">시간 충전하기</li></a>
                </Link>
                <Link href="/user/lefttime">
                    <a><li className="list">남은 사용량</li></a>
                </Link>
                <li id="logout" onClick={logout}>로그아웃</li>
            </ul>
            <style jsx>{`
                *{
                    font-family: "Apple SD Gothic";
                    box-sizing: border-box;
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
                #logout{
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