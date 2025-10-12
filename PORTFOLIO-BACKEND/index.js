const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (for production, use Redis/MongoDB)
let editorContent = '// Start coding here...\n';

// Broadcast to all connected clients except sender
const broadcast = (data, sender) => {
  wss.clients.forEach(client => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// REST endpoint to get current content
app.get('/api/content', (req, res) => {
  res.json({ content: editorContent });
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  
  // Send current content to new client
  ws.send(JSON.stringify({ type: 'init', content: editorContent }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'update') {
        editorContent = data.content;
        broadcast({ type: 'update', content: data.content }, ws);
      }
    } catch (err) {
      console.error('Error processing message:', err);
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
  ws.on('error', (err) => console.error('WebSocket error:', err));
});

// Use environment port from Render, and bind to 0.0.0.0
const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
