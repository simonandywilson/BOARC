import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import * as style from "./radio.module.css";
import { useResizeDetector } from "react-resize-detector";

const RadioRenderer = ({ value }) => {
    const { title, url } = value;
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const playerRef = useRef(null);
    // const playable = ReactPlayer.canPlay(url);
    const playable = true;
    const { height, ref } = useResizeDetector();

    useEffect(
        () => document.documentElement.style.setProperty("--radio-height", `-${height}px`),
        [height]
    );

    return (
        <div className={style.grid}>
            <div className={style.radio} ref={ref}>
                <ReactPlayer
                    className={style.player}
                    url={url}
                    controls={false}
                    height={0}
                    width={0}
                    playing={playing ? true : false}
                    volume={volume}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    ref={playerRef}
                />
                <div className={style.title}>{title}</div>
                {/* {playable ? (
                    <div className={style.status}>
                        NOW LIVE <span className={style.spinner}></span>
                    </div>
                ) : (
                    <div className={style.status}>
                        OFFLINE
                    </div>
                )} */}
                <div className={style.controls}>
                    <button
                        onClick={() => setPlaying((prevPlaying) => !prevPlaying)}
                        className={style.play}
                        aria-label="Play/pause radio"
                        // disabled={playable ? false : true}
                    >
                        {playing ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                            >
                                <rect x="2.68" width="15" height="40" />
                                <rect x="22.32" width="15" height="40" />
                            </svg>
                        ) : (
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
