import React, { useEffect, useState,useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import './comments.css';
import { Link } from 'react-router-dom';

function ReplyInput({ onReply }) {
  const [reply, setReply] = useState('');
  return (
    <div style={{ marginTop: '0.5rem' }}>
      <input
        type="text"
        placeholder="Reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="comment-input"
      />
      <button onClick={() => { onReply(reply); setReply(''); }} className="comment-button">Reply</button>
    </div>
  );
}

function ReviewDetail() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const hasIncrementedView = useRef(false);

  useEffect(() => {
  axios.get(`http://localhost:5000/api/reviews/${id}`).then(res => {
    setReview(res.data);

    const commentsWithReplies = (res.data.Comments || []).map(comment => ({
      ...comment,
      replies: comment.Replies || []
    }));

    setComments(commentsWithReplies);

    // ✅ Increment views only once (after review is fetched)
    if (!hasIncrementedView.current) {
      axios.post(`http://localhost:5000/api/reviews/${id}/increment-views`)
        .then(() => {
          setReview(prev => prev ? { ...prev, views: (prev.views || 0) + 1 } : prev);
        });
      hasIncrementedView.current = true;
    }
  });
}, [id]);





  const addComment = () => {
  axios.post(`http://localhost:5000/api/reviews/${id}/comments`, {
    author: 'Anonymous',
    text: commentInput
  }).then(res => {
    setComments([...comments, res.data]);
    setCommentInput('');
  }).catch(err => {
    console.error(err);
  });
};


  const likeComment = (commentId) => {
    axios.post(`http://localhost:5000/api/reviews/comments/${commentId}/like`)
    .then(res => {
      const updatedComment = res.data;

      const normalizedComment = {
        ...updatedComment,
        replies: updatedComment.Replies || []
      };

      setComments(comments.map(c => c.id === commentId ? normalizedComment : c));
    });
  };

  const replyToComment = (commentId, replyText) => {
  axios.post(`http://localhost:5000/api/reviews/comments/${commentId}/reply`, {
    author: "Anonymous",
    text: replyText
  }).then(res => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...(c.replies || []), res.data]
        };
      }
      return c;
    }));
  });
};


  if (!review) return <div className="page-container">Loading...</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">{review.album}</h1>
      <Link to="/" className="read-more" style={{ display: 'inline-block', textAlign: 'center', marginTop: '10px' }}>← Back</Link>
      <br/><br/>
      <div className="review-card">
        <img src={review.image} alt={review.album} className="cover-img" /><br/>
        <div className="genre-tag">{review.genre}</div>
        <div className="review-text">{review.snippet}</div>
        <div className="review-meta">{review.author}, {review.date} — <strong>Views: {review.views || 0}</strong></div>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add a comment..."
          className="comment-input"
        />
        <button onClick={addComment} className="comment-button">Post</button>

        {comments.map(comment => (
          <div key={comment.id} className="comment-box">
            <p><strong>{comment.author}</strong>: {comment.text}</p>
            <div className="comment-actions">
              <button onClick={() => likeComment(comment.id)}>❤️ {comment.likes}</button>
              <ReplyInput onReply={(text) => replyToComment(comment.id, text)} />
            </div>
            {(comment.replies || []).map((reply, i) => (
  <div key={i} className="reply-box">
    <p><strong>{reply.author}</strong>: {reply.text}</p>
  </div>
))}

          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewDetail;
