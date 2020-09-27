import React from "react";
import AccountInfoForm from "../../components/managerPage/AccountInfoForm";
import Layout from "../../components/layout/Layout";
import Nav from "../../components/nav/NavManager";

export default function EditAccountInfo() {
    return (
        <Layout>
            <Nav/>
            <AccountInfoForm />
        </Layout>
    );
}
