import React from "react";
import { useDispatch } from "react-redux";
import { ppSignin } from "../../../store/pp_auth/action";
import { GoogleLogin } from "react-google-login";
import { useRouter } from "next/router";
import axios from "axios";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;

const GoogleButton = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    // Google Login
    const onResponseGoogle = (res: any) => {
        console.log(res);
        const email = res.profileObj.email;
        axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/pp-auth/oauth/google/signin`, {
            idToken: res.wc.id_token
        }, {
            withCredentials: true
        })
            .then((res) => {
                dispatch(ppSignin(res.data.ppLoginToken, email));
                localStorage.setItem(
                    "managerInfo",
                    JSON.stringify({
                        managerEmail: email,
                        ppLoginToken: res.data.ppLoginToken,
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
                        <img src={require("../../../public/images/login_google.png")}
                            alt="google logo" />
                        <p>Google로 로그인</p>
                        <style jsx>{`
                            button {
                                width: 420px;
                                height: 50px;
                                border-radius: 15px;
                                border: solid 1px #666666;
                                background-color: #ffffff;
                                font-size: 18px;
                                display: flex;
                                align-items: center;
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
