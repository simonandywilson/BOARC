import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo/Seo";

const index = ({ data }) => {
    const { sanitySeo } = data;
    return (
        <Seo
            description={sanitySeo.seoDescription}
            image={sanitySeo.seoImage.asset.url}
        />
    );
};

export default index;

export const query = graphql`
    {
        sanitySeo {
            seoTitle
            seoDescription
            seoImage {
                asset {
                    url
                }
            }
        }
    }
`;
