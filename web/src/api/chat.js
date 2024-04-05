import Pusher from "pusher";

const pusher = new Pusher({
    appId: process.env.GATSBY_PUSHER_APP_ID,
    key: process.env.GATSBY_PUSHER_KEY,
    secret: process.env.GATSBY_PUSHER_SECRET,
    cluster: process.env.GATSBY_PUSHER_CLUSTER,
    useTLS: true,
});

export default async function handler(req, res) {
    const { message, username, date } = req.body;

    await pusher.trigger("presence-channel", "chat-update", {
        message,
        username,
        date,
    });

    res.json({ status: 200 });
}
