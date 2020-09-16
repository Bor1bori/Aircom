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
        <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          font-size: 10px;
        }
      `}</style>
    </div>
);

export default Layout;
