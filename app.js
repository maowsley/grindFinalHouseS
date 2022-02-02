require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");

app.use(Express.json());

app.use("/premiumUser", controllers.premiumUserController);

app.use("/drinkNote", controllers.drinkNoteController);

app.use("/reviews", controllers.reviewController);

app.use("/comments", controllers.reviewController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });
     


