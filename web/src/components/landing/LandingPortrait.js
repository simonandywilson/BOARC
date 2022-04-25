import React from "react";
import * as style from "./landingPortrait.module.css";
import { Link } from "gatsby";
import { nanoid } from "nanoid";

const LandingPortrait = ({ pages, rows, delta }) => {
  console.log(pages.length);
    const columns = 30;
    return (
        <div className={style.landing}>
            <div className={style.container}>
                <div
                    className={style.landingTextGrid}
                    style={{
                        gridTemplateColumns: "repeat(1, 1fr)",
                        gridTemplateRows: `repeat(${pages.length * delta}, auto)`,
                    }}
                >
                    {pages.map((page, index) => {
                        const title = page.landingTitle ? [...page.landingTitle] : [...page.title];
                        const titlePosition = 1;
                        const description = page.landingDescription
                            ? [...page.landingDescription]
                            : [..."No description"];
                        const descriptionPosition = 1;
                        return (
                            <div
                                key={page._id + index}
                                className={style.landingTextRow}
                                style={{
                                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                    gridTemplateRows: `repeat(${4 * delta}, 1fr)`,
                                }}
                            >
                                <div
                                    className={style.landingTextTitle}
                                    style={{
                                        gridColumn: `${titlePosition} / span ${columns}`,
                                        gridTemplateColumns: `repeat(${title.length}, max-content)`,
                                    }}
                                >
                                    <Link to={`/${page.slug.current}`}>
                                        {title.map((text) => (
                                            <span key={nanoid()}>{text}</span>
                                        ))}
                                    </Link>
                                </div>
                                <div
                                    className={style.landingTextDescription}
                                    style={{
                                        gridColumn: `${descriptionPosition} / span ${columns}`,
                                        gridTemplateColumns: `repeat(${
                                            columns + 1 - descriptionPosition
                                        }, 1fr)`,
                                    }}
                                >
                                    {description.map((text) => (
                                        <span key={nanoid()}>{text}</span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div
                    className={style.landingDots}
                    style={{
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gridTemplateRows: `repeat(${rows * delta}, auto)`,
                    }}
                >
                    {[...Array(columns * (rows * delta))].map(() => (
                        <span key={nanoid()}>.</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingPortrait;
