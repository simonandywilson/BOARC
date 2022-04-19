// "use strict";
// const express = require("express");
// const path = require("path");
// const serverless = require("serverless-http");
// const app = express();
// const bodyParser = require("body-parser");

// const router = express.Router();
// const Pusher = require("pusher");

// // router.get("/", (req, res) => {
// //     res.writeHead(200, { "Content-Type": "text/html" });
// //     res.write("<h1>Hello from Express.js!</h1>");
// //     res.end();
// // });
// // router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
// // router.post("/", (req, res) => res.json({ postBody: req.body }));

// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use("/.netlify/functions/server", router); // path must route to lambda
// // app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

// app.use(bodyParser.json());
// app.use("/.netlify/functions/server", router); // path must route to lambda
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// const pusher = new Pusher({
//     // connect to pusher
//     appId: "1385717",
//     key: "697e15716cd63c88c880",
//     secret: "277534394aeca89e70ff",
//     cluster: "eu",
// });

// // app.get("/", function (req, res) {
// //     // to test if the server is running
// //     res.send("all green");
// // });

// app.get("/", (req, res) => {
//     res.send("all green");
// });

// app.post("/pusher/auth", function (req, res) {
//     var socketId = req.body.socket_id;
//     var channel = req.body.channel_name;
//     var auth = pusher.authenticate(socketId, channel);
//     res.send(auth);
// });

"use strict";
const express = require("express");
const serverless = require("serverless-http");
const Pusher = require("pusher");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/.netlify/functions/server", router);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const pusher = new Pusher({
    appId: "1385717",
    key: "697e15716cd63c88c880",
    secret: "277534394aeca89e70ff",
    cluster: "eu",
});

router.get("/", (req, res) => {
    // res.json({ hello: "hi" });
    res.send("all green");
});

app.post("/pusher/auth", function (req, res) {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
});



module.exports.handler = serverless(app);
