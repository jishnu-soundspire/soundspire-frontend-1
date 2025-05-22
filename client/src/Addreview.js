import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AddReviewForm() {
  const [review, setReview] = useState({
    album: '',
    genre: '',
    image: '',
    snippet: '',
    author: '',
    date: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/reviews', review);
    navigate('/');
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Add New Review</h1>
      <form className="review-form" onSubmit={handleSubmit}>
        <input type="text" name="album" placeholder="Album" value={review.album} onChange={handleChange} required /><br/><br/>
        <input type="text" name="genre" placeholder="Genre" value={review.genre} onChange={handleChange} required /><br/><br/>
        <input type="text" name="image" placeholder="Image URL" value={review.image} onChange={handleChange} required /><br/><br/>
        <textarea name="snippet" placeholder="Snippet" value={review.snippet} onChange={handleChange} required /><br/><br/>
        <input type="text" name="author" placeholder="Author" value={review.author} onChange={handleChange} required /><br/><br/>
        <input type="text" name="date" placeholder="Date" value={review.date} onChange={handleChange} required /><br/><br/>
        <button className="read-more" type="submit">Submit Review</button>&nbsp;&nbsp;
        <Link to="/" className="read-more" style={{ display: 'inline-block', textAlign: 'center', marginTop: '10px' }}>← Back</Link>
      </form>
    </div>
  );
}

export default AddReviewForm;
