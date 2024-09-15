const express = require("express");
const router = express.Router();
const wrapAsync = require("../utility/wrapAsync.js");
const ExpressError = require("../utility/expressError.js");
const {listingschema,reviewSchema} = require("../schema.js");
const listing = require("../models/listing.js");
const validatelisting = (req,res,next)=>{
    let {error}=  listingschema.validate(req.body);
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
     throw new ExpressError(500 , errmsg);
    }
    next();
}
// const {listingschema,reviewSchema} = require("./schema.js");
router.get("/",wrapAsync(async(req,res,next)=>{
    const allListings = await listing.find({});
    res.render("./listing/index.ejs",{allListings});
    // console.log(allListings);
    })
);
router.get("/new" , (req,res)=>{
    res.render("./listing/new.ejs");
}
);
router.get("/:id" ,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const showlisting = await listing.findById(id).populate("reviews");
    res.render("./listing/show.ejs" , {showlisting});7
    console.log(showlisting);

}));
router.post("/",validatelisting,wrapAsync(async(req,res,next)=>{

    let newlisting =new listing(req.body.listing);
    newlisting.save();
    // console.log(newlisting);
    res.redirect("/listings");

}));
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const newlisting = await listing.findById(id);
    res.render("./listing/edit.ejs",{newlisting});
}));
router.put("/:id",validatelisting,async(req,res)=>{
    // if(!req.body.listing){
    //     next(new ExpressError(400,"please send valid data"))
    // }
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
})
router.delete("/:id" ,wrapAsync( async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));
module.exports=router;