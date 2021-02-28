const { campgroundSchema,reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError')
const campground = require('./models/campground')
const Review = require('./models/review')
module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error','you must be logged in');
        return res.redirect('/login')
    }
    next();
}
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
module.exports.isAuthor = async(req,res,next) => {
    const { id } = req.params;
    const acampground= await campground.findById(id);
    if(!acampground.author.equals(req.user._id)){
        req.flash('error','no permission')
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
module.exports.isReviewAuthor = async(req,res,next) => {
    const { id ,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error','no permission')
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}