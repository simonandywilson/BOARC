import React, { useState, useEffect } from "react";
import { Card } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import { withDocument } from "part:@sanity/form-builder";
import * as style from "./RenderHeading.css";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

export const RenderHeading = React.forwardRef((props, ref) => {
    const { type, markers, presence, compareValue, parent } = props;
    
    const target = parent.border ? parent.border._ref : undefined;
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
    }, [parent.border]);

    return (
        <div>
            {parent.heading || parent.border ? (
                <FormField
                    description={type.description}
                    title={type.title}
                    __unstable_markers={markers}
                    __unstable_presence={presence}
                    compareValue={compareValue}
                >
                    <Card padding={[2, 2, 2, 2]} shadow={1} ref={ref}>
                        <div className={style.container}>
                            <div
                                className={style.border}
                                style={{
                                    color: parent.colour?.value ? parent.colour.value : "#000000",
                                }}
                            >
                                {borderTop}
                            </div>
                            <span
                                className={style.heading}
                                style={{
                                    color: parent.colour?.value ? parent.colour.value : "#000000",
                                }}
                            >
                                {parent.heading}
                            </span>
                            <div
                                className={style.border}
                                style={{
                                    color: parent.colour?.value ? parent.colour.value : "#000000",
                                }}
                            >
                                {borderBottom}
                            </div>
                        </div>
                    </Card>
                </FormField>
            ) : (
                <div></div>
            )}
        </div>
    );
});

export default withDocument(RenderHeading);
