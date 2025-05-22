import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Carousel from './carousel';
import { Link } from 'react-router-dom';

function Allreviews() {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reviews')
      .then(res => {
        setReviews(res.data);
        setFilteredReviews(res.data);
      });
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = reviews.filter(review =>
      review.album.toLowerCase().includes(term) ||
      review.genre.toLowerCase().includes(term) ||
      review.author.toLowerCase().includes(term)
    );
    setFilteredReviews(filtered);
  }, [searchTerm, reviews]);

  return (
    <div className="page-container">
      <h1 className="page-title">All Reviews</h1>

      <div className="top-bar">
        <Link to="/add" className="add-review-btn">+ Add Review</Link>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by album, genre, or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Carousel */}
      {filteredReviews.length > 0 && <Carousel reviews={filteredReviews} />}

      <div className="grid-container">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, i) => (
            <div className="review-card" key={i}>
              <img src={review.image} className="cover-img" />
              <div className="review-text">{review.album}</div>
              <div className="genre-tag">{review.genre}</div>
              <div className="review-text">{review.snippet.split(" ").slice(0, 5).join(" ")}...</div>
              <div className="review-meta">{review.author}, {review.date}</div>
              <Link to={`/review/${review.id}`} className="read-more">Read More</Link>

            </div>
          ))
        ) : (
          <p>No matching reviews found.</p>
        )}
      </div>
    </div>
  );
}

export default Allreviews;
