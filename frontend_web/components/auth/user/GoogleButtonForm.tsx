import React from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../../store/auth/action";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useRouter } from "next/router";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;

const GoogleButton = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    // Google Login
    const onResponseGoogle = (res: any) => {
        console.log(res);
        const email = res.profileObj.email;
        axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/oauth/google/signin`, {
            idToken: res.wc.id_token
        }, {
            withCredentials: true
        })
            .then((res) => {
                dispatch(signin(res.data.loginToken, email));
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify({
                        userEmail: email,
                        loginToken: res.data.loginToken,
                    })
                );
                router.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Login Fail
    const onResponseFail = (err: any) => {
        console.log("fail");
        console.log(err);
    };


    return (
        <div>
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Google로 로그인하기"
                onSuccess={onResponseGoogle}
                onFailure={onResponseFail}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <div>
                        <img src={require("../../../public/images/login_google.png")}
                            alt="google logo" />
                        <p>Google로 로그인</p>
                        </div>
                        <style jsx>{`
                            button {
                                width: 420px;
                                height: 50px;
                                border-radius: 15px;
                                border: solid 1px #666666;
                                background-color: #ffffff;
                            }    
                            div {
                                font-size: 18px;
                                display: flex;
                                align-items: center;
                                height: 50px;
                            }   
                            img {
                                width: 30px;
                                height: 30px;
                                margin-left: 63px;
                                margin-right: -63px;
                            }  
                            p {
                                display: flex;
                                width: 420px;
                                justify-content: center;
                            }       
                        `}</style>
                    </button>
                )}
            />
        </div>
    );

};
export default GoogleButton;
