const router = require("express").Router();
const {models} = require("../models")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateJWT = require("../middleware/validate-jwt");

// post drink note
router.post('/create', validateJWT,  async (req,res) => {
    const newNote = req.body.drinkNote;


     await models.DrinkNoteModel.create({
        user_id: req.user.id,
        user_username: req.user.username,
        drinkName: newNote.drinkName,
        drinkTemp: newNote.drinkTemp,
        content: newNote.content,
        drinkSize: newNote.drinkSize
    })

    .then( drinkNote => {
        res.json(drinkNote);
    })
    .catch(err => {
        res.json(err)
    })
});

//update note 
router.put('edit/:drinkNote_id', validateJWT, async (req, res) => {
    
    const updateNote = req.body.drinkNote;


    await models.DrinkNoteModel.update({
        drinkName: updateNote.drinkName,
        drinkTemp: updateNote.drinkTemp,
        content: updateNote.content,
        drinkSize: updateNote.drinkSize


    }, { 
        where: {
        id: req.params.drinkNote_id
    }

    })

        .then(drinkNote => res.status(200).json(drinkNote, {message: "Coffee Note Updated"}))
        .catch(err => res.json ({
            error:err
    }))
        
});

//delete note 
router.delete('/delete/:drinkNote_id', validateJWT, async (req, res) => {
    await models.DrinkNoteModel.destory({
        where: {
            id: req.params.drinkNote_id
        }
    })

    .then(drinkNote => res.status(200).json(drinkNote, {message: "Coffee Note Removed"}))
    .catch(err => res.json({
        error:err
    }))
});


//get all by drink temp
router.get('/:drinkTemp', (req, res) => {
    models.DrinkNoteModel.findAll({
        where: {
            drinkTemp: req.params.drinkTemp
        }
    })

    .then(drinkNote => res.status(200).json(drinkNote))
    .catch(err => res.json({
        error: err
    }))
});

//get all by drink size
router.get("/drinkSize", (req,res) => {
    models.DrinkNoteModel.findAll({
        where: {
            drinkSize: req.params.drinkSize
        }
    })
    .then(drinkNote => res.status(200).json(drinkNote))
    .catch(err => res.json({
        error: err
    }))
});

module.exports = router;