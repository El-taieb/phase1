const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const order = new Order({ userId, productId, quantity });
    await order.save();
    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

module.exports = { createOrder, getOrdersByUser };
