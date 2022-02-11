const router = require("express").Router();
const {models} = require("../models")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateJWT = require("../middleware/validate-jwt");


//post a review on coffee drinks
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

//get all reviews with comments 

router.get('/reviews', (req,res) => {
    models.ReviewModel.findAll({
        include: [
            {
                model:models.CommentModel
            }
        ]
    })

    .then(review => {
        const resObj = review.map(review => {
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
                    comment: review.comment.map( comment => {


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
        res.json(resObj)
    })
 });

// get review by rating
router.get("/:rating", async(req,res) => {
   await models.ReviewModel.findAll({
       where: {
           rating: req.params.rating
       }
   })

   .then(review => res.status(200).json(review))
   .catch(err => res.json({
       error:err
   }));
});

//update review 
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
        .then(post => res.status(200).json(post, {message: "Review Updated"}))
        .catch(err => res.json({
            error: err
        }))
})

//delete review
router.delete("/delete/:review_id", validateJWT, async (req, res) => {
  await models.ReviewModel.destory({
      where: {
          id: this.params.review_id
      }
  })

  .then(review => res.status(200).json(review, {message: "Review Removed"}))
  .catch(err => res.json({
      error:err
  }))

});



module.exports = router;
