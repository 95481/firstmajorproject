const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utility/wrapAsync.js");
const ExpressError = require("../utility/expressError.js");
const {reviewSchema} = require("../schema.js");
const listing = require("../models/listing.js");
const  Review = require("../models/review.js");
const controlReview = require("../controller/review.js");
const {isLoggedIn,isOwner,isReview} = require("../middleware.js");
const revschema = (req,res,next)=>{
    let {error}=  reviewSchema.validate(req.body);
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
     throw new ExpressError(500 , errmsg);
    }
    next();
} 

router.delete("/:reviewId",isReview,wrapAsync(controlReview.deleteRev))
router.post("/",revschema,isLoggedIn,wrapAsync(controlReview.addRev));
module.exports=router;