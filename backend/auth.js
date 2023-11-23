const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport')
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID ,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:8000/google/callback",
  scope: ["profile", "email"]
},
async function(accessToken, refreshToken, profile, done) {
  try {
    return done(null, profile);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
})
passport.deserializeUser(function(id, done) {
  done(null, id);
})

module.exports = passport;
