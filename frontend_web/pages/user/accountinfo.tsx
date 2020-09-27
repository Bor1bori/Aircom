import React from "react";
import AccountInfoForm from "../../components/userPage/AccountInfoForm";
import Layout from "../../components/layout/Layout";
import Nav from "../../components/nav/NavUser";
import NoSsr from "../../components/NoSSR";

export default function EditAccountInfo() {
    return (
        <Layout>
            <NoSsr>
                <Nav />
                <AccountInfoForm />
            </NoSsr>
        </Layout>
    );
}
