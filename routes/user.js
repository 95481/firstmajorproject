const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utility/wrapAsync");
const {saveRedirecturl} = require("../middleware.js");
const controlUser = require("../controller/user.js");
router.route("/signup")
.get((req,res)=>{
    res.render("user/signup.ejs");
})
.post(wrapAsync(controlUser.signUp));
router.route("/login")
.get(controlUser.logIn)
.post(saveRedirecturl,passport.authenticate('local',{
    failureRedirect:"/login",
    failureFlash : true,
}),controlUser.postLogin);
router.get("/logout",controlUser.logOut);
module.exports = router;