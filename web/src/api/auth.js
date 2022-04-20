export default async function handler(req, res) {
    const { socket_id, channel_name, username } = req.body;
    let Pusher = require("pusher");
    const pusher = new Pusher({
        appId: "1385717",
        key: "f7ee7537880eb58daa4a",
        secret: "6eda52651a5958b8b5fe",
        cluster: "eu",
        useTLS: true,
    });

    const randomString = Math.random().toString(36).slice(2);

    const presenceData = {
        user_id: randomString,
        user_info: {
            username: username,
        },
    };

    const auth = pusher.authenticate(socket_id, channel_name, presenceData);
    res.send(auth);

    // try {
    //     const auth = pusher.authenticate(socket_id, channel_name, presenceData);
    //     res.send(auth);
    // } catch (error) {
    //     console.error(error.message);
    // }
}
