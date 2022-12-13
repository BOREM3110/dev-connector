const express = require("express");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
//Load User model
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const passport = require('passport');

// Load validateRegisterInput
const validateRegisterInput = require('../../config/validation/register');
const validateLoginInput = require('../../config/validation/login');
const router = express.Router();
// @route GET api/users/register
// @desc  Register user
// @access Public 
router.post('/register', (req, res) => {

  const {errors, isValid} = validateRegisterInput(req.body);

   // Check the validation
    if(!isValid) {
     return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email })
  .then(user => {
      if(user) {
        errors.email = "This user already exists!";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, 
          {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mp' // Default
        })
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        })
          bcrypt.genSalt(10, (err, salt)=> {
            bcrypt.hash(newUser.password, salt, (err, hash)=> {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
              .then(user => res.json({
                name: user.name,
                email: user.email,
                avatar: user.avatar
              }))
            })
          })
      }
  })
});

// @route GET api/users/login
// @desc  Login User / Returning JWT Token
// @access Public
router.post('/login', (req, res)=> {

 const {errors, isValid} = validateLoginInput(req.body); 
  const email = req.body.email;
  const password = req.body.password;

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  // Find user by email

  User.findOne({email})
  .then(user => {
    //Check for user
    if (!user) {
      errors.email = "User not found!";
     return res.status(404).json(errors)
    } 
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if(!isMatch) {
          errors.password = "Password incorrect!"
          return res.json(errors)
        } else {
          const payload = {id: user.id, name: user.name, email: user.email, avatar: user.avatar};
          jwt.sign(payload, 'Secret', { expiresIn: 3600 }, (err, token)=> {
            res.json({
              success: true,
              token: `Bearer ${token}`
            })
          })
             
          }
        
      })
    
  }).catch(err => res.json(err))

})



module.exports = router;