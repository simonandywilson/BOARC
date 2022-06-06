import React from "react";
import { Card, Grid } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import { withDocument } from "part:@sanity/form-builder";
import * as style from "./RenderLanding.css";
import { nanoid } from "nanoid";

const getAbbreviation = (text) => {
    if (typeof text != "string" || !text) {
        return "";
    }
    const acronym = text
        .match(/[\p{Alpha}\p{Nd}]+/gu)
        .reduce(
            (previous, next) =>
                previous + (+next === 0 || parseInt(next) ? parseInt(next) : next[0] || ""),
            ""
        )
        .toUpperCase();
    return acronym;
};

const columns = 45;
const rows = 4;

export const RenderSingleLanding = React.forwardRef((props, ref) => {
    const { type, document } = props;
    const titlePosition = document.landingTitlePosition
        ? Math.max(document.landingTitlePosition, 1)
        : 1;
    const title =
        document.title.length + titlePosition - 2 >= columns
            ? [...getAbbreviation(document.title)]
            : [...document.title];
    const titleDots = columns - (title.length + titlePosition) + 1;
    const description = document.landingDescription
        ? [...document.landingDescription]
        : [..."No description"];
    const descriptionPosition = document.landingDescriptionPosition
        ? Math.max(document.landingDescriptionPosition, 1)
        : 1;
    const descriptionDots = columns - (description.length + descriptionPosition) + 1;
    return (
        <FormField description={type.description} title={type.title}>
            <Card padding={[2, 2, 2, 2]} shadow={1} ref={ref}>
                <Grid
                    padding={[2, 2, 2, 2]}
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
                        {[...Array(descriptionDots < 0 ? 0 : descriptionDots)].map(() => (
                            <span key={nanoid()}>.</span>
                        ))}
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
            </Card>
        </FormField>
    );
});

export default withDocument(RenderSingleLanding);
