import React, { useState } from 'react';

const ReviewForm = ({ productId }) => {
  const [userId, setUserId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          productId,
          rating,     // rating is a number now
          comment
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit review');
      }

      alert('✅ Review submitted!');
      
      // Clear form after successful submission
      setUserId('');
      setRating(5);
      setComment('');
    } catch (err) {
      alert('❌ Error submitting review');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Leave a Review</h3>

      <input
        type="text"
        placeholder="Your User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
        style={{ display: 'block', marginBottom: 10 }}
      />

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))} // ensure number
        style={{ marginBottom: 10 }}
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>{r} Star</option>
        ))}
      </select>

      <textarea
        placeholder="Your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
        required
      />

      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
