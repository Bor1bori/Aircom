import React from "react";
import Layout from "../components/layout/Layout";
import LandingPageForm from "../components/landingPage/LandingPageForm";
import { isIE } from 'react-device-detect';
import NoSsr from "../components/NoSSR";

export default function Index() {
    return (
        <Layout>
            {isIE &&
                <div>현재 브라우저는 지원되지 않는 브라우저 입니다.<br />
                Chrome, Firefox, Safari 혹은 MS Edge를 통해 접속해 주세요.</div>}
            <NoSsr>
                <LandingPageForm />
            </NoSsr>
        </Layout>
    );
}