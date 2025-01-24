const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../model/review.js");
const Listing = require("../model/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");


//Review
//Post Riview Route
router.post("/", isLoggedIn, validateReview, wrapAsync(async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "review created successfully");
    res.redirect(`/listings/${listing._id}`);
}));


//Delete Review Route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync (async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review!');
    res.redirect(`/listings/${id}`);
}));

module.exports = router;