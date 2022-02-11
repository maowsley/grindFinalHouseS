const router = require("express").Router();
const {models} = require("../models")
//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcryptjs");
//const validateJWT = require("../middleware/validate-jwt");

//get all coffee
router.get('/', (req,res) => {

        try {
            const coffees = await models.CoffeeModel.findAll();
            res.status(200).json(coffees);
        } catch (err) {
            res.status(500).json({error: err});
        }

  
});

module.exports = router;