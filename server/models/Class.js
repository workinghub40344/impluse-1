const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  schedule: {
    type: Date,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 0,
  },
  registeredMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming a User model will exist
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
