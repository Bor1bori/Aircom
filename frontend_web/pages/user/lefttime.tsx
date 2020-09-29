import React from "react";
import LeftTimeForm from "../../components/userPage/LeftTimeForm";
import Layout from "../../components/layout/Layout";
import Nav from "../../components/nav/NavUser";
import NoSsr from "../../components/NoSSR";

export default function CheckLeftTime() {
    return (
        <Layout>
            <NoSsr>
                <Nav />
            </NoSsr>
            <LeftTimeForm />
        </Layout>
    );
}
