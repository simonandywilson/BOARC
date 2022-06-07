import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import * as style from "./internal.module.css";

const InternalRenderer = ({ text, value }) => {
    const {
        homepage: {
            initial,
        },
    } = useStaticQuery(getData);
    const slug = value.reference.slug.current;
    const place = value?.place ? value.place : ""
    return (
        <Link to={initial.slug.current === slug ? `/#${place}` : `/${value.reference.slug.current}#${place}`} className={style.internal}>
            {text}
        </Link>
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
