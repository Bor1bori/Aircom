import React from "react";
import Layout from "../../components/layout/Layout";
import ProfitForm from "../../components/managerPage/ProfitForm";
import Nav from "../../components/nav/NavManager";

export default function Manual(){
    return (
        <Layout>
            <Nav/>
            <ProfitForm/>
        </Layout>
    );
};