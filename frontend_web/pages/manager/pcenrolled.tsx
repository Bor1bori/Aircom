import React from "react";
import Layout from "../../components/layout/Layout";
import PCEnrollmentForm from "../../components/managerPage/PCEnrollmentForm";
import Nav from "../../components/nav/NavManager";

export default function Manual(){
    return (
        <Layout>
            <Nav/>
            <PCEnrollmentForm/>
        </Layout>
    );
};