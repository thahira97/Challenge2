const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport')

passport.use(new GoogleStrategy({
  clientID: "190866674720-hshcoofp3kv4r7tmb41kq5cgt9ti3blm.apps.googleusercontent.com" ,
  clientSecret: "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",
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
