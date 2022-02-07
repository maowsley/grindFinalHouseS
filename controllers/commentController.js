let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const CoModel = require("../models")
//Importing the DrinkNote Model
//const {CommentModel} = require("../models");


//post a comment to a review
router.post("/create", validateJWT, async (req,res) => {
    const {reply} = req.body.comment;
    const {id} = req.premiumUser;
    const commentEntry = {
        reply,
        customer: id
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
router.get("/myComments", async (req, res) => {
    const {id} = req.premiumUser;
    try {
        const userComments = await CoModel.CommentModel.findAll({
            where: {customer: id}
        });
        res.status(200).json(userComments);
    } catch (err) {
        res.status(500).json({error:err});
    }
});


//delete review comments
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const customerId = req.premiumUser.id;
    const commentId = req.params.id;

    try {
        const query = {
            where: {
                id: commentId,
                customer: customerId
            }
        };

        await CoModel.CommentModel.destroy(query);
        res.status(200).json({message: "Comment removed. Create new comments with GrindHouse! "});
    } catch (err) {
        res.status(500).json({error: err});
    }

});









module.exports = router;