const { query } = require("express");
let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const DrinkModel = require("../models")
//const {UniqueConstraintError} = require("sequelize/lib/errors");
//Importing the DrinkNote Model
//const {DrinkNoteModel} = require("../models");


//post a drinkNote, local endpoints works!!!
router.post("/design", validateJWT, async (req,res) => {
    const {drinkName, drinkTemp, customDrink, drinkSize} = req.body.drinkNote;
    const {id} = req.User;
    const drinkNoteEntry = {
        drinkName,
        drinkSize, 
        drinkTemp, 
        customDrink,
        customer: id
    }
    try{
        const newDrinkNote = await DrinkModel.DrinkNoteModel.create(drinkNoteEntry);
        res.status(200).json(newDrinkNote);
    } catch (err) {
        
        res.status(500).json({error: err});
    }
    DrinkModel.DrinkNoteModel.create(drinkNoteEntry)
});


// get all drink notes. local endpoint works!!!
router.get("/", async (req, res) => {
    try {
        const notes = await DrinkModel.DrinkNoteModel.findAll();
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});


//get drink notes by drink title works!!!
router.get("/:drinkName", async (req, res) => {
    const {drinkName} = req.params;
    try {
        const results = await DrinkModel.DrinkNoteModel.findAll({
            where: {drinkName: drinkName}
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});


/*get drink notes by drink temp hot or cold 

router.get("/:drinkSize", async (req,res) => {
    const {drinkSize} = req.params;
    try {
        const size = await DrinkModel.DrinkNoteModel.findAll({
            where: {drinkSize: drinkSize}
        });
        res.status(200).json(size);
    } catch (err) {
        res.status(500).json({ error: err});
    }
}); */




//update drink note edit point local endpoint works!!!!
router.put("/:drinkNoteId", validateJWT, async (req,res) => {
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
        const update = await DrinkModel.DrinkNoteModel.update(updatedDrinkNote, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({error: err});
    }
});


//delete drink note local endpoints work!!
router.delete("/:id", validateJWT, async (req, res) => {
    const customerId = req.premiumUser.id;
    const drinkNoteId = req.params.id;

    try {
        const query = {
            where: {
                id: drinkNoteId,
                customer: customerId
            }
        };

        await DrinkModel.DrinkNoteModel.destroy(query);
        res.status(200).json({message: "Drink note removed. Create new coffee notes with GrindHouse! "});
    } catch (err) {
        res.status(500).json({error: err});
    }

});




module.exports = router;