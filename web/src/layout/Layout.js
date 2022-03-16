import React from "react";
import * as style from "./layout.module.css";
import GlobalState from "../state/GlobalState";
import Fetch from "../components/fetch/Fetch"
import Ascii from "../components/ascii/Ascii";
import Nav from "../components/nav/Nav";
import Faq from "../components/faq/Faq";
import Sketch from "../components/sketch/Sketch";


const Layout = ({ children }) => {
    

    return (
        <GlobalState>
            <main>
                <Fetch />
                <Sketch />
                <Ascii />
                <Nav />
                {children}
                <Faq />
            </main>
        </GlobalState>
    );
};

export default Layout;
