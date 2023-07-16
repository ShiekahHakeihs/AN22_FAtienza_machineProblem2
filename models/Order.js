const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: [true, "User ID required."]
  },
  orderProducts: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, "Order Product ID required."]
      },
      quantity: {
        type: Number,
        required: [true, "Order Product quantity required."]
      },
      price: {
        type: Number,
        required: [true, "Order Product price required."]
      },
    },
  ],
  purchasedOn: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
