const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'QOTD API IS WORKING!',
    endpoints: [
      'GET /api/health',
      'GET /api/questions/today',
      'POST /api/submissions',
      'GET /api/stats'
    ]
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Today's question
app.get('/api/questions/today', (req, res) => {
  res.json({
    success: true,
    data: {
      id: '1',
      title: 'Two Sum',
      difficulty: 'Easy',
      problemStatement: 'Find two numbers that add up to target'
    }
  });
});

// Stats
app.get('/api/stats', (req, res) => {
  res.json({ 
    success: true,
    data: { attempts: 0, success: 0 }
  });
});

// Start server - FIXED VERSION
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  const address = server.address();  // This line was missing!
  console.log('=========================================');
  console.log('🚀 QOTD BACKEND STARTED SUCCESSFULLY!');
  console.log(`📍 Port: ${address.port}`);
  console.log(`🌐 Local: http://localhost:${address.port}`);
  console.log(`🌐 Network: http://0.0.0.0:${address.port}`);
  console.log('=========================================');
});

// Export for testing
module.exports = app;