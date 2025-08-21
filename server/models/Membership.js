const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a membership name'],
    trim: true,
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  duration: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
    required: [true, 'Please specify the duration (monthly, quarterly, or yearly)'],
  },
  features: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Membership = mongoose.model('Membership', MembershipSchema);

module.exports = Membership;
