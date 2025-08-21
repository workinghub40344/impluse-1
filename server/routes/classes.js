const express = require('express');
const router = express.Router();
const {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
} = require('../controllers/classController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET api/classes
// @desc    Get all classes
// @access  Public
router.get('/', getClasses);

// @route   POST api/classes
// @desc    Create a class
// @access  Private
router.post('/createclass', protect, createClass);

// @route   PUT api/classes/:id
// @desc    Update a class
// @access  Private
router.put('/:id', protect, updateClass);

// @route   DELETE api/classes/:id
// @desc    Delete a class
// @access  Private
router.delete('/:id', protect, deleteClass);

module.exports = router;
