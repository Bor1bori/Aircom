import React from "react";
import Layout from "../../components/layout/Layout";
import BankAccountForm from "../../components/managerPage/BankAccountForm";
import Nav from "../../components/nav/NavManager";

export default function Manual(){
    return (
        <Layout>
            <Nav/>
            <BankAccountForm/>
        </Layout>
    );
};