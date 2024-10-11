const listing = require("../models/listing.js");
module.exports.index = async(req,res)=>{
        const allListings = await listing.find({});
        res.render("./listing/index.ejs",{allListings});
        // console.log(allListings);
        };
module.exports.renderNew =  (req,res)=>{
    res.render("./listing/new.ejs");
};
module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const showlisting = await listing.findById(id).populate({path:"reviews",
        populate:{
           path : "author"
        }}
    ).populate("owner");
    if(!showlisting){
        req.flash("error","This Listing Doesn't Exist.");
        res.redirect("/listings");
    }
    res.render("./listing/show.ejs" , {showlisting});
    console.log(showlisting);

};
module.exports.createListing = async(req,res,next)=>{

    const newlisting =new listing(req.body.listing);
    newlisting.owner=req.user._id;
     await newlisting.save();
     req.flash("success","New Listing Created!");
    // console.log(newlisting);
    res.redirect("/listings");

}
module.exports.editRender = async(req,res)=>{
    let {id} = req.params;
    const newlisting = await listing.findById(id);
    if(!newlisting){
        req.flash("error","This Listing Doesn't Exist.");
        res.redirect("/listings");
    }
    res.render("./listing/edit.ejs",{newlisting});
};
module.exports.updateListing = async(req,res)=>{
    // if(!req.body.listing){
    //     next(new ExpressError(400,"please send valid data"))
    // }

    let {id} = req.params;
    req.flash("success"," Listing Edited!");
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
};
module.exports.deleteListing =  async(req,res)=>{
    let {id} = req.params;
    req.flash("success","Listing Deleted Successfuly!");
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
}