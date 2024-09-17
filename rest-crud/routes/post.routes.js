const express = require('express');
const Post = require('../model/Post');
const Review = require('../model/Review');
const reviewer = require('../model/user');
const postRoute = express.Router();

/* Add Post */
postRoute.post('/posts/create', async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (error) {
    next(error);
  }
});
postRoute.post('/posts/:id/view', async (req, res, next) => {
  console.log("mongooo");
  console.log(req.body);
  try {
    const review = await Review.create(req.body);
    console.log("mongooo");
    console.log(req.body);
    res.json(review);
  } catch (error) {
    next(error);
  }
});
postRoute.post('/posts/signup', async (req, res, next) => {
  console.log("mongooo");
  console.log(req.body);
  try {
    const user = await reviewer.create(req.body);
    console.log("mongooo");
    console.log(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});


/* Get all Posts*/
postRoute.get('/posts/:id/view', async (req, res, next) => {
  try {
    console.log("try to get all reviewss from mongooo");
    console.log(req.params.id);
    const revs = await Review.find({movieId:req.params.id});
    console.log(revs);
    res.json(revs);
  } catch (error) {
    console.log("error",error);
    next(error);
  }
});
postRoute.get('/posts/login', async (req, res, next) => {
  try {
    console.log("try to get all reviewers from mongooo");
    const revs = await reviewer.find();
    console.log(revs);
    res.json(revs);
  } catch (error) {
    console.log("error",error);
    next(error);
  }
});
postRoute.get('/posts', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

/* Get Post by ID */
postRoute.get('/posts/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

/* Update Post */
postRoute.put('/posts/:id', async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

/* Delete Post */
postRoute.delete('/posts/:id', async (req, res, next) => {
  try {
    const deletedPost = await Post.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Add this new route to serve the poster image
postRoute.get('/posts/:id/poster', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.poster) {
      return res.status(404).json({ msg: 'Poster not found' });
    }
    res.sendFile(path.join(__dirname, '..', 'uploads', post.poster));
  } catch (error) {
    next(error);
  }
});

module.exports = postRoute;