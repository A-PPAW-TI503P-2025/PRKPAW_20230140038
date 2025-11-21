const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken } = require('../middleware/authMiddleware'); 
const { isAdmin } = require('../middleware/permissionMiddleware'); 

router.get('/daily', [verifyToken, isAdmin], reportController.getDailyReport);

module.exports = router;