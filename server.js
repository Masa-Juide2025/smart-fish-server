const express = require('express');
const app = express();
const http = require('http');
const { WebSocketServer } = require('ws');

app.use(express.json());

let sensorData = {};  // تخزين بيانات الحساسات مؤقتاً

// استقبال البيانات من ESP
app.post('/data', (req, res) => {
  sensorData = req.body;
  console.log('Received data:', sensorData);

  // إرسال البيانات لكل العملاء المتصلين عبر WebSocket
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(sensorData));
    }
  });

  res.sendStatus(200);
});

// إرسال البيانات لتطبيق الويب عبر REST (اختياري)
app.get('/data', (req, res) => {
  res.json(sensorData);
});

// إنشاء سيرفر HTTP لتجهيز WebSocket
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// إعداد WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');

  // إرسال آخر بيانات موجودة عند الاتصال
  ws.send(JSON.stringify(sensorData));

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// تشغيل السيرفر
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
