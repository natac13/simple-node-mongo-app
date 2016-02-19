'use strict';

const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/users');
const configAuth = require('./auth');

module.exports = (passport) => {
  // passing in a callback function with the user object and done as argument
  // done is a function native to passport, which tell Passport to proceed in
  // the process.
  //
  // When done(null, user.id) is called, passport take this info and passes it
  // to the authenticate function. Info is then stored in the
  // req.session.passport.user object.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new GithubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL
  },
  function verifyCallback(token, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(User.__proto__)
      User.findOne({ 'github.id': profile.id })
        .then(function findSuccess(user) {
          if (user) {
            done(null, user);
          } else {
            const newUser = new User();

            newUser.github.id = profile.id;
            newUser.github.username = profile.username;
            newUser.github.displayName = profile.displayName;
            newUser.gitgub.publicRepos = profile._json.public_repos;
            newUser.numClicks.clicks = 0;

            newUser.save()
              .then(function saveSuccess() {
                return done(null, newUser);
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    });
  }
  ));

};