import React, { useState } from "react";
import * as style from "./layout.module.css";
import GlobalState from "../state/GlobalState";
import Fetch from "../components/fetch/Fetch";
import Ascii from "../components/ascii/Ascii";
import Nav from "../components/nav/Nav";
import NavPortrait from "../components/navPortrait/NavPortrait";
import Faq from "../components/faq/Faq";
import Sketch from "../components/sketch/Sketch";
import Newsletter from "../components/newsletter/Newsletter";

const Layout = ({ children }) => {
    const [asciiWidth, setAsciiWidth] = useState(555);
    const [sketchKey, setSketchKey] = useState(0);
    const [navPortrait, setNavPortrait] = useState(false);
    const clearSketch = () => setSketchKey((prevState) => prevState + 1);
    console.log(navPortrait);
    return (
        <GlobalState>
            <main className={style.main}>
                <Fetch />
                <Sketch key={sketchKey} />
                <Ascii asciiWidth={asciiWidth} />
                <NavPortrait navPortrait={navPortrait} setNavPortrait={setNavPortrait} />
                <Nav setAsciiWidth={setAsciiWidth} setNavPortrait={setNavPortrait} />
                {children}
                <Faq clearSketch={clearSketch} />
                <Newsletter />
            </main>
        </GlobalState>
    );
};

export default Layout;
