import { useEffect } from "react";
import { navigate } from "@reach/router";

const Home = () => {
    useEffect(() => {
        navigate("/about");
    }, []);
    return null;
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
