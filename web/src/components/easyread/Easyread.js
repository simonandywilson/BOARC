import React, { useState, useEffect } from "react";
import * as style from "./easyread.module.css";
import { useEasyReadContext, useEasyReadUpdateContext } from "../../state/GlobalState";

const Easyread = ({ clearSketch, setFaqOpen }) => {
	const [easyReadOpen, setEasyReadOpen] = useState(false);
	const EasyReadContext = useEasyReadContext();
	const EasyReadUpdateContext = useEasyReadUpdateContext();

	useEffect(() => {
		if (EasyReadContext.text) {
			document.documentElement.style.setProperty("--font", "var(--font-easy)");
		}

		if (!EasyReadContext.text) {
			document.documentElement.style.setProperty("--font", "var(--font-regular)");
		}
	}, [EasyReadContext.text]);

	useEffect(() => {
		if (EasyReadContext.image) {
			document.documentElement.style.setProperty("--image-visibility", "hidden");
		}

		if (!EasyReadContext.image) {
			document.documentElement.style.setProperty("--image-visibility", "visible");
		}
	}, [EasyReadContext.image]);

	// useEffect(() => {
	// 	if (EasyReadContext.bw) {
	// 		document.documentElement.style.setProperty("--bw-filter", "grayscale(100%)");
	// 	}

	// 	if (!EasyReadContext.bw) {
	// 		document.documentElement.style.setProperty("--bw-filter", "grayscale(0%)");
	// 	}
	// }, [EasyReadContext.bw]);

	return (
		<div className={style.easyread}>
			<div className={style.box}>
				<Controls
					easyReadOpen={easyReadOpen}
					EasyReadContext={EasyReadContext}
					EasyReadUpdateContext={EasyReadUpdateContext}
				/>
				<button
					onClick={() => setEasyReadOpen((prevState) => !prevState)}
					className={style.accessibilityButton}>
					<p>Accessibility panel</p>
				</button>
				<button
					onClick={() => setFaqOpen((prevState) => !prevState)}
					className={style.faqButton}>
					<p>FAQ</p>
				</button>
			</div>
		</div>
	);
};

export default Easyread;

const Controls = ({ easyReadOpen, EasyReadContext, EasyReadUpdateContext }) => {
	return (
		<div
			className={style.controls}
			style={{ display: easyReadOpen ? "flex" : "none" }}>
			<button
				className={style.button}
				style={{ color: EasyReadContext.text ? "var(--purple)" : "var(--white)", background: EasyReadContext.text ? "var(--white)" : "var(--purple)" }}
				onClick={() =>
					EasyReadUpdateContext((prevState) => ({
						...prevState,
						text: !prevState.text,
					}))
				}>
				<svg
					width="90.65"
					height="48"
					viewBox="0 0 90.65 48"
					fill={"currentColor"}>
					<path d="M43.85,43.17h4.23v3.51h-6.9l-6.26-15.28-10.81,7.02-10.97-7.06-6.14,15.32H0v-3.51H4.39L21.99,0h4.39l17.48,43.17ZM14.68,27.57l9.42,6.06,9.3-6.02L24.02,4.87,14.68,27.57Z" />
					<path d="M90.65,43.01v3.67h-11.45s-.04-2.43-.04-5.63c-4.67,4.07-9.82,6.94-15.44,6.94-8.86,0-13.65-6.62-13.65-15.36,0-11.89,8.62-21.47,20.47-21.67,7.74,0,12.81,4.19,12.81,11.85-.04,2.79,0,14.2,0,20.19h7.3Zm-11.45-20.19c0-5.19-3.55-7.34-8.62-7.34-9.9,0-16,7.54-16,17.16,0,6.82,2.47,10.85,9.26,10.85,6.3,0,10.89-3.23,15.32-7.66,0-4.51,.04-9.5,.04-13.01Z" />
				</svg>
				<span> simple font</span>
			</button>
			<button
				className={style.button}
				onClick={() =>
					EasyReadUpdateContext((prevState) => ({
						...prevState,
						image: !prevState.image,
					}))
				}
				style={{ color: EasyReadContext.image ? "var(--purple)" : "var(--white)", background: EasyReadContext.image ? "var(--white)" : "var(--purple)" }}>
				<svg
					width="72"
					height="48"
					viewBox="0 0 72 48"
					stroke={"currentColor"}>
					<rect
						x="1"
						y="1"
						width="70"
						height="46"
						fill="none"
						strokeMiterlimit="10"
						strokeWidth="1"
						vectorEffect="non-scaling-stroke"
					/>
					<polyline
						points="1 36.77 21.73 13.21 41.94 36.19 54.67 21.73 71 40.29"
						fill="none"
						strokeMiterlimit="10"
						strokeWidth="1"
						vectorEffect="non-scaling-stroke"
					/>
					<circle
						cx="41.32"
						cy="15.77"
						r="7.95"
						fill="none"
						strokeMiterlimit="10"
						strokeWidth="1"
						vectorEffect="non-scaling-stroke"
					/>
				</svg>
				<span> hide images</span>
			</button>
			<button
        className={style.button}
        onClick={() =>
            EasyReadUpdateContext((prevState) => ({
                ...prevState,
                bw: !prevState.bw,
            }))
        }
        style={{ color: EasyReadContext.bw ? "var(--purple)" : "var(--white)", background: EasyReadContext.bw ? "var(--white)" : "var(--purple)" }}>
        
        <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill={"currentColor"}>
            
            <rect
                x="0"
                width="6"
                height="6"
            />
            <rect
                x="6"
                y="6"
                width="6"
                height="6"
            />
            <polygon points="36 18 36 30 30 30 30 24 12 24 12 12 24 12 24 18 36 18" />
            <rect
                x="24"
                y="6"
                width="6"
                height="6"
            />
            <polygon points="12 24 12 36 0 36 0 30 6 30 6 24 12 24" />
        </svg>
        <span> black & white</span>

    </button>
			<button
				className={style.button}
				onClick={() =>
					EasyReadUpdateContext((prevState) => ({
						...prevState,
						traces: !prevState.traces,
					}))
				}
				style={{ color: EasyReadContext.traces ? "var(--purple)" : "var(--white)", background: EasyReadContext.traces ? "var(--white)" : "var(--purple)" }}>
				<svg
					width="36"
					height="36"
					viewBox="0 0 36 36"
					fill={"currentColor"}>
					<rect
						x="0"
						width="6"
						height="6"
					/>
					<rect
						x="6"
						y="6"
						width="6"
						height="6"
					/>
					<polygon points="36 18 36 30 30 30 30 24 12 24 12 12 24 12 24 18 36 18" />
					<rect
						x="24"
						y="6"
						width="6"
						height="6"
					/>
					<polygon points="12 24 12 36 0 36 0 30 6 30 6 24 12 24" />
				</svg>
				<span> hide traces</span>
			</button>
		</div>
	);
};
