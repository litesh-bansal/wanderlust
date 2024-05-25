const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../util/wrapAsync.js');
const {listingSchema} = require('../schema.js');
const {isLoggedIn} = require('../middleware.js');
const {isOwner} = require('../middleware.js');
const {listingSchemaValidation} = require('../middleware.js');
const listingControlllers = require('../controllers/listing.js');
const multer  = require('multer')

const {storage} = require('../cloudConfig.js')
const upload = multer({ storage })

// here we have combined same address routes of different type of requests
router
.route('/')
    // index route
    .get(wrapAsync(listingControlllers.index))
    // create route
    .post(isLoggedIn,upload.single('listing[image]'),wrapAsync(listingControlllers.create))

// new Route
router.get('/new',isLoggedIn,listingControlllers.new);

router
    .route('/:id')
    // update route
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),wrapAsync(listingControlllers.update))
    // show route
    .get(wrapAsync(listingControlllers.show))
    // delete route
    .delete(isLoggedIn, wrapAsync(listingControlllers.destroyListing));





// edit route
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(listingControlllers.edit));



module.exports = router;