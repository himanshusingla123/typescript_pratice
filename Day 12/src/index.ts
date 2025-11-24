import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

// ESM equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
// const

const publicPath = path.join(__dirname, "..", "public");

wss.on("connection", (ws) => {
  console.log("A new user has connected");
  ws.on("message", (data) => {
    const message = data.toString('utf-8'); // convert buffer → string
    console.log("Received:", message);
    // console.log('A new user message:', data.toString('utf-8'));
    wss.clients.forEach(function each(client) {
      if(client == ws)
      {
        client.send(`my message: ${message}`)
      }
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`other user message: ${message}`);
      }
    });
  });
});

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  return res.sendFile(path.join(publicPath, "index.html"));
});

server.listen(9000, () => {
  console.log("Server started at port 9000");
});
