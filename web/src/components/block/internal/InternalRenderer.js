import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import * as style from "./internal.module.css";

const InternalRenderer = ({ text, value }) => {
    const {
        homepage: { initial },
    } = useStaticQuery(getData);
    const slug = value?.reference?.slug?.current
    const place = value?.place ? value.place : "";
    return slug ? (
        <Link
            to={initial.slug.current === slug ? `/#${place}` : `/${slug}#${place}`}
            className={style.internal}
        >
            {text}
        </Link>
    ) : (
        <span>{text}</span>
    );
};

export default InternalRenderer;

const getData = graphql`
    {
        homepage: sanityHomepage {
            initial {
                ... on SanityLanding {
                    id
                    slug {
                        current
                    }
                }
                ... on SanityPage {
                    id
                    slug {
                        current
                    }
                }
            }
        }
    }
`;
