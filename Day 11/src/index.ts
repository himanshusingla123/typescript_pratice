// Concepts: open, message, send, echo, bidirectional, protocol = ws://
import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import http from "http";

// This creates a WebSocket server instance (wss).
// It listens on port 8080 for clients connecting via ws://localhost:8080.
// Unlike HTTP, WebSockets are persistent connections that stay open.
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  // When a new client connects, the server immediately sends them a welcome message.
  // .send() sends data to that specific client over the open WebSocket channel.
  // The client receives it inside its .onmessage handler.
  ws.send("Welcome!");
  // Each client connection listens for 'message' events.
  // When the client sends a message:
  // The server prints it on the console (Received: ...).
  // Then the server replies back with the same message prefixed by "Echo: ".
  // This is known as an echo server — it’s the simplest kind of WebSocket interaction.
  ws.on("message", (msg) => {
    wss.clients.forEach((client) => {
      // Concept: Server relays messages to all connected clients.
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});

app.get("/", (_, res) => {
  res.send("Websocket + Express working");
});

server.listen(3000);
