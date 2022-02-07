let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const ReModel= require("../models")
//Importing the ReviewModel
//const {ReviewModel} = require("../models");


//post a review on coffee drinks
router.post("/create", validateJWT, async (req,res) => {
    const {title, review, rating} = req.body.review;
    const {id} = req.premiumUser;
    const reviewEntry = {
        title,
        review, 
        rating, 
        customer: id
    }
    try{
        const newReview = await ReModel.ReviewModel.create(reviewEntry);
        res.status(200).json(newReview);
    } catch (err) {
        res.status(500).json({error: err});
    }
    ReviewModel.create(reviewEntry)
});

// get all reviews 
router.get("/", async (req, res) => {
    try {
        const reviews = await ReModel.ReviewModel.findAll();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});


//get review by review title

router.get("/reviewTitle", async (req, res) => {
    const {title} = req.params;
    try {
        const reviews = await ReModel.ReviewModel.findAll({
            where: {title: title}
        });
    } catch (err) {
        res.status(500).json({error:err});
    }
});

//get reviews by rating 
router.get("/rating", async (req, res) => {
    const {rating} = req.params;
    try {
        const ratings = await ReModel.ReviewModel.findAll({
            where: {rating: rating}
        });
    } catch (err) {
        res.status(500).json({error:err});
    }
});

//update review title
router.put("/edit/:reviewTitle", validateJWT, async (req,res) => {
    const {title} = req.body.review;
    const reviewId = req.params.reviewId;
    const premiumUser = req.premiumUser.id;

    const query = {
        where: {
            id: reviewId,
            customer: premiumUser
        }
    };


    const updatedReview = {
        title: title,

    };


    try {
        const update = await ReModel.ReviewModel.update(updatedReview, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

//delete review
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const customerId = req.premiumUser.id;
    const reviewId = req.params.id;

    try {
        const query = {
            where: {
                id: reviewId,
                customer: customerId
            }
        };

        await ReModel.ReviewModel.destroy(query);
        res.status(200).json({message: "Review removed. Create new reviews with GrindHouse. We love your feedback! "});
    } catch (err) {
        res.status(500).json({error: err});
    }

});








module.exports = router;
