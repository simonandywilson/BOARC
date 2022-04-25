import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { useActiveUpdateContext, useAsciiUpdateContext } from "../state/GlobalState";
import Seo from "../components/seo/Seo";
import LandingLandscape from "../components/landing/LandingLandscape";
import LandingPortrait from "../components/landing/LandingPortrait";

const Landing = ({ data: { sanityLanding } }) => {
    const { pages, slug } = sanityLanding;
    const rows = pages.length * 4;
    const ActiveUpdateContext = useActiveUpdateContext();
    const AsciiUpdateContext = useAsciiUpdateContext();

    useEffect(() => {
        ActiveUpdateContext(slug.current);
        AsciiUpdateContext(false);
    }, []);
    return (
        <>
            <Seo title={sanityLanding.title} />
            <LandingLandscape pages={pages} rows={rows} delta={1} />
            <LandingPortrait pages={pages} rows={rows} delta={1} />
        </>
    );
};

export default Landing;

export const query = graphql`
    query getSingleLanding($slug: String) {
        sanityLanding(slug: { current: { eq: $slug } }) {
            title
            slug {
                current
            }
            pages {
                ... on SanityPage {
                    _id
                    landingTitle
                    landingTitlePosition
                    landingDescription
                    landingDescriptionPosition
                    slug {
                        current
                    }
                }
            }
        }
    }
`;
