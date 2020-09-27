import React from "react";
import AccountInfoForm from "../../components/managerPage/AccountInfoForm";
import Layout from "../../components/layout/Layout";
import Nav from "../../components/nav/NavManager";
import NoSsr from "../../components/NoSSR";

export default function EditAccountInfo() {
    return (
        <Layout>
            <NoSsr>
                <Nav />
            </NoSsr>
            <AccountInfoForm />
        </Layout>
    );
}
