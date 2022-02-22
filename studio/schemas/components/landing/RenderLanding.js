import React, { useState, useEffect } from "react";
import { Card, Grid, Text } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import { withDocument } from "part:@sanity/form-builder";
import * as style from "./RenderLanding.css";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

export const RenderLanding = React.forwardRef((props, ref) => {
    const { type, markers, presence, compareValue, parent, document } = props;

    const targets = document.pages.map((target) => {
        if (target._ref) {
            return `*[_id == '${target._ref}'][0]`;
        }
    });

    const [data, setData] = useState([]);

    const rows = data.length * 4;

    useEffect(() => {
        let toFetch = true;

        if (targets !== undefined) {
            const fetchData = async () => {
                const data = await client.fetch(`[${targets.join(" ,")}]`);

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
        <FormField
            description={type.description}
            title={type.title}
            __unstable_markers={markers}
            __unstable_presence={presence}
            compareValue={compareValue}
        >
            <Card padding={[2, 2, 2, 2]} shadow={1} ref={ref}>
                <Grid
                    padding={[2, 2, 2, 2]}
                    columns={[1, 1, 1, 1]}
                    rows={[
                        rows / data.length - 1,
                        rows / data.length - 1,
                        rows / data.length - 1,
                        rows / data.length - 1,
                    ]}
                    className={style.text}
                >
                    {data &&
                        data.map((page) => {
                            const title = page.landingTitle
                                ? [...page.landingTitle]
                                : [...page.title];
                            const titlePosition = page.landingTitlePosition
                                ? page.landingTitlePosition
                                : 1;
                            const description = page.description
                                ? [...page.description]
                                : [..."No description"];
                            const descriptionPosition = page.landingDescriptionPosition
                                ? page.landingDescriptionPosition
                                : 1;
                            
                            return (
                                <Grid
                                    key={page._id}
                                    columns={[45, 45, 45, 45]}
                                    rows={[
                                        rows / data.length,
                                        rows / data.length,
                                        rows / data.length,
                                        rows / data.length,
                                    ]}
                                >
                                    <Grid
                                        style={{
                                            gridRow: "2 / span 1",
                                            gridColumn: `${titlePosition} / span 45`,
                                        }}
                                        columns={[
                                            46 - titlePosition,
                                            46 - titlePosition,
                                            46 - titlePosition,
                                            46 - titlePosition,
                                        ]}
                                        rows={[1, 1, 1, 1]}
                                    >
                                        {title.map((t) => (
                                            <span className={style.title}>{t}</span>
                                        ))}
                                    </Grid>
                                    <Grid
                                        style={{
                                            gridRow: "3 / span 1",
                                            gridColumn: `${descriptionPosition} / span 45`,
                                        }}
                                        columns={[
                                            46 - descriptionPosition,
                                            46 - descriptionPosition,
                                            46 - descriptionPosition,
                                            46 - descriptionPosition,
                                        ]}
                                        rows={[1, 1, 1, 1]}
                                    >
                                        {description.map((t) => (
                                            <span className={style.description}>{t}</span>
                                        ))}
                                    </Grid>
                                </Grid>
                            );
                        })}
                </Grid>
                <Grid
                    columns={[45, 45, 45, 45]}
                    rows={[rows, rows, rows, rows]}
                    className={style.dots}
                >
                    {[...Array(45 * rows)].map((e, i) => (
                        <span key={i}>.</span>
                    ))}
                </Grid>
            </Card>
        </FormField>
    );
});

export default withDocument(RenderLanding);
