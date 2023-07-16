const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateUser } = require('../authsys/authSys');

router.post('/create', authenticateUser, productController.createProduct);

router.get('/getall', productController.getAllProducts);
router.get('/getprod', productController.getProduct);

module.exports = router;