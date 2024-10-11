const express = require("express");
const router = express.Router();
const wrapAsync = require("../utility/wrapAsync.js");
const ExpressError = require("../utility/expressError.js");
const {listingschema,reviewSchema} = require("../schema.js");
const listing = require("../models/listing.js");
const {isLoggedIn,isOwner} = require("../middleware.js");
const listingController = require("../controller/listing.js");
// const multer  = require('multer');
// const storage = require("../cloudConfig.js");
// const upload = multer({ storage});
const validatelisting = (req,res,next)=>{
    let {error}=  listingschema.validate(req.body);
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
     throw new ExpressError(500 , errmsg);
    }
    next();
}
// const {listingschema,reviewSchema} = require("./schema.js");
router.route("/")
.get(wrapAsync(listingController.index))
.post(validatelisting,wrapAsync(listingController.createListing));
// .post(upload.single('listing[image]') ,(req,res)=>{
//     res.send(req.file);
// })
router.get("/new",isLoggedIn, listingController.renderNew);
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,validatelisting,listingController.updateListing)
.delete(isOwner,wrapAsync(listingController.deleteListing));
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editRender));
module.exports=router;