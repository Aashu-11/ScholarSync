// backend/controllers/scholarshipController.js
const Scholarship = require('../models/Scholarship');

exports.getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addScholarship = async (req, res) => {
    const scholarship = new Scholarship(req.body);
    try{
        const newScholarship = await scholarship.save();
        res.status(201).json(newScholarship);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}