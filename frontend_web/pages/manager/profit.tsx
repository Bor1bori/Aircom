import React from "react";
import Layout from "../../components/layout/Layout";
import ProfitForm from "../../components/managerPage/ProfitForm";
import Nav from "../../components/nav/NavManager";
import NoSsr from "../../components/NoSSR";

export default function AnalyzeProfit() {
    return (
        <Layout>
            <NoSsr>
                <Nav />
            </NoSsr>
            <ProfitForm />
        </Layout>
    );
};