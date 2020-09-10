import React from "react";
import LeftTimeForm from "../../components/userPage/LeftTimeForm";
import Layout from "../../components/layout/Layout";
import Nav from "../../components/nav/NavUser";

export default function Signin() {
    return (
        <Layout>
            <Nav/>
            <LeftTimeForm />
        </Layout>
    );
}
