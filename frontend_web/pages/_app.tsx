import React from "react";
import Head from "next/head";
import { wrapper } from "../store/store";
import { useDispatch } from "react-redux";
import { signin } from "../store/auth/action";
import { ppSignin } from "../store/pp_auth/action";
import { useEffect } from 'react';

const WrappedApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
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
    useEffect(() => {
        setLoggedInInfo();
        const httpTokens = /^http:\/\/(.*)$/.exec(window.location.href);
        if (httpTokens) {
            window.location.replace('https://' + httpTokens[1]);
        }
    }, []);
    return (
        <div>
            <Head>
                <title>Aircom</title>
                <link rel="stylesheet"
                    type="text/css"
                    href="https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="theme-color" content="#0052cc" />
            </Head>
            <Component {...pageProps} />
            <style jsx global>{`
                html, body {
                    margin: 0;
                    padding: 0;
                    font-size: 10px;
                    font-family: 'NanumSquare', sans-serif;
                }
            `}</style>
        </div>
    );
};

export default wrapper.withRedux(WrappedApp);
