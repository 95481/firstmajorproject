const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingschema =new  mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        type : String,
        default : "https://unsplash.com/photos/back-of-woman-in-white-hat-on-the-beach-w8aoJZTRnyE",
        set :(v) => v===""?"https://unsplash.com/photos/back-of-woman-in-white-hat-on-the-beach-w8aoJZTRnyE":v,
    },
    price : Number,
    location : String,
    country : String ,
    reviews : [
        {
        type: Schema.Types.ObjectId,
         ref: 'Review' 
    }
]
});
listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: { $in : listing.reviews}})
    }
})
const listing = mongoose.model("listing",listingschema);
module.exports = listing;