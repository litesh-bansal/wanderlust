const express = require('express');
const router = express.Router({mergeParams:true});
ExpressError = require('../util/ExpressError.js');
const wrapAsync = require('../util/wrapAsync.js');
const listingControlllers = require('../controllers/reviews.js');

const {reviewValidation,isLoggedIn, isReviewAuthor} = require('../middleware.js');

// Post review Route
router.post('/',isLoggedIn,reviewValidation,wrapAsync(listingControlllers.createReview));

// Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(listingControlllers.destroyReview));

module.exports = router;