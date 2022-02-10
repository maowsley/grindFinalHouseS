require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");


const controllers = require("./controllers");




app.use(Express.json());

app.use("/user", controllers.userController)

app.use("/drinkNote", controllers.drinkNoteController);

app.use("/reviews", controllers.reviewController);

app.use("/comments", controllers.commentController);

app.use("/coffee", controllers.coffeesearchController);

try {
dbConnection.authenticate()
    .then(async () => await dbConnection.sync())
    //.then(async () => await dbConnection.sync({force:true}))

    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`);
        });
    });


} catch( err)
 {
     console.log('[Server]: server crashed');
     console.log(err);
 }

 