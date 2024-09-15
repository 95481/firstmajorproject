const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utility/wrapAsync.js");
const ExpressError = require("../utility/expressError.js");
const {reviewSchema} = require("../schema.js");
const listing = require("../models/listing.js");
const  Review = require("../models/review.js");
const revschema = (req,res,next)=>{
    let {error}=  reviewSchema.validate(req.body);
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
     throw new ExpressError(500 , errmsg);
    }
    next();
} 

router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId} = req.params;
    await listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    console.log("hoo");
    res.redirect(`/listings/${id}`);
}))
router.post("/",revschema,wrapAsync(async(req,res)=>{
    let reviewlisting = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    // console.log(req.body.review);
    reviewlisting.reviews.push(newReview);
    await newReview.save();
    await reviewlisting.save();
    res.redirect(`/listings/${reviewlisting._id}`)
}));
module.exports=router;