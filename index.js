const express = require('express');
const app = express();
const path = require("path")
const { engine } = require("express-handlebars")
const { createServer } = require('http');
const server = createServer(app);
const PORT = process.env.PORT || 3000
const { WebSocketServer } = require("ws")
const wss = new WebSocketServer({ server })

app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.engine("hbs", engine({
  extname: ".hbs"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  let data = {
    ip: req.headers["x-forwarded-for"].split(",")[0],
    agent: req.headers["user-agent"]
  }
  res.status(200).render("chat", data.toObject())
})

wss.on("connection", ws => {
  console.log("user connected")
  ws.on("message",  (message, isBinary) => {
    ws.send(message)
  })
})

server.listen(PORT, () => {
  console.log(`app listening on: http://localhost:${PORT}`)
})
