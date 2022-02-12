const router = require("express").Router();
const {models} = require("../models")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateJWT = require("../middleware/validate-jwt");
//const {model} = require('../config/db');

//post a review on coffee drinks works 
router.post("/create", validateJWT, async (req,res) => {

    const created_at = new Date();
    const newReview = req.body.review;


    await models.ReviewModel.create({
        user_id: req.user.id,
        user_username: req.user.username,
        title: newReview.title,
        content: newReview.content,
        rating: newReview.rating,
        created_at: created_at
    })

    .then(review => {
        res.json(review);
    })

    .catch(err => {
        res.json(err)
    })
});

//get all reviews with comments works

router.get('/',  async (req, res) => {
    await models.ReviewModel.findAll({
        include: [
            {
                 model:  models.CommentModel,
            }
        ]
    })

    .then(reviews => {
        const results = reviews?.map(review => {
            return Object.assign(
                {},
                {
                    review_id: review.id,
                    user_id: review.user_id,
                    user_username: review.user_username,
                    title: review.title,
                    content: review.content,
                    rating: review.rating,
                    created_at: review.created_at,
                    comment: reviews.comment?.map( comment => {


                        return Object.assign(
                            {},
                            {
                                comment_id: comment.id,
                                review_id: comment.review_id,
                                commenter_username: comment.commenter_username,
                                content: comment.content
                            }  
                        )
                    })
                }
            )
        })
        res.json(results)
    })
 });

// get review by rating works 
router.get("/rating/:rating", async(req,res) => {
   await models.ReviewModel.findAll({
       where: {
           rating: req.params.rating
       }
   })

   .then(reviews => res.status(200).json(reviews))
   .catch(err => res.json({
       error:err
   }));
});

//update review works
router.put('/edit/:review_id', validateJWT, async (req, res) => {

    const updated_at = new Date();
    const updateReview = req.body.review;


    await models.ReviewModel.update({
        title: updateReview.title,
        content: updateReview.content,
        rating: updateReview.rating,
        updated_at: updated_at

        
    }, {
        where: {
            id: req.params.review_id
        }
    })
        .then(review => res.status(200).json(review))
        .catch(err => res.json({
            error: err
        }))
})

//delete review works 
router.delete("/delete/:review_id", validateJWT, async (req, res) => {
  await models.ReviewModel.destroy({
      where: {
          id: req.params.review_id
      }
  })

  .then(review => res.status(200).json(review))
  .catch(err => res.json({
      error:err
  }))

});



module.exports = router;
