import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllReviews from './Allreview';
import AddReviewForm from './Addreview';
import './App.css';
import ReviewDetail from './Revdetails'; 

function App() {
  return (
    <Router>
      <div className="page-container">
        <Routes>
          <Route path="/" element={<AllReviews />} />
          <Route path="/add" element={<AddReviewForm />} />
          <Route path="/review/:id" element={<ReviewDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
