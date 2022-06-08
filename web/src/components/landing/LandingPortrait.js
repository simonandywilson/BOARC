import React from "react";
import * as style from "./landingPortrait.module.css";
import { Link } from "gatsby";
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

const columns = 30;

const LandingPortrait = ({ pages }) => {
    return (
        <div className={style.landing}>
            <div className={style.container}>
                {pages.map((page, index) => {
                    const title =
                        page.title.length > columns
                            ? [...getAbbreviation(page.title)]
                            : [...page.title];
                    const titlePosition = Math.max(Math.round(columns / 2 - title.length / 2), 1);
                    const description = page.landingDescription
                        ? [...page.landingDescription]
                        : [..."No description"];
                    const descriptionPosition = Math.max(
                        Math.round(columns / 2 - description.length / 2),
                        1
                    );
                    const dotsTitleEnd = Math.max(columns - (title.length + titlePosition) + 1, 0);
                    const dotsDescriptionEnd =
                        Math.max(columns - (description.length + descriptionPosition) + 1, 0);
                    return (
                        <div key={page._id + index}>
                            <div
                                className={style.row}
                                style={{
                                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                }}
                            >
                                {[...Array(columns)].map(() => (
                                    <span key={nanoid()}>.</span>
                                ))}
                            </div>
                            <div
                                className={style.row}
                                style={{
                                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                }}
                            >
                                {[...Array(titlePosition - 1)].map(() => (
                                    <span key={nanoid()}>.</span>
                                ))}
                                <Link
                                    to={`/${page.slug.current}`}
                                    className={style.link}
                                    style={{
                                        gridColumn: `${titlePosition} / span ${title.length}`,
                                        gridTemplateColumns: `repeat(${title.length}, 1fr)`,
                                    }}
                                >
                                    {title.map((text) => (
                                        <span key={nanoid()}>{text}</span>
                                    ))}
                                </Link>
                                {[...Array(dotsTitleEnd)].map(() => (
                                    <span key={nanoid()}>.</span>
                                ))}
                            </div>
                            <div
                                className={style.row}
                                style={{
                                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                }}
                            >
                                {[...Array(descriptionPosition - 1)].map(() => (
                                    <span key={nanoid()}>.</span>
                                ))}
                                <div
                                    className={style.description}
                                    style={{
                                        gridColumn: `${descriptionPosition} / span ${description.length}`,
                                        gridTemplateColumns: `repeat(${description.length}, 1fr)`,
                                    }}
                                >
                                    {description.map((text) => (
                                        <span key={nanoid()}>{text}</span>
                                    ))}
                                </div>
                                {[...Array(dotsDescriptionEnd)].map(() => (
                                    <span key={nanoid()}>.</span>
                                ))}
                            </div>
                            <div
                                className={style.row}
                                style={{
                                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                }}
                            >
                                {[...Array(columns)].map(() => (
                                    <span key={nanoid()}>.</span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LandingPortrait;
