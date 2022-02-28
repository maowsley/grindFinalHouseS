const router = require("express").Router();
const {models} = require("../models")
const {UniqueConstraintError} = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Register new user endpoint works 


router.post("/signup", async (req,res) => {
    
    
    let {username, password, role} = req.body.user;
    
    try{
       
        let User = await models.UserModel.create({
            username,
            password: bcrypt.hashSync(password, 10),
            
            
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

        res.status(201).json({
            message: "Customer registerd. Welcome to the GrindHouse!",
            user: User,
            sessionToken: token
        });
      
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Oops, username already in use. Please try again and join the GrindHouse Family",
        });
    } else {
        console.log(err);
        res.status(500).json({
            message: err
        });
    }
}

});

router.get('./userinfo', async (req,res) => {
    try {
        await models.UserModel.findAll({
            include: [
                {
                    model: models.DrinkNoteModel,
                   include: [
                       {
                           model: models.ReviewModel
                       }
                   ] 
                }
            ]
        })
        .then(
            users => {
                res.status(200).json({
                    users: users
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to retreive users: ${err}`
        });
    };
});






//Login in User endpoint work 

router.post("/login", async (req,res ) => {
    let {username, password} = req.body.user;
   
    try{
        const loginUser = await models.UserModel.findOne({
           where: {
               username: username,
           },
        });
        
        
        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if(passwordComparison) {
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 2});

                res.status(200).json({
                    loginUser: loginUser,
                    message: "Welcome back to the GrindHouse!",
                    sessionToken: token
                    
                });
                console.log(message);
                
            } else {
                res.status(401).json({
                message: "Oops, incorrect username or password. Please try again."
                })
            }


            } else  {
                res.status(401).json({
                message: "Oops, incorrect username or password. Please try again."
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Oh no, failed to log in. Please try again."
            });
        }
    });



module.exports = router;

