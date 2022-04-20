import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import * as style from "./radio.module.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import RadioRendererTime from "./RadioRendererTime";

const RadioRenderer = ({ value }) => {
    const { title, url } = value;
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const playerRef = useRef(null);

    return (
        <div className={style.grid}>
            <div className={style.radio}>
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
                <AudioPlayer
                    autoPlay
                    src={url}
                    onPlay={(e) => console.log("onPlay")}
                    // other props here
                />
                <div className={style.title}>
                    <h3>{title}</h3>
                </div>
                <div className={style.controls}>
                    <button
                        onClick={() => setPlaying((prevPlaying) => !prevPlaying)}
                        className={style.play}
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
                    <div className={style.details}>
                        <div className={style.status}>
                            NOW LIVE <span className={style.spinner}></span>
                        </div>
                        <RadioRendererTime />
                        <input
                            className={style.volume}
                            type="range"
                            id="volume"
                            name="volume"
                            min="0"
                            max="1"
                            defaultValue="1"
                            step="0.01"
                            onChange={(e) => setVolume(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RadioRenderer;
