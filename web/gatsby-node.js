const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const homepageQuery = await graphql(`
        query getQuery {
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
    `);

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
                    slug {
                        current
                    }
                }
            }
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
    `);
    const eventQuery = await graphql(`
        query getQuery {
            event: allSanityEvent(sort: { fields: [start], order: ASC }) {
                edges {
                    node {
                        type
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
        if (slug === homepageQuery.data.homepage.initial.slug.current) {
            slug = "/";
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
