const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// --- Connect to Database ---
connectDB();

const app = express();
const port = process.env.PORT || 3001;

// --- Global Error Handling ---
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => res.send('Bharat Barbell Club API is running!'));
app.use('/api/classes', require('./routes/classes'));
app.use('/api/auth', require('./routes/auth'));

const server = app.listen(port, () => console.log(`🚀 Server is running on port: ${port}`));

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥');
  console.error(err.name, err.message);
  server.close(() => process.exit(1));
});
