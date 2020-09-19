import React from "react";
import { wrapper } from "../store/store";
import { useDispatch } from "react-redux";
import { signin } from "../store/auth/action";
import { ppSignin } from "../store/pp_auth/action";
import { useEffect } from 'react';

const WrappedApp = ({ Component, pageProps }: {Component: any; pageProps: any}) => {
    const dispatch = useDispatch();
    const setLoggedInInfo = () => {
        const userLoggedIn = localStorage.getItem("userInfo");
        const managerLoggedIn = localStorage.getItem("managerInfo");
        if (userLoggedIn) {
            const userInfo = JSON.parse(userLoggedIn);
            dispatch(signin(userInfo.loginToken, userInfo.userEmail));
        }
        if (managerLoggedIn) {
            const managerInfo = JSON.parse(managerLoggedIn);
            dispatch(ppSignin(managerInfo.ppLoginToken, managerInfo.managerEmail));
        }
    }
    useEffect(setLoggedInInfo, []);
    return <Component {...pageProps} />;
};

export default wrapper.withRedux(WrappedApp);
