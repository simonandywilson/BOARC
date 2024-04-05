import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import * as style from "./show.module.css";

import ShowRendererRow from "./ShowRendererRow";

const ShowRenderer = ({ value, width }) => {
    const { number } = value;
    const {
        allSanityShow: { shows },
    } = useStaticQuery(getData);

    const limitedShows = shows;
    limitedShows.length = number;

    return (
        <div className={style.grid}>
            {limitedShows.map((show) => {
                return <ShowRendererRow width={width} show={show} key={show._id} />;
            })}
        </div>
    );
};

export default ShowRenderer;

const getData = graphql`
    {
        allSanityShow {
            shows: nodes {
                _id
                title
                date(formatString: "DD/MM/YYYY")
                audio {
                    asset {
                        url
                    }
                }
                icon {
                    ...Image
                }
                _rawInfo
            }
        }
    }
`;
