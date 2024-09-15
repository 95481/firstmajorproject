const Joi = require('joi');

module.exports.listingschema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
         description : Joi.string().required(),
         price : Joi.string().required().min(0),
         location:Joi.string().required(),
         country :Joi.string().required(),
         image:Joi.string().allow("",null)
         })
});
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating : Joi.number().required().max(5).min(1),
        comment : Joi.string().required()
    }).required()
})