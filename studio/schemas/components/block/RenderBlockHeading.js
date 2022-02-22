import React, { useState, useEffect } from "react";
import * as style from "./RenderBlockHeading.css";

import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

const RenderBlockHeading = ({ value }) => {
    const { heading, border } = value;
    

    const target = border ? border._ref : undefined;
    
    const [data, setData] = useState({});
    const borderTop = Object.keys(data).length != 0 ? data.borderTop.repeat(60) : "";
    const borderBottom = Object.keys(data).length != 0 ? data.borderBottom.repeat(60) : "";

    useEffect(() => {
        let toFetch = true;

        if (target !== undefined) {
            const fetchData = async () => {
                const data = await client.fetch(`*[_id == $targetId][0]`, {
                    targetId: target,
                });

                if (toFetch) {
                    setData(data);
                }
            };

            fetchData().catch(console.error);
        } else {
            setData({});
        }

        return () => (toFetch = false);
    }, [border]);

    return (
        <div className={style.container}>
            <div className={style.border}>{borderTop}</div>
            <span className={style.heading}>{heading}</span>
            <div className={style.border}>{borderBottom}</div>
        </div>
    );
};

export default RenderBlockHeading;
