const Review = require('../models/Review');

const createReview = async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    const review = new Review({
      userId,
      productId,
      rating,
      comment
    });

    await review.save();
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    res.status(500).json({ message: 'Error creating review', error: err.message });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId }).populate('userId', 'username');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};

module.exports = {
  createReview,
  getProductReviews
};
