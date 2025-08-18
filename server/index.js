const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Class = require('./models/Class');

// --- Global Error Handling ---
// Gracefully shut down the server on unhandled errors.
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1); // Exit immediately
});

const app = express();
const port = process.env.PORT || 3001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => {
  res.send('Bharat Barbell Club API is running!');
});
app.use('/api/classes', require('./routes/classes'));

// --- Database Seeding Function ---
async function seedDatabase() {
  try {
    // Only seed if the collection is empty
    const count = await Class.countDocuments();
    if (count > 0) {
      console.log('Database already seeded. Skipping.');
      return;
    }

    console.log('Database is empty. Seeding with sample classes...');
    const classesToSeed = [
      { name: 'Beast Mode HIIT', description: 'High-intensity interval training.', instructor: 'Vikram', schedule: new Date('2025-08-18T06:00:00'), capacity: 15 },
      { name: 'Powerlifting Fundamentals', description: 'Master the big three lifts.', instructor: 'Meera', schedule: new Date('2025-08-18T07:00:00'), capacity: 8 },
      { name: 'Strength & Conditioning', description: 'Build functional strength.', instructor: 'Arjun', schedule: new Date('2025-08-18T18:00:00'), capacity: 12 },
    ];

    await Class.insertMany(classesToSeed);
    console.log('✅ Database seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  }
}

// --- DB Connection and Server Startup ---
const DB_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/bharatbarbell';

let server;

mongoose.connect(DB_URL)
  .then(() => {
    console.log('✅ Database connection successful!');
    seedDatabase();
    server = app.listen(port, () => {
      console.log(`🚀 Server is running on port: ${port}`);
    });
  })
  .catch(err => {
    console.error('❌ DATABASE CONNECTION ERROR!');
    console.error(err);
    process.exit(1);
  });

// --- Global Error Handling for Unhandled Promise Rejections ---
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
