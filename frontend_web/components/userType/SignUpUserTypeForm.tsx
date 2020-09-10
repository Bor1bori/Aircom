import Link from "next/link";

const UserType = () => {
    return (
        <div className="container">
            <h1>회원가입</h1>
            <div className="items">
                <Link href="/manager/signup">
                    <a>
                        <div className="manager">
                            <img src={require("../../styles/images/join_admin.png")} />
                            <p>관리자로 회원가입하기</p>
                        </div>
                    </a>
                </Link>
                <Link href="/user/signup">
                    <a>
                        <div className="user">
                            <img src={require("../../styles/images/join_user.png")} />
                            <p>사용자로 회원가입하기</p>
                        </div>
                    </a>
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
                img {
                    width: 50px;
                    height: 52.5px;
                    padding-top: 44px;
                }
                .manager:hover, .user:hover {
                    border: solid 1px #0052cc;
                }
            `}
            </style>
        </div>
    );
};

export default UserType;