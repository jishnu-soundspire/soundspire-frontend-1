import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css'; 
import { Link } from 'react-router-dom';

const Carousel = ({ reviews }) => {
  const isLooping = reviews.length > 1;

const settings = {
  dots: true,
  infinite: reviews.length > 1,
  speed: 500,
  slidesToShow: Math.min(3, reviews.length),
  slidesToScroll: 1,
  autoplay: reviews.length > 1,
  autoplaySpeed: 3000,
  arrows: true,
};




  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id} className="carousel-slide">
            <Link to={`/review/${review.id}`}>
              <img src={review.image} alt={review.album} className="carousel-img" />
              <p className="carousel-caption">{review.album}</p>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
