import React from "react";
import Layout from "../../components/layout/Layout";
import ManualForm from "../../components/managerPage/ManualForm";
import Nav from "../../components/nav/NavManager";
import NoSsr from "../../components/NoSSR";

export default function ShowManual() {
    return (
        <Layout>
            <NoSsr>
                <Nav />
            </NoSsr>
            <ManualForm />
        </Layout>
    );
};