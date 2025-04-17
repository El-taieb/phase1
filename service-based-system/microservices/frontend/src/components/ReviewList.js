import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!productId) return;
    axios
      .get(`http://localhost:5002/api/reviews/${productId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Error fetching reviews', err));
  }, [productId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((r) => (
        <div key={r._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <strong>Rating:</strong> {r.rating}/5<br />
          <strong>By:</strong> {r.userId?.username || r.userId}<br />
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
