import React, {useState, useEffect} from 'react'
import * as style from "./radio.module.css";

const RadioRendererTime = () => {
    const [time, setTime] = useState(5000);
    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
  return <div className={style.time}>{new Date(time * 1000).toISOString().substr(11, 8)}</div>;
}

export default RadioRendererTime