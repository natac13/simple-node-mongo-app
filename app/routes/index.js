const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const ClickHandler = require('../controllers/clickHandler.server');
const clickHandler = ClickHandler();

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { // passport included function
    return next();
  } else {
    res.redirect('/login');
  }
}

router.route('/')
  .get(isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });

router.route('/login')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../pages/login'))
  });

router.route('/logout')
  .get((req, res) => {
    req.logout(); // passport included
    res.redirect('/login');
  });

router.route('/profile')
  .get(isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/profile.html'));
  });

router.route('/api/:id')
  .get(isLoggedIn, (req, res) => {
    res.json(req.user.github);
  });

router.route('/auth/github')
  .get(passport.authenticate('github'));

router.route('/auth/github/callback')
  .get(passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

router.route('/api/:id/clicks')
  .get(isLoggedIn, clickHandler.getClicks)
  .post(isLoggedIn, clickHandler.addClick)
  .delete(isLoggedIn, clickHandler.resetClicks);

module.exports = router;