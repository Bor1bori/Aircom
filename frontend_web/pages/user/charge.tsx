import React from "react";
import ChargeForm from "../../components/userPage/ChargeForm";
import Layout from "../../components/layout/Layout";
import Nav from "../../components/nav/NavUser";
import NoSsr from "../../components/NoSSR";

export default function ChargeService() {
    return (
        <Layout>
            <NoSsr>
                <Nav />
            </NoSsr>
            <ChargeForm />
        </Layout>
    );
}
