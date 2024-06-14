import { createClient } from "@sanity/client";

const client = createClient({
	projectId: process.env.GATSBY_SANITY_PROJECT_ID,
	dataset: "production",
	apiVersion: "2023-04-21",
	token: process.env.GATSBY_SANITY_TOKEN,
	useCdn: true,
});

export default async function handler(req, res) {
	const { username, message, date } = req.body;

	const doc = {
		_type: "comments",
		visible: true,
		name: username,
		message: message,
		publishedAt: date,
	};

	await client.create(doc);

	return res.json({ status: 200 });
}
