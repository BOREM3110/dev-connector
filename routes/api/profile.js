const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');

// load the Profile model
const Profile = require('./models/Profile');

// load User model
const User = require('./models/User');

const validateProfileInput = require('../../config/validation/profile');
const validateExperienceInput = require('../../config/validation/experience');
const validateEducationInput = require('../../config/validation/education')
const router = express.Router();

// @route GET api/profile/test
// @desc  Tests profile route
// @access Public 
router.get('/test', (req, res) => res.json({msg: "Profile work!"}));

// @route GET api/profile
// @desc  get current user profile
// @access Private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({user: req.user.id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      const errors = {};
      if (!profile) {
        errors.noprofile = "There's no profile for this user!"
        return res.status(404).json(errors);
      }
      res.json(profile)
    })
    .catch(error => res.status(404).json(err))
})

// @route GET api/profile/all
// @desc  GET all the profiles
// @access Public

router.get('/all', (req, res) => {
  Profile.find({})
  .populate('user', ["name", "avatar"])
  .then(profiles => {
    if(!profiles) {
      return res.status(404).json({noprofiles: "There are no profiles found!"})
    }
    return res.json(profiles)
  })
  .catch(err => res.json({ profiles: "There's no profiles!" }))
})

// @route GET api/profile/handle/:handle
// @desc  GET profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({handle: req.params.handle})
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = "There's no profile with that handle!"
      return res.status(404).json(errors);
    }
    return res.json(profile)

  })
  .catch(err => res.json(err))
  
});

// @route GET api/profile/user/:user_id
// @desc  GET profile by user ID
// @access Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({user: req.params.user_id})
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = "There's no profile with that ID!"
      return res.status(404).json(errors);
    }
    return res.json(profile)

  })
  .catch(err => res.json({profile: "There's no profile for this user!"}))
  
});



// @route   POST api/profile
// @desc  Create or Edit user profile
// @access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Get field's profile

const {errors, isValid} = validateProfileInput(req.body);


// Check validation
if(!isValid) {
  // Return any errors with status 400
 return res.status(400).json(errors);
}
  const profileFields = {};
  profileFields.user = req.user.id;

  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;

  // Skills - split in array
  if (typeof req.body.skills !== 'undefined') profileFields.skills = req.body.skills.split(',');
  if (req.body.bio) profileFields.bio = req.body.bio;
  
  // Social field
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    
  Profile.findOne({user: req.user.id})
  
  .then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(req.user.id, {$set: profileFields}, {new: true})
      .then(profile => res.json(profile)
      )
    } else {
      Profile.findOne({handle: profileFields.handle})
      .then( profile => {
        if (profile) {
          errors.handle = "That handle profile already exist";
          res.status(400).json(errors)
        }
        new Profile(profileFields)
        .save()
        .then(profile =>  res.json(profile))
      })
    }
  }).catch(err=> res.status(404).json(err))
})

// @route   POST api/profile/experience
// @desc  Add experience to profile
// @access Private

router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  
    const {errors, isValid} = validateExperienceInput(req.body);
    if(!isValid) {
      return res.status(404).json(errors);
    }
  Profile.findOne({user: req.user._id})
  .then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    }

    // Add to experience array
    profile.experience.unshift(newExp);
    profile.save().then(profile => res.json(profile))

  })
  .catch(err => res.json(err))


})

// @route   POST api/profile/education
// @desc  Add education to profile
// @access Private

router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {errors, isValid} = validateEducationInput(req.body);

  if(!isValid) {
    return res.status(404).json(errors);
  }
  
Profile.findOne({user: req.user._id})
.then(profile => {
  const newEduc = {
    school: req.body.school,
    degree: req.body.degree,
    fieldofstudy: req.body.fieldofstudy,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  }

  // Add to education array
  profile.education.unshift(newEduc);
  profile.save().then(profile => res.json(profile))

})
.catch(err => res.json(err))


})

// @route   DELETE api/profile/experience/:id
// @desc Delete experience  
// @access Private

router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Get remove index
  Profile.findOne({user: req.user.id})
  .then(profile => {
    const removeIndex = profile.experience.map(item => item.id)
    .indexOf(req.params.exp_id);

    // Splice out of array
    profile.experience.splice(removeIndex, 1);
    profile.save().then(profile => res.json(profile))
  })

})

// @route DELETE api/profile/education/:edu_id
// @desc Delete education  
// @access Private

router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Get remove index
  Profile.findOne({user: req.user.id})
  .then(profile => {
    const removeIndex = profile.experience.map(item => item.id)
    .indexOf(req.params.edu_id);

    // Splice out of array
    profile.education.splice(removeIndex, 1);
    profile.save().then(profile => res.json(profile))
  })

})

// @route DELETE api/profile
// @desc Delete user and profile  
// @access Private

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Remove user and profile
    Profile.findOneAndRemove({user: req.user.id})
    .then(() => {
      User.findOneAndRemove({_id: req.user.id})
      .then(() => res.json({success: true}))
    })

  })




module.exports = router;