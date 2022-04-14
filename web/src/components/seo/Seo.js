import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

const Seo = (props) => {
    const {
        site: {
            siteMetadata: { siteUrl },
        },
        sanitySeo: { defaultTitle, defaultAcronym, defaultDescription, defaultImage },
    } = useStaticQuery(getData);
    const { pathname } = useLocation();

    const seo = {
        title: props.title || null,
        description: props.description || defaultDescription,
        image: props.image || defaultImage.asset.url,
        url: `${siteUrl}${pathname}`,
    };

    return (
        <Helmet
            title={seo.title}
            titleTemplate={seo.title ? `${defaultAcronym} | %s` : defaultTitle}
            defaultTitle={defaultTitle}
        >
            <html lang="en" />
            <meta name="theme-color" content="#ffffff" />
            {seo.title && <meta name="title" content={defaultTitle} />}
            {seo.description && <meta name="description" content={seo.description} />}

            <meta property="og:type" content="website" />
            {seo.url && <meta property="og:url" content={seo.url} />}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && <meta property="og:description" content={seo.description} />}
            {seo.image && <meta property="og:image" content={seo.image} />}

            <meta property="twitter:card" content="summary_large_image" />
            {seo.url && <meta property="twitter:url" content={seo.url} />}
            {seo.title && <meta property="twitter:title" content={seo.title} />}
            {seo.description && <meta property="twitter:description" content={seo.description} />}
            {seo.image && <meta property="twitter:image" content={seo.image} />}
        </Helmet>
    );
};

export default Seo;

const getData = graphql`
    {
        site {
            siteMetadata {
                siteUrl
            }
        }
        sanitySeo {
            defaultTitle: seoTitle
            defaultAcronym: seoAcronym
            defaultDescription: seoDescription
            defaultImage: seoImage {
                asset {
                    url
                }
            }
        }
    }
`;
