import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Nav = () => {
    const ppUserEmail = useSelector((state: RootState) => state.ppAuth.ppUserEmail);
    const logout = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/';
    }
    let url = (document.URL).split("manager/")[1];
    return (
        <div className="nav">
            <section id="account">
                <label htmlFor="email">관리자 계정</label><br />
                {console.log(ppUserEmail)}
                <p className={ppUserEmail.length <= 18 ? "shortEmail" : "longEmail"}>
                    {ppUserEmail}
                </p>
            </section>
            <ul className="main">
                <Link href="/manager/manual">
                    <li><a
                        className={url == "manual" ? "selected" : ""}>
                        PC 등록 메뉴얼
                    </a></li>
                </Link>
                <Link href="/manager/pcenrolled">
                    <li><a
                        className={url == "pcenrolled" ? "selected" : ""}>
                        등록된 PC 확인
                    </a></li>
                </Link>
                <Link href="/manager/profit">
                    <li><a
                        className={url == "profit" ? "selected" : ""}>
                        내 수익
                    </a></li>
                </Link>
                <Link href="/manager/bankaccount">
                    <li><a
                        className={url == "bankaccount" ? "selected" : ""}>
                        내 계좌 정보
                    </a></li>
                </Link>
            </ul>
            <ul className="bottom">
                <Link href="/manager/accountinfo">
                    <li><a
                        className={url == "accountinfo" ? "selected" : ""}>
                        내 정보 수정
                    </a></li>
                </Link>
                <li id="logout" onClick={logout}>로그아웃</li>
            </ul>
            <style jsx>{`
                *{
                    box-sizing: border-box;
                }
                .nav{
                    flex-direction: column;
                    border-right: solid 0.5px #b1b1b1;
                    display: flex;
                    width: 240px;   
                    height: auto;
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
                a {
                    text-decoration: none;
                    cursor: pointer;
                    display: block;
                }
                .selected {
                    width: 180px;
                    height: 40px;
                    border-radius: 10px;
                    background-color: #0052cc;
                    color: #ffffff;
                    padding-left: 10px;
                    margin-left: -10px;
                    padding-top: 10px;
                    margin-top: -10px;
                    margin-bottom: -9px;
                }
                .bottom{
                    margin-top: 50px;
                }
                p {
                    margin-top: 5px;
                    font-size: 16px;
                    white-space: nowrap;
                }
                .longEmail {
                    font-size: 14px;
                }
                #logout {
                    cursor: pointer;
                }
                @media(max-width: 1000px){
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