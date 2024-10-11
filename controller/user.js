const User = require("../models/user.js");
module.exports.signUp = async(req,res)=>{
    try {
let{username,email,password}=req.body;
const newuser = new User({email,username});
const registeredUser = await User.register(newuser,password);
req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","Welcome to Wanderlust!");
    res.redirect("/listings");
})}
catch(e){
    req.flash("error", e.message);
    res.redirect("/signup");
}

};
module.exports.logIn = (req,res)=>{
    res.render("user/login.ejs");
};
module.exports.postLogin = async(req,res)=>{
    req.flash("success","Welcome to Wanderlust!");
    let redirectUrl =  res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    };
    module.exports.logOut = (req,res,next)=>{
        req.logout((err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","you have been logged out!");
            res.redirect("/listings");
        })
    };