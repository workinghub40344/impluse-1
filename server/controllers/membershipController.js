// controllers/membershipController.js

const Membership = require('../models/Membership');

// @desc    Get all membership plans
// @route   GET /api/memberships
// @access  Public
const getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ price: 'asc' });
    res.json(memberships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single membership plan by ID
// @route   GET /api/memberships/:id
// @access  Public
const getMembershipById = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({ msg: 'Membership plan not found' });
    }
    res.json(membership);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a membership plan
// @route   POST /api/memberships
// @access  Private/Admin
const createMembership = async (req, res) => {
  const { name, price, duration, features } = req.body;

  try {
    const newMembership = new Membership({
      name,
      price,
      duration,
      features,
    });

    const savedMembership = await newMembership.save();
    res.status(201).json(savedMembership);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
        return res.status(400).json({ msg: 'Validation error', errors: err.errors });
    }
    if (err.code === 11000) {
        return res.status(400).json({ msg: 'A membership plan with this name already exists.' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Update a membership plan
// @route   PUT /api/memberships/:id
// @access  Private/Admin
const updateMembership = async (req, res) => {
  try {
    const updatedMembership = await Membership.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMembership) {
      return res.status(404).json({ msg: 'Membership plan not found' });
    }

    res.json(updatedMembership);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a membership plan
// @route   DELETE /api/memberships/:id
// @access  Private/Admin
const deleteMembership = async (req, res) => {
  try {
    const deletedMembership = await Membership.findByIdAndDelete(req.params.id);

    if (!deletedMembership) {
      return res.status(404).json({ msg: 'Membership plan not found' });
    }

    res.json({ msg: 'Membership plan removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getMemberships,
  getMembershipById,
  createMembership,
  updateMembership,
  deleteMembership,
};
