// routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/', authMiddleware.authenticate, upload.single('file'), documentController.uploadDocument);
router.get('/', authMiddleware.authenticate, documentController.getDocuments);
router.delete('/:id', authMiddleware.authenticate, documentController.deleteDocument);

module.exports = router;