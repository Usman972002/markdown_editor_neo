const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const { marked } = require("marked");

const app = express();
const server = http.createServer(app);
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 1 way of converting to HTML from backend
// Markdown to HTML conversion endpoint
app.post("/convert", (req, res) => {
  const { markdown } = req.body;
  if (!markdown) {
    return res.status(400).json({ error: "Markdown text is required" });
  }
  const html = marked(markdown);
  res.json({ html });
});

// 2nd way of converting  -- using socket

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("convertMarkdown", (markdownText) => {
    if (!markdownText.trim()) return;
    
    const html = marked(markdownText); // Convert Markdown to HTML
    socket.emit("convertedHtml", html); // Send back the converted HTML
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


app.get("/", (req, res) => {
  res.send("Socket.io Server is running...");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});