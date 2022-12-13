 const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');

const key = 'Secret';


const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = function (passport) {
  passport.use(new JWTStrategy(opts, function (jwt_payload, done) {
     User.findById(jwt_payload.id)
     .then(user => { 
      if(user) {
        return done(null, user)
      }
      return done(null, false)
    })
    .catch(err=> console.log(err))
     
     }))
}