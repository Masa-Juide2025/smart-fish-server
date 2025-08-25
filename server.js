
const express = require('express');
const app = express();
app.use(express.json());

let sensorData = {};  // تخزين بيانات الحساسات مؤقتاً

// استقبال البيانات من الESP
app.post('/data', (req, res) => {
  sensorData = req.body; // حفظ البيانات المرسلة
  console.log('Received data:', sensorData);
  res.sendStatus(200);
});

// إرسال البيانات لتطبيق الويب
app.get('/data', (req, res) => {
  res.json(sensorData);
});

const PORT = 4000;  // أو أي رقم منفذ آخر متاح
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});