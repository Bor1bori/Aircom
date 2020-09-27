import React from "react";
import Layout from "../../components/layout/Layout";
import BankAccountForm from "../../components/managerPage/BankAccountForm";
import Nav from "../../components/nav/NavManager";
import NoSsr from "../../components/NoSSR";

export default function ManageBankAccount() {
    return (
        <Layout>
            <NoSsr>
                <Nav />
            </NoSsr>
            <BankAccountForm />
        </Layout>
    );
};