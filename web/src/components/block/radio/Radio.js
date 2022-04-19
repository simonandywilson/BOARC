import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import * as style from "./radio.module.css";

const Radio = () => {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const playerRef = useRef(null);

    const [time, setTime] = useState(5000);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={style.grid}>
            <div className={style.radio}>
                <ReactPlayer
                    className={style.player}
                    url="http://us3.internet-radio.com:8485/stream"
                    controls={false}
                    height={0}
                    width={0}
                    playing={playing ? true : false}
                    volume={volume}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    ref={playerRef}
                />
                <div className={style.title}>
                    <h3>Domes FM Player</h3>
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
                        <div className={style.time}>
                            {new Date(time * 1000).toISOString().substr(11, 8)}
                        </div>
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

export default Radio;
