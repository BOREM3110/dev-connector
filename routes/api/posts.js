const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('./models/Post');
const gravatar = require("gravatar");

// Load profile model
const Profile = require('./models/Profile');
const router = express.Router();



// validation
const validatePostInput = require('../../config/validation/post');


// @route GET api/posts
// @desc   Get all posts
// @access Public

router.get('/', (req, res) => {
   Post.find()
   .sort({date: -1})
   .then(posts => res.json(posts))
   .catch(err => res.status(404).json({nopostsfound: 'No posts found!'}))
});

// @route GET api/posts/:id
// @desc   Get post by id
// @access Public

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
 .then(post => res.json(post))
 .catch(err => res.status(404).json({nopostfound: 'That identifier post not found!'}))
})

// @route POST api/posts
// @desc  Create a post
// @access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  const {errors, isValid} = validatePostInput(req.body);
  // Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id

  });
  newPost.save()
  .then(post => res.json(post)).catch(err => res.json({nopostexists: "Post not save well!"}));    
});

//@ route delete api/posts/id
// @desc  Delete a post
// @access Private

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    Post.findByIdAndRemove(req.params.id)
    .then(post =>{ 
     
      res.status(202).json(post)

    })
    })
    .catch(err => res.status(400).json(err))
  
  })


// @route POST api/posts/like/:id
// @desc  Like post
// @access Private

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
  .then(profile => {
   Post.findById(req.params.id)
   .then(post => {
     if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({alreadyliked: "User already liked this post!"})
     }

     //Add user id to likes
     post.likes.unshift({user: req.user.id})
     post.save().then(post => res.json(post));
   })
   .catch(err => res.json({postnotfound: "Post not found!"}))
})
})

// @route POST api/posts/unlike/:id
// @desc  unlike post
// @access Private

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
  .then(profile => {
   Post.findById(req.params.id)
   .then(post => {
     if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
       return res.status(400).json({notliked: "You have not yet liked it"})
        
     }

     // Get remove index
     const removedIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
     post.likes.splice(removedIndex, 1);
     post.save().then(post => res.json(post));
     
   })
   .catch(err => res.json({postnotfound: "Post not found!"}))
})
})

// @route POST api/posts/comment/:id
// @desc  Add comment to post
// @access Private

router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  const {errors, isValid} = validatePostInput(req.body);
  // Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  Post.findById(req.params.id).then(post => {
    const newComment = {
      name: req.body.name,
      avatar: req.body.avatar,
      text: req.body.text,
      user: req.user.id
    };
  
    // Add into comments array

    post.comments.unshift(newComment);
     // Save post
  post.save()
  .then(post=>{ 
    res.json(post)
  })
   
  })
  
  .catch(err => res.json({postnotfound: "There's no post found!"}))
});


// @route DELETE api/posts/comment/:id/:comment_id
// @desc  Remove comment from post
// @access Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
 
  Post.findById(req.params.id).then(post => {
   
    if(post.comments.filter(item => item._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({commentnotfound: "Comment does not exist!"})
   }

    // Get remove index
const removeIndex = post.comments.map(comment => comment._id).indexOf(req.params.comment_id);
    
 // Splice comment out of array
post.comments.splice(removeIndex, 1);
    post.save()
    .then(post => res.json(post));
})
.catch(err => res.status(404).json({postnotfound: "There's no post found!"})) 
})


module.exports = router;