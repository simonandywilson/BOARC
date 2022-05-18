import React, { useState } from "react";
import * as style from "./layout.module.css";
import GlobalState from "../state/GlobalState";
import Fetch from "../components/fetch/Fetch";
import Ascii from "../components/ascii/Ascii";
import Nav from "../components/nav/Nav";
import Faq from "../components/faq/Faq";
import Sketch from "../components/sketch/Sketch";
import Newsletter from "../components/newsletter/Newsletter";

const Layout = ({ children }) => {
    const [asciiWidth, setAsciiWidth] = useState(555);
    const [sketchKey, setSketchKey] = useState(0);
    const clearSketch = () => setSketchKey((prevState) => prevState + 1);
    return (
        <GlobalState>
            <main className={style.main}>
                <Fetch />
                <Sketch key={sketchKey} />
                <Ascii asciiWidth={asciiWidth} />
                <Nav setAsciiWidth={setAsciiWidth} />
                {children}
                <Faq clearSketch={clearSketch} />
                <Newsletter />
            </main>
        </GlobalState>
    );
};

export default Layout;
