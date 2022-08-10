import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import * as style from "./radio.module.css";
import { useResizeDetector } from "react-resize-detector";

const RadioRenderer = ({ value }) => {
	const { title, url } = value;
	const [playing, setPlaying] = useState(false);
	const [status, setStatus] = useState("paused");
	const [volume, setVolume] = useState(1);
	const [metadata, setMetadata] = useState({});
	const playerRef = useRef(null);
	const { height, ref } = useResizeDetector();

	const handleStatus = () => {
		if (status === "playing") {
			setStatus("paused");
		}
		if (status === "paused") {
			setStatus("playing");
		}
	};

	useEffect(
		() => document.documentElement.style.setProperty("--radio-height", `-${height}px`),
		[height]
	);

	useEffect(() => {
		fetch(url.replace("stream", "status-json.xsl"))
			.then((response) => response.text())
			.then((data) => {
				setMetadata(JSON.parse(data));
			})
			.catch(console.error);
	}, []);

	return (
		<div className={style.grid}>
			<div className={style.radio} ref={ref}>
				<ReactPlayer
					className={style.player}
					url={url}
					controls={false}
					height={0}
					width={0}
					playing={status === "playing" || status === "buffering" ? true : false}
					volume={Number(volume)}
					ref={playerRef}
					playsinline={true}
					onBuffer={() => setStatus("buffering")}
					onBufferEnd={() => setStatus("playing")}
					onPause={() => setStatus("paused")}
					onPlay={() => setStatus("playing")}
				/>
				<div className={style.title}>{title}</div>
				{metadata?.icestats?.server_start ? (
					<div className={style.status}>
						NOW LIVE <span className={style.spinner}></span>
					</div>
				) : (
					<div className={style.offline}>OFFLINE</div>
				)}
				<div className={style.controls}>
					<button
						onClick={handleStatus}
						className={style.play}
						aria-label="Play/pause radio"
						// disabled={playable ? false : true}
					>
						{status === "playing" && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								viewBox="0 0 40 40"
							>
								<rect x="2.68" width="15" height="40" />
								<rect x="22.32" width="15" height="40" />
							</svg>
						)}
						{status === "buffering" && <span className={style.buffer}></span>}
						{status === "paused" && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								viewBox="0 0 40 40"
							>
								<polygon points="37.32 20 2.68 0 2.68 40 37.32 20" />
							</svg>
						)}
					</button>
					<div className={style.volume}>
						<input
							type="range"
							id="volume"
							name="volume"
							min="0"
							max="1"
							defaultValue="1"
							step="0.01"
							onChange={(e) => setVolume(e.target.value)}
							aria-label="Change radio volume"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RadioRenderer;
