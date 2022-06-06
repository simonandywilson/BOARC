import React, { useState, useEffect } from "react";
import { Card, Grid, Text } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import { withDocument } from "part:@sanity/form-builder";
import * as style from "./RenderLanding.css";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });
import { nanoid } from "nanoid";

const columns = 45;
const rows = 4;

export const RenderLanding = React.forwardRef((props, ref) => {
    const { type, parent, document } = props;

    const targets = document.pages
        ? document.pages.map((target) => {
              if (target._ref) {
                  return `*[_id == '${target._ref}'][0]`;
              }
          })
        : [];

    const [data, setData] = useState([]);

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
        <FormField description={type.description} title={type.title}>
            <Card padding={[2, 2, 2, 2]} shadow={1} ref={ref}>
                <Grid
                    padding={[2, 2, 2, 2]}
                    columns={[1, 1, 1, 1]}
                    rows={[data.length, data.length, data.length, data.length]}
                    className={style.grid}
                >
                    {data &&
                        data.map((page) => {
                            const title = [...page.title];
                            const titlePosition = page.landingTitlePosition
                                ? page.landingTitlePosition
                                : 1;
                            const titleDots = columns - (title.length + titlePosition) + 1;
                            const description = page.landingDescription
                                ? [...page.landingDescription]
                                : [..."No description"];
                            const descriptionPosition = page.landingDescriptionPosition
                                ? page.landingDescriptionPosition
                                : 1;
                            const descriptionDots =
                                columns - (description.length + descriptionPosition) + 1;

                            return (
                                <Grid
                                    columns={[1, 1, 1, 1]}
                                    rows={[rows, rows, rows, rows]}
                                    className={style.grid}
                                >
                                    <Grid
                                        columns={[columns, columns, columns, columns]}
                                        rows={[1, 1, 1, 1]}
                                        className={style.row}
                                    >
                                        {[...Array(columns)].map(() => (
                                            <span key={nanoid()}>.</span>
                                        ))}
                                    </Grid>
                                    <Grid
                                        columns={[columns, columns, columns, columns]}
                                        rows={[1, 1, 1, 1]}
                                        className={style.row}
                                    >
                                        {[...Array(titlePosition - 1)].map(() => (
                                            <span key={nanoid()}>.</span>
                                        ))}
                                        {title.map((letter) => (
                                            <span key={nanoid()} className={style.title}>
                                                {letter}
                                            </span>
                                        ))}
                                        {[...Array(titleDots < 0 ? 0 : titleDots)].map(() => (
                                            <span key={nanoid()}>.</span>
                                        ))}
                                    </Grid>
                                    <Grid
                                        columns={[columns, columns, columns, columns]}
                                        rows={[1, 1, 1, 1]}
                                        className={style.row}
                                    >
                                        {[...Array(descriptionPosition - 1)].map(() => (
                                            <span key={nanoid()}>.</span>
                                        ))}
                                        {description.map((letter) => (
                                            <span key={nanoid()} className={style.description}>
                                                {letter}
                                            </span>
                                        ))}
                                        {[...Array(descriptionDots < 0 ? 0 : descriptionDots)].map(
                                            () => (
                                                <span key={nanoid()}>.</span>
                                            )
                                        )}
                                    </Grid>
                                    <Grid
                                        columns={[columns, columns, columns, columns]}
                                        rows={[1, 1, 1, 1]}
                                        className={style.row}
                                    >
                                        {[...Array(columns)].map(() => (
                                            <span key={nanoid()}>.</span>
                                        ))}
                                    </Grid>
                                </Grid>
                            );
                        })}
                </Grid>
            </Card>
        </FormField>
    );
});

export default withDocument(RenderLanding);
