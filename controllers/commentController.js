let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const CoModel = require("../models")
//const {UniqueConstraintError} = require("sequelize/lib/errors");
//Importing the DrinkNote Model
//const {CommentModel} = require("../models");


//post a comment to a review
router.post("/create", validateJWT, async (req,res) => {
    let {reply} = req.body.comment;
    let {id} = req.review;
    let commentEntry = {
        reply,
        commentId: id
    }
    try{
        const newComment = await CoModel.CommentModel.create(commentEntry);
        res.status(200).json(newComment);
    } catch (err) {
       
        
        res.status(500).json({error: err});
    }
    CommentModel.create(commentEntry)
});


// get comments by customer 
router.get("/myComments", validateJWT, async (req, res) => {
    let {id} = req.review;
    try {
        const userComments = await CoModel.CommentModel.findAll({
            where: {commentId: id}
        });
        res.status(200).json(userComments);
    } catch (err) {
        res.status(500).json({error:err});
    }
});

//get all comments 
router.get("/", async (req,res) => {
    try {
        const re = await CoModel.CommentModel.findAll();
        res.status(200).json(re);
    } catch (err) {
        res.status(500).json({error: err});
    }
});


//delete review comments
router.delete("/delete/:id", validateJWT,  async (req, res) => {
    let customerId = req.review.id;
    let commentId = req.params.id;

    try {
        const query = {
            where: {
                id: customerId,
                customer: commentId
            }
        };

        await CoModel.CommentModel.destroy(query);
        res.status(200).json({message: "Comment removed. Create new comments with GrindHouse! "});
    } catch (err) {
        res.status(500).json({error: err});
    }

});









module.exports = router;