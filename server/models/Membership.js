// models/Membership.js

const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },  
  duration: { 
    type: String, 
    enum: ['monthly', 'quarterly', 'yearly'], 
    required: true 
  },
  features: { type: [String], default: [] },
  popular: { type: Boolean, default: false },
  color: { type: String, default: 'from-primary to-secondary' }, 
  icon: { type: String, default: 'Zap' }, 
  createdAt: { type: Date, default: Date.now },
});

const Membership = mongoose.model('Membership', MembershipSchema);

module.exports = Membership;
