import express from "express";
const app = express();
import path from "path"
const { createServer } = require("http");
const server = createServer(app);
const PORT = process.env.PORT || 3000
const WebSocket = require("ws")
const wss = new WebSocket.WebSocketServer({ server })

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  let logs = {
    ip: req.headers["x-forwarded-for"].split(",")[0],
    agent: req.headers["user-agent"]
  }
  res.status(200).render("chat.hbs", logs)
});

wss.on("connection", (ws) => {
  console.log("user connected");
  ws.on("message", (data, isBinary) => {
    const buff = Buffer.from(data);
    console.log(JSON.parse(buff));
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(buff);
      }
    });
  });
});
server.listen(PORT, () => {
  console.log(`app listening on: http://localhost:${PORT}`)
})

