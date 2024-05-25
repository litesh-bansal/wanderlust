const Listing = require('./models/listing.js');
const {listingSchema} = require('./schema.js');
const {reviewSchema} = require('./schema.js')
const Review = require('./models/reviews.js');
module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated())
    {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error','you must be logged in');
        res.redirect('/login');
    }
    else
    {
        next();
    }
}

// by default when login is used passport reset the value of originalUrl because of which we will not be able to get the required page 
// so we will be using local because passport don't have any access to alter the locals
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl = req.session.redirectUrl; 
    }
    next();
}


module.exports.listingSchemaValidation = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error)
    {
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw error;
    }
    else
    {
        next();
    }
}


module.exports.reviewValidation = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    console.log(error);
    if(error)
    {
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else
    {
        next();
    }
}


module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params; 
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id))
    {
        req.flash('error',"You are not the owner");
        res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id))
    {
        req.flash('error','Permission denied');
        return res.redirect(`/listings/${id}`);
    }
    next();
}