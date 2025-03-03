// backend/routes/scholarshipRoutes.js
const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');

router.get('/', scholarshipController.getScholarships);
router.post('/', scholarshipController.addScholarship);

module.exports = router;