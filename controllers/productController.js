const Product = require('../models/Product');


const createProduct = async (req, res) => {
  const { prodName, prodDesc, prodPrice } = req.body;
  try {

    if (req.user.isAdmin) {
      const newProduct = new Product({
        prodName,
        prodDesc,
        prodPrice,
      });

      await newProduct.save();

      return res.status(201).json({ message: 'Product created successfully.', product: newProduct });
    } else {
      return res.status(403).json({ message: 'You do not have permission to create a product.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error while creating the product.', error: error.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: 'Error while retrieving products.', error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: 'Error while retrieving products.', error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
};
