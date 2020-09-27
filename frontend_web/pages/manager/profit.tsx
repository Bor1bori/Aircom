import React from "react";
import Layout from "../../components/layout/Layout";
import ProfitForm from "../../components/managerPage/ProfitForm";
import Nav from "../../components/nav/NavManager";

export default function AnalyzeProfit(){
    return (
        <Layout>
            <Nav/>
            <ProfitForm/>
        </Layout>
    );
};