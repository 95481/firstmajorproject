const listing = require("../models/listing.js");
const  Review = require("../models/review.js");
module.exports.deleteRev = async(req,res)=>{
    let {id,reviewId} = req.params;
    await listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    console.log("hoo");
    res.redirect(`/listings/${id}`);
};
module.exports.addRev = async(req,res)=>{
    let reviewlisting = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    // console.log(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    reviewlisting.reviews.push(newReview);
    await newReview.save();
    await reviewlisting.save();
    res.redirect(`/listings/${reviewlisting._id}`)
};