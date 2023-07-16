const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.body.userId, 
      orderProducts: req.body.products,
      totalAmount: req.body.totalAmount,
    });

    await newOrder.save();

    return res.status(201).json({ message: 'Order created successfully.', order: newOrder });
  } catch (error) {
    return res.status(500).json({ message: 'Error while creating the order.', error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const orders = await Order.find().populate('userId', 'username email'); 

      return res.status(200).json({ orders });
    } else {
      return res.status(403).json({ message: 'You do not have permission to access this resource.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error while retrieving orders.', error: error.message });
  }
};


module.exports = {
  createOrder,
  getAllOrders,
};
