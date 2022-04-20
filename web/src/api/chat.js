import Pusher from "pusher";

const pusher = new Pusher({
    appId: "1385717",
    key: "f7ee7537880eb58daa4a",
    secret: "6eda52651a5958b8b5fe",
    cluster: "eu",
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
