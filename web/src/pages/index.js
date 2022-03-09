import React from "react";
import * as style from "../styles/index.module.css";
import { graphql } from "gatsby";

const Home = ({ data }) => {

    return (
        <div>
            
        </div>
    );
};

export default Home;

// export const query = graphql`
//     query {
//         menu: allSanityMenu(sort: { fields: [orderRank], order: ASC }) {
//             nodes {
//                 pages {
//                     _rawContent(resolveReferences: { maxDepth: 5 })
//                 }
//             }
//         }
//     }
// `;