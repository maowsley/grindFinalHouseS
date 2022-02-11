const router = require("express").Router();
const {models} = require("../models");
const validateJWT = require("../middleware/validate-jwt");


//post a comment to a review
router.post("/create", validateJWT, async (req,res) => {


    const created_at = new Date();
    const newComment = req.body.comment;

    await models.CommentModel.create({
        review_id: newComment.review_id,
        user_id: req.user.id,
        content: newComment.comment,
        commenter_username: req.user.username,
        created_at: created_at
    })

    .then(comment => {
        res.json(comment);
    });
});

//update comment
router.put('/edit/comment_id', validateJWT, async (req, res) => {
    
    const updated_at = new Date();
    const updateComment = req.body.review;

    models.CommentModel.update({
        content: updateComment.content,
        update_at: updated_at
    }, {
        where: {
            id: req.params.comment_id
        }
    })

    .then(comment => res.status(200).json(comment, {message: "Comment Updated"}))
    .catch( err => res.json({
        error: err
    }))
});

// delete comment
router.delete('/delete/:comment_id', validateJWT, async (req,res) => {
    models.CommentModel.destory({
        where: {
            id: req.params.comment_id
        }
    })

    .then(comment => res.status(200).json(comment, {message: "Comment Removed"}))
    .catch(err => res.json({
        error: err
    }))
});

// get comment
router.get('/comment/review_id', async (req,res) => {
   await  models.CommentModel.findAll({
        where: {
            review_id: req.params.review_id
        }
    })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.json({
        err:err
    }))
});


module.exports = router;