const Notification = require('../models/Notification');

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const notification = new Notification({ userId, message });
    await notification.save();

    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (err) {
    res.status(500).json({ message: 'Error creating notification', error: err.message });
  }
};

// Get all notifications for a specific user
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (err) {
    res.status(500).json({ message: 'Error updating notification', error: err.message });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead
};
