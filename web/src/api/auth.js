import Pusher from "pusher";

const pusher = new Pusher({
    appId: process.env.GATSBY_PUSHER_APP_ID,
    key: process.env.GATSBY_PUSHER_KEY,
    secret: process.env.GATSBY_PUSHER_SECRET,
    cluster: process.env.GATSBY_PUSHER_CLUSTER,
    useTLS: true,
});

export default async function handler(req, res) {
    const { socket_id, channel_name, username } = req.body;

    const randomString = Math.random().toString(36).slice(2);

    const presenceData = {
        user_id: randomString,
        user_info: {
            username: username,
        },
    };

    const auth = JSON.stringify(pusher.authenticate(socket_id, channel_name, presenceData));
    res.send(auth);
}
