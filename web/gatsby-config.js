require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// developMiddleware: (app) => {
//     app.use(
//         "/.netlify/functions/",
//         proxy({
//             target: "http://localhost:8888", // <--- Port that `netlify-lambda` is using
//             pathRewrite: {
//                 "/.netlify/functions/": "",
//             },
//         })
//     );
// };

module.exports = {
    siteMetadata: {
        siteUrl: `https://www.bidstonobservatory.org`,
    },
    plugins: [
        {
            resolve: "gatsby-source-sanity",
            options: {
                projectId: process.env.GATSBY_SANITY_PROJECT_ID,
                dataset: "production",
            },
        },
        {
            resolve: "gatsby-plugin-sanity-image",
            options: {
                projectId: process.env.GATSBY_SANITY_PROJECT_ID,
                dataset: "production",
            },
        },
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/favicon.svg",
            },
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-layout`,
            options: {
                component: require.resolve(`./src/layout/Layout.js`),
            },
        },
        `gatsby-plugin-smoothscroll`,
    ],
};

