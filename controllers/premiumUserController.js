const router = require("express").Router();
const {PremiumUserModel} = require("../models");
const {UniqueConstraintError} = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Register new user endpoint

router.post("/register", async(req, res) => {
    
    let {email, password} = req.body.premiumUser;
    try {
    const premiumUser = await PremiumUserModel.create({
        email,
        password: bcrypt.hashSync(password, 13),
    });

    let token = jwt.sign({id: premiumUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

    res.status(201).json({
        message: "Hello, From GrindHouse. You have successfully registered as a Premium Customer",
        premiumUser: premiumUser,
        sessionToken: token
    });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Oops, Email already in use. Please try again and join the GrindHouse Family",
            });
        } else {
        res.status(500).json({
            message: "Oh No, failed to register Premium User. Please try again and join the GrindHouse Family",
        });
    }
    }
});


//Login in Premium User endpoint

router.post("/login", async (req,res ) => {
    let {email, password} = req.body.premiumUser;

    try {
    const loginPremiumUser = await PremiumUserModel.findOne({
        where: {
            email:email,
        },
    });

    
    if (loginPremiumUser) {

        let passwordComparison = await bcrypt.compare(password, loginPremiumUser.password);

        if(passwordComparison) {
            let token = jwt.sign({id: loginPremiumUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 2});


            res.status(200).json({
                loginPremiumUser: loginPremiumUser,
                message: "Welcome back to the GrindHouse!",
                sessionToken: token
            });

        } else {
            res.status(401).json({
                message: "Oops, incorrect email or password. Please try again."
            })
        }

    } else {
        res.status(401).json({
            message: "Oops, incorrect email or password. Please try again."
        });
    }
} catch (error) {
    res.status(500).json({
        message: "Oh no, failed to log in. Please try again."
    })
}

});


    



module.exports = router;