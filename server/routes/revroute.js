const express = require('express');
const router = express.Router();
const Review = require('../models/rev');
const Comment = require('../models/comments');
const Reply = require('../models/reply');

router.get('/', async (req, res) => {
  const reviews = await Review.findAll();
  res.json(reviews);
});

router.get('/seed', async (req, res) => {
  try {
    const review = await Review.create({
      album: "Chromakopia",
      genre: "Jazz",
      image: "http://localhost:5000/uploads/alb.jpg",
      snippet: "Lorem ipsum dolor sit amet...",
      author: "Ashish Paul",
      date: "20th Dec"
    });

    await Comment.create({
      text: "Amazing album!",
      author: "Listener A",
      ReviewId: review.id
    });

    res.send("Seeded!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [Reply]
        }
      ]
    });

    if (!review) return res.status(404).json({ error: 'Review not found' });

    

    res.json(review);
  } catch (err) {
    console.error('Error fetching review:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/increment-views', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    review.views = (review.views || 0) + 1;
    await review.save();

    res.json({ success: true, views: review.views });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.post('/:id/comments', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    const comment = await Comment.create({
      text: req.body.text,
      author: req.body.author,
      ReviewId: review.id
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/comments/:commentId/reply', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const reply = await Reply.create({
      author: req.body.author,
      text: req.body.text,
      CommentId: comment.id
    });

    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/comments/:commentId/like', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    comment.likes = (comment.likes || 0) + 1;
    await comment.save();

    const updatedComment = await Comment.findByPk(comment.id, {
      include: Reply
    });

    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
