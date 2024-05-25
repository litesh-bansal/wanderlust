const express = require('express');
const router = express.Router();

const localStrategy = require('passport-local');
const wrapAsync = require('../util/wrapAsync');
const passport = require('passport');
const {saveRedirectUrl} = require('../middleware.js');
const listingControlllers = require('../controllers/user.js');

// signup Routes
router.route('/signup')
    .get(listingControlllers.renderSignup)
    .post(wrapAsync (listingControlllers.signup))


// log in Routes
router.route('/login')
    .get(listingControlllers.renderLogin)
    .post(saveRedirectUrl,
    passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),listingControlllers.login);


// log out Route
router.get('/logout',listingControlllers.logout);
module.exports = router;