// backend/models/Scholarship.js
const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  provider: { type: String, required: true },
  amount: { type: String, required: true },
  deadline: { type: String, required: true },
  category: { type: String, required: true },
  eligibility: { type: [String], required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  match: { type: Number, required: true },
  location: { type: String, required: true },
  field: { type: String, required: true },
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);