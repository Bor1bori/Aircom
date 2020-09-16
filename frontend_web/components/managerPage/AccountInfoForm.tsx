import Link from "next/link";

const ModifyAccountInfo = () => {
    return (
        <div>
            <form>
                <h1>내 정보 수정</h1>
                <label id="email">이메일</label>
                <input className="signUp"
                    name="email"
                    placeholder="예: aircom@naver.com"
                />
                <label id="password">비밀번호</label>
                <input className="signUp"
                    type='password'
                    name="password"
                    placeholder="8자 이상 입력해주세요"
                />
                <label id="gender">성별</label>
                <div className="gender">
                    <input type="radio" id="male" name="gender" value="male" />
                    <label htmlFor="male">남성</label>
                    <input type="radio" id="female" name="gender" value="female" />
                    <label htmlFor="female">여성</label>
                </div>
                <label id="birthDate">생년월일</label>
                <input className="signUp"
                    name="birthdate"
                    type="date"
                    placeholder="예: 980421"
                />
                <Link href="#">
                    <a>탈퇴하기</a>
                </Link>
                <button type="button">
                    수정하기
            </button>
            </form>
            <style jsx>{`
            *{
                font-family: "Apple SD Gothic";
            }
            h1, div{
                display: flex;
                width: 100%;
                justify-content: center;
            }
            h1 {
                font-size: 32px;
                margin-top: 98px;
            }
            form{
                height: 100vh;
                display: flex;
                flex-direction: column;
            }
            .signUp {
                width: 420px;
                height: 50px;
                border-radius: 15px;
                border: solid 1px #bbbbbb;
                box-sizing: border-box;
                padding-left: 14px;
                font-size: 18px;
            }
            button {
                margin-top: 30px;
                width: 420px;
                height: 50px;
                border-radius: 15px;
                background-color: #0052cc;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: -0.17px;
                color: #ffffff;
                border: none;
            }
            .userType{
                margin-top: 59px;
            }
            #email{
                margin-top: 27px;
                font-size: 18px;
            }
            input::placeholder {
                color: #bbbbbb;
              }
            .signUp, .gender{
                margin-top: 10px;
            }
            #password, #gender, #birthDate{
                font-size: 18px;
                margin-top: 20px;
            }
            input[type="radio"] {
                display: none;
              }
              
            .gender label {
                width: 200px;
                height: 50px;
                border-radius: 15px;
                border: solid 1px #bbbbbb;
                background-color: #ffffff;
                cursor: pointer;
                margin: 5px;
                font-size: 18px;
                text-align: center;
                padding-top: 13px;
                box-sizing: border-box;
                color: #bbbbbb;
                transition: box-shadow 400ms ease;
            }       
            input[type="radio"]:checked+label {
                color: #0052cc;
                border-color: #0052cc;
              }
            button:active {
                background-color: #bbbbbb;
            }
            a{
                text-decoration: none;
                color: #bbbbbb;
                margin-top: 40px;
                text-align: right;
                font-size: 18px;
            }
        `}</style>
        </div>
    );
};

export default ModifyAccountInfo;