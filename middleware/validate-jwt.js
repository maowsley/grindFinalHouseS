const jwt = require("jsonwebtoken");
//const {PremiumUserModel} = require("../models");
const UserModel = require("../models")

const validateJWT = async (req,res, next) => {
    if (req.method == "OPTIONS") {
        next();
    } else if (
        req.headers.authorization && 
        req.headers.authorization.includes("Bearer")
    ) {
        const {authorization} = req.headers;
        console.log("authorization -->", authorization);
        const payload = authorization
        ? jwt.verify(
            authorization.includes("Bearer")
            ? authorization.split(" ")[1]
            : authorization,
            process.env.JWT_SECRET
        )
        : undefined;

        console.log("payload -->", payload);

        if (payload) {
            let foundPremiumUser = await UserModel.PremiumUserModel.findOne({where: {id: payload.id}} );

            if (foundPremiumUser) {
                req.premiumUser = foundPremiumUser;
                next();
            } else {
                res.status(400).send({message: "Oh no, Not Authorized"});
            }
        } else {
            res.status(401).send({message: "Oops, Invalid token"});
        }
    } else {
        res.status(403).send({message: "Forbidden"});
    }
};

module.exports = validateJWT;