const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// @route   GET api/classes
// @desc    Get all classes
// @access  Public
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().sort({ schedule: 'asc' });
    res.json(classes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/classes
// @desc    Create a class
// @access  Public // Should be private in a real app
router.post('/', async (req, res) => {
  const { name, description, instructor, schedule, capacity } = req.body;

  try {
    const newClass = new Class({
      name,
      description,
      instructor,
      schedule,
      capacity,
    });

    const savedClass = await newClass.save();
    res.json(savedClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
