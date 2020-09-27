import React from "react";
import Layout from "../../components/layout/Layout";
import PCEnrollmentForm from "../../components/managerPage/PCEnrollmentForm";
import Nav from "../../components/nav/NavManager";
import NoSsr from "../../components/NoSSR";

export default function EnrollPc() {
    return (
        <Layout>
            <NoSsr>
                <Nav />
            </NoSsr>
            <PCEnrollmentForm />
        </Layout>
    );
};