import React, { useState } from "react";
import * as style from "./layout.module.css";
import GlobalState from "../state/GlobalState";
import Fetch from "../components/fetch/Fetch";
import Ascii from "../components/ascii/Ascii";
import Nav from "../components/nav/Nav";
import NavPortrait from "../components/nav/NavPortrait";
import Easyread from "../components/easyread/Easyread";
import Faq from "../components/faq/Faq";
import Sketch from "../components/sketch/Sketch";
import Newsletter from "../components/newsletter/Newsletter";
import Popup from "../components/popup/Popup";

const Layout = ({ children }) => {
	const [asciiWidth, setAsciiWidth] = useState(555);
	const [sketchKey, setSketchKey] = useState(0);
	const [navPortrait, setNavPortrait] = useState(false);
	const [faqOpen, setFaqOpen] = useState(false);

	const clearSketch = () => setSketchKey((prevState) => prevState + 1);
	return (
		<GlobalState>
			<main className={style.main}>
				<Easyread
					clearSketch={clearSketch}
					faqOpen={faqOpen}
					setFaqOpen={setFaqOpen}
				/>
				<Fetch />
				<Sketch />
				<Ascii asciiWidth={asciiWidth} />
				<NavPortrait
					navPortrait={navPortrait}
					setNavPortrait={setNavPortrait}
				/>
				<Nav
					setAsciiWidth={setAsciiWidth}
					setNavPortrait={setNavPortrait}
				/>
				{children}
				<Faq
					faqOpen={faqOpen}
					setFaqOpen={setFaqOpen}
				/>
				<Popup />
				<Newsletter />
			</main>
		</GlobalState>
	);
};

export default Layout;
