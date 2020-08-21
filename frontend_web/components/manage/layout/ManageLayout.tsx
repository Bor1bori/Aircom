import React from "react";
import ManageHeader from "../header/ManageHeader";

const layoutStyle = {
    margin:20,
    padding: 20,
    border: "1px solid #DDD"
};

const ManageLayout = (props: any) => (
    <div style = {layoutStyle}>
        <ManageHeader/>
        {props.children}
    </div>
);

export default ManageLayout;
