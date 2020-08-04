import React from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../store/auth/action";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const CLIENT_ID =
  "667027998429-n50iijf7gfoe7ildnvvvplge4u9ovdj3.apps.googleusercontent.com";

const GoogleButton = () => {
    const dispatch = useDispatch();
    // Google Login
    const onResponseGoogle = (res: any) => {
        console.log(res);
        axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/oauth/google/signin`, {
            idToken: res.wc.id_token
        })
            .then((res) => {
                dispatch(signin(res.data.loginToken));
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
            />
        </div>
    );

};
export default GoogleButton;
