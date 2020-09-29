import React from "react";
import Header from "../header/Header";

const Layout = (props: any) => (
    <div>
        <Header />
        <div className="children">{props.children}</div>
        <style jsx>{`
            .children{
                display: flex;
            }
        `}
        </style>
    </div>
);

export default Layout;
