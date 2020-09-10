import Link from "next/link";

const UserType = () => {
    return (
        <div className="container">
            <h1>로그인</h1>
            <div className="items">
                <Link href="/manager/signin">
                    <a>
                        <div className="manager">
                            <img src={require("../../styles/images/join_admin.png")} />
                            <p>관리자로 로그인하기</p>
                        </div>
                    </a>
                </Link>
                <Link href="/user/signin">
                    <a>
                        <div className="user">
                            <img src={require("../../styles/images/join_user.png")} />
                            <p>사용자로 로그인하기</p>
                        </div>
                    </a>
                </Link>
            </div>
            <div className="bottom">
                <label>계정이 없으신가요?</label>
                <Link href="/signupusertype">
                    <a id="signUp">회원가입</a>
                </Link>
            </div>
            <style jsx>{`
                *{
                    font-family: "Apple SD Gothic";
                    color: #000000;
                }
                h1 {
                    font-size: 24px;
                }
                .container{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 87px;
                    font-size: 18px;
                }
                .items{
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    margin-top: 59px;
                }
                .manager, .user{
                    width: 200px;
                    height: 160px;
                    border-radius: 15px;
                    border: solid 1px #bbbbbb;
                    margin-right: 10px;
                    margin-left: 10px;
                    align-items:center;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                  } 
                a {
                    text-decoration: none;
                }
                #signUp{
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: -0.17px;
                    color: #0052cc;
                }
                .bottom {
                    margin-top: 50px;
                }
                img {
                    width: 50px;
                    height: 52.5px;
                    padding-top: 44px;
                }
                .manager:hover, .user:hover {
                    border: solid 1px #0052cc;
                }
                label{
                    margin-right: 10px;
                }
            `}
            </style>
        </div>
    );
};

export default UserType;