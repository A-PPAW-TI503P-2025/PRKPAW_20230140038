const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { verifyToken } = require('../middleware/authMiddleware'); 
const { isAdmin } = require('../middleware/permissionMiddleware');

router.post('/check-in', verifyToken, presensiController.CheckIn);
router.post('/check-out', verifyToken, presensiController.CheckOut);
router.put('/:id', [verifyToken, isAdmin], presensiController.updatePresensi); 
router.delete('/:id', [verifyToken, isAdmin], presensiController.deletePresensi);

module.exports = router;