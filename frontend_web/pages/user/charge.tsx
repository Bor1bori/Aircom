import React from "react";
import ChargeForm from "../../components/userPage/ChargeForm";
import Layout from "../../components/layout/Layout";
import Nav from "../../components/nav/NavUser";

export default function ChargeService() {
    return (
        <Layout>
            <Nav/>
            <ChargeForm />
        </Layout>
    );
}
