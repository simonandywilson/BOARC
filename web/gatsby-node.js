const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
    const { createRedirect, createPage } = actions;

    const homepageQuery = await graphql(`
        query getQuery {
            homepage: sanityHomepage {
                initial {
                    ... on SanityPage {
                        id
                        slug {
                            current
                        }
                    }
                    ... on SanityLanding {
                        id
                        slug {
                            current
                        }
                    }
                }
            }
        }
    `);

    // createRedirect({
    //     fromPath: "/",
    //     exactPath: true,
    //     isPermanent: false,
    //     redirectInBrowser: true,
    //     toPath: `/${homepageQuery.data.homepage.initial.slug.current}`,
    // });

    const landingQuery = await graphql(`
        query getQuery {
            landing: allSanityLanding {
                nodes {
                    slug {
                        current
                    }
                }
            }
        }
    `);

    const pageQuery = await graphql(`
        query getQuery {
            page: allSanityPage {
                nodes {
                    homepage
                    slug {
                        current
                    }
                }
            }
        }
    `);
    const eventQuery = await graphql(`
        query getQuery {
            event: allSanityEvent(sort: { fields: [start], order: ASC }) {
                edges {
                    node {
                        slug {
                            current
                        }
                    }
                    next {
                        slug {
                            current
                        }
                    }
                    previous {
                        slug {
                            current
                        }
                    }
                }
            }
        }
    `);
    landingQuery.data.landing.nodes.forEach((node) => {
        createPage({
            path: node.slug.current,
            component: path.resolve(`src/templates/Landing.js`),
            context: { slug: node.slug.current },
        });
    });
    pageQuery.data.page.nodes.forEach((node) => {
        let slug = node.slug.current;
        if (node.homepage) {
            slug = "/"
        }
        createPage({
            path: slug,
            component: path.resolve(`src/templates/Page.js`),
            context: { slug: node.slug.current },
        });
    });
    eventQuery.data.event.edges.forEach(({ node, next, previous }) => {
        createPage({
            path: node.slug.current,
            component: path.resolve(`src/templates/Event.js`),
            context: { slug: node.slug.current, next, previous },
        });
    });
};
