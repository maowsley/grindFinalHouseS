const { query } = require("express");
let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

//Importing the DrinkNote Model
const {DrinkNoteModel} = require("../models");


//post a drinkNote, local endpoints works 
router.post("/design", validateJWT, async (req,res) => {
    const {drinkName, drinkTemp, customDrink, drinkSize} = req.body.drinkNote;
    const {id} = req.premiumUser;
    const drinkNoteEntry = {
        drinkName,
        drinkSize, 
        drinkTemp, 
        customDrink,
        customer: id
    }
    try{
        const newDrinkNote = await DrinkNoteModel.create(drinkNoteEntry);
        res.status(200).json(newDrinkNote);
    } catch (err) {
        res.status(500).json({error: err});
    }
    DrinkNoteModel.create(drinkNoteEntry)
});


// get all drink notes. local endpoint works 
router.get("/", async (req, res) => {
    try {
        const notes = await DrinkNoteModel.findAll();
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});


//get drink notes by drink title 
router.get("/:drinkName", async (req, res) => {
    const {drinkName} = req.params;
    try {
        const results = await DrinkNoteModel.findAll({
            where: {drinkName: drinkName}
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});


//get drink notes by drink temp hot or cold 

router.get("/:drinkTemp", async (req,res) => {
    const {drinkTemp} = req.params;
    try {
        const temper = await DrinkNoteModel.findAll({
            where: {drinkTemp: drinkTemp}
        });
        res.status(200).json(temper);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});




//update drink note edit point wlocal endpoint works 
router.put("/edit/:drinkNoteId", validateJWT, async (req,res) => {
    const {drinkName, customDrink, drinkTemp, drinkSize} = req.body.drinkNote;
    const drinkNoteId = req.params.drinkNoteId;
    const premiumUser = req.premiumUser.id;

    const query = {
        where: {
            id: drinkNoteId,
            customer: premiumUser
        }
    };


    const updatedDrinkNote = {
        drinkName: drinkName,
        drinkTemp: drinkTemp,
        drinkSize: drinkSize,
        customDrink: customDrink
    };


    try {
        const update = await DrinkNoteModel.update(updatedDrinkNote, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({error: err});
    }
});


//delete drink note local endpoints work 
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const customerId = req.premiumUser.id;
    const drinkNoteId = req.params.id;

    try {
        const query = {
            where: {
                id: drinkNoteId,
                customer: customerId
            }
        };

        await DrinkNoteModel.destroy(query);
        res.status(200).json({message: "Drink note removed. Create new drinks with GrindHouse! "});
    } catch (err) {
        res.status(500).json({error: err});
    }

});




module.exports = router;