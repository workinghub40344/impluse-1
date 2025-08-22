// routes/memberships.js

const express = require('express');
const router = express.Router();
const {
  getMemberships,
  getMembershipById,
  createMembership,
  updateMembership,
  deleteMembership,
} = require('../controllers/membershipController');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   GET /api/memberships
// @desc    Get all membership plans
// @access  Public
router.get('/', getMemberships);

// @route   GET /api/memberships/:id
// @desc    Get a single membership plan by ID
// @access  Public
router.get('/:id', getMembershipById);

// @route   POST /api/memberships
// @desc    Create a membership plan
// @access  Private (Admin only)
router.post('/', protect, authorize('admin'), createMembership);

// @route   PUT /api/memberships/:id
// @desc    Update a membership plan
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin'), updateMembership);

// @route   DELETE /api/memberships/:id
// @desc    Delete a membership plan
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), deleteMembership);

module.exports = router;
