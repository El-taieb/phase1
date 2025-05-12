import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!productId) return;
    axios.get(`http://localhost:5001/api/reviews/${productId}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error('❌ Error loading reviews', err));
  }, [productId]);

  return (
    <div>
      <h3>📝 Reviews</h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((r) => (
        <div key={r._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <p><strong>Rating:</strong> {r.rating}/5</p>
          <p><strong>By:</strong> {r.userId?.username || r.userId}</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;