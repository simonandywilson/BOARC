import {createClient} from '@sanity/client'

const client = createClient({
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2022-04-21",
    token: process.env.GATSBY_SANITY_TOKEN,
    useCdn: true,
});

export default async function handler(req, res) {
    const { email, date } = req.body;

    const doc = {
        _type: "subscriber",
        subscribedAt: date,
        email: email,
    };

    await client.create(doc);

    return res.json({ status: 200 });
}
