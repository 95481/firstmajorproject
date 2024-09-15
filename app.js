const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utility/wrapAsync.js");
const ExpressError = require("./utility/expressError.js");
const {listingschema,reviewSchema} = require("./schema.js");
const  Review = require("./models/review.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js")
main()
.then((res)=>{
    // console.log(res);
    console.log("connection successful");
}
)
.catch((err)=>console.log(err));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
};
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
// app.get("/testListing",(req,res)=>{
//     let samplelistening = new listing ({
//         title : "my new bunglaw",
//         discription : "one side beach",
//         price : 10000000,
//         location : "Mumbai",
//         country : " India",
//     })
//     samplelistening.save();
//     res.send("connection successful");
// }

// );
const validatelisting = (req,res,next)=>{
    let {error}=  listingschema.validate(req.body);
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
     throw new ExpressError(500 , errmsg);
    }
    next();
}
const revschema = (req,res,next)=>{
    let {error}=  reviewSchema.validate(req.body);
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
     throw new ExpressError(500 , errmsg);
    }
    next();
} 
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews)
app.all("*",(req,res,next)=>{
next(new ExpressError(404,"Page Not Found!"));
})
app.use((err,req,res,next)=>{
    let {statuscode=500,message="something went wrong"}=err;
    res.status(statuscode).render("alert.ejs",{err});
    // res.status(statuscode).send(message);
});
app.listen(8080,()=>{
    console.log("you are listening to the port 8080");
});