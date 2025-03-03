// models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['transcript', 'recommendation', 'essay', 'resume', 'other'], required: true },
  uploadDate: { type: Date, default: Date.now },
  fileUrl: { type: String, required: true },
});

module.exports = mongoose.model('Document', documentSchema);