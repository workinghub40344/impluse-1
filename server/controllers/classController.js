const Class = require('../models/Class');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Public
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ schedule: 'asc' });
    res.json(classes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a class
// @route   POST /api/classes
// @access  Private
const createClass = async (req, res) => {
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
};

// @desc    Update a class
// @route   PUT /api/classes/:id
// @access  Private
const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedClass) {
      return res.status(404).json({ msg: 'Class not found' });
    }

    res.json(updatedClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a class
// @route   DELETE /api/classes/:id
// @access  Private
const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);

    if (!deletedClass) {
      return res.status(404).json({ msg: 'Class not found' });
    }

    res.json({ msg: 'Class removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
};
