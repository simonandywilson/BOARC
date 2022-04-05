import React from "react";
import { Card, Grid } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import { withDocument } from "part:@sanity/form-builder";
import * as style from "./RenderLanding.css";
import { nanoid } from "nanoid";

export const RenderSingleLanding = React.forwardRef((props, ref) => {
    const { type, markers, presence, compareValue, parent, document } = props;

    const title = document.landingTitle ? [...document.landingTitle] : [...document.title];
    const titlePosition = document.landingTitlePosition ? document.landingTitlePosition : 1;
    const description = document.landingDescription
        ? [...document.landingDescription]
        : [..."No description"];
    const descriptionPosition = document.landingDescriptionPosition
        ? document.landingDescriptionPosition
        : 1;


    const rows = 4;

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
                    rows={[1, 1, 1, 1]}
                    className={style.text}
                >
                    <Grid columns={[45, 45, 45, 45]} rows={[rows, rows, rows, rows]}>
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
                                <span className={style.title} key={nanoid()}>
                                    {t}
                                </span>
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
                                <span className={style.description} key={nanoid()}>
                                    {t}
                                </span>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    columns={[45, 45, 45, 45]}
                    rows={[rows, rows, rows, rows]}
                    className={style.dots}
                >
                    {[...Array(45 * rows)].map(() => (
                        <span key={nanoid()}>.</span>
                    ))}
                </Grid>
            </Card>
        </FormField>
    );
});

export default withDocument(RenderSingleLanding);
