const router = require("express").Router();
const {models} = require("../models")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateJWT = require("../middleware/validate-jwt");


// post drink note works
router.post('/create', validateJWT,  async (req,res) => {
    const newNote = req.body.drinkNote;


     await models.DrinkNoteModel.create({
        user_id: req.user.id,
        user_username: req.user.username,
        drinkName: newNote.drinkName,
        drinkTemp: newNote.drinkTemp,
        content: newNote.content,
        size: newNote.size
    })

    .then( drinkNote => {
        res.json(drinkNote);
    })
    .catch(err => {
        res.json(err)
    })
});

//update note works 
router.put('/edit/:drinkNote_id', validateJWT, async (req, res) => {
    
    const updateNote = req.body.drinkNote;


    await models.DrinkNoteModel.update({
        drinkName: updateNote.drinkName,
        drinkTemp: updateNote.drinkTemp,
        content: updateNote.content,
        drinkSize: updateNote.drinkSize

    }, {
       
            where: {
                id:req.params.drinkNote_id
                
            }
        
    })
     

        .then(drinkNote => res.status(200).json(drinkNote))
        .catch(err => res.json ({
            error:err
    }))
        
});

//delete note works
router.delete('/delete/:drinkNote_id', validateJWT, async (req, res) => {
    await models.DrinkNoteModel.destroy({
        where: {
            id: req.params.drinkNote_id
        }
    })

    .then(drinkNote => res.status(200).json(drinkNote))
    .catch(err => res.json({
        error:err
    }))
});


//get all by drink temp works
router.get("/temp/:drinkTemp", async (req, res) => {
    await models.DrinkNoteModel.findAll({
        where: {
            drinkTemp: req.params.drinkTemp
        }
    })

    .then(drinkNote => res.status(200).json(drinkNote))
    .catch(err => res.json({
        error: err
    }))
}); 

//get all by drink size works
router.get("/size/:size", async(req,res) => {
  await models.DrinkNoteModel.findAll({
      where: {
          size: req.params.size
      }
  })

  .then(drinkNote => res.status(200).json(drinkNote))
  .catch(err => res.json({
      error: err
  }))
});


//get all drink notes 
router.get("getAll/", async(req,res) => {
    try {
        const allNotes = await models.DrinkNoteModel.findAll();
        res.status(200).json(allNotes);
    } catch (err) {
        res.status(500).json({error: err});
    }
});
module.exports = router;