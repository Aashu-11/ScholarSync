// controllers/documentController.js
const Document = require('../models/Document');

exports.uploadDocument = async (req, res) => {
  try {
    const { name, type } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;

    const document = new Document({
      userId: req.user._id,
      name,
      type,
      fileUrl,
    });

    await document.save();
    res.status(201).json({ message: 'Document uploaded successfully', document });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user._id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};