import { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [canReview, setCanReview] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId || !productId) return;

    axios.get(`http://localhost:5001/api/orders/${userId}`)
      .then((res) => {
        const hasOrdered = res.data.some(order => order.productId === productId || order.productId?._id === productId);
        setCanReview(hasOrdered);
      });
  }, [userId, productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/reviews', {
        userId,
        productId,
        rating,
        comment
      });
      alert('✅ Review submitted');
      setComment('');
      window.location.reload();
    } catch (err) {
      alert('❌ Failed to submit review');
      console.error(err);
    }
  };

  if (!canReview) {
    return <p>⚠️ You must order this product before leaving a review.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Star</option>)}
      </select><br />
      <textarea
        placeholder="Your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      /><br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;
