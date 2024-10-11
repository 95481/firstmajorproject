const listing = require("./models/listing.js");
const  Review = require("./models/review.js");
module.exports. isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
      req.flash("error","You must be logged In!");
      return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirecturl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();

};
module.exports.isOwner = async(req,res,next)=>{
  let{id} = req.params;
  let listings = await listing.findById(id);
  if(!listings.owner.equals(res.locals.currUser._id)){
      req.flash("error","you are not the owner");
      return res.redirect(`/listings/${id}`);
  }
next();
}
module.exports.isReview = async(req,res,next)=>{
  let{id,reviewId} = req.params;
  let reviews = await Review.findById(reviewId);
  if(!reviews.author.equals(res.locals.currUser._id)){
      req.flash("error","you are not the owner of this review");
      return res.redirect(`/listings/${id}`);
  }
next();
}