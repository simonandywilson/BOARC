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
    return (
        <Link to={initial.slug.current === slug ? "/" : `/${value.reference.slug.current}`} className={style.internal}>
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
