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

try {
    dbConnection 
        .authenticate()
        .then(async() => await dbConnection.sync({force: true}))
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`[SERVER]: App is listening on ${process.env.PORT}`);
            });
        });
} catch (err) {
    console.log('[SERVER]: Server crashed');
    console.log(err);
}


