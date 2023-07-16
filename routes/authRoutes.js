const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get('/profile', (req,res) => {
	authenticateUser(req,res, () => {
	return res.status(200).json(req.user);
	});
});
module.exports = router;