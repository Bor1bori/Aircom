import React from "react";
import AccountInfoForm from "../../components/userPage/AccountInfoForm";
import Layout from "../../components/layout/Layout";
import Nav from "../../components/nav/NavUser";

export default function Signin() {
    return (
        <Layout>
            <Nav/>
            <AccountInfoForm />
        </Layout>
    );
}
