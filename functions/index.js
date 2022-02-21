const functions = require("firebase-functions");

require("dotenv").config();



const express = require('express');
const dbConnection = require('./db');
const controllers = require('./controllers');
const middleware = require('./middleware');

// instantiation
const app = express();

// middleware
app.use(middleware.CORS);
app.use(express.json());


app.use("/user", controllers.userController)

app.use("/drinkNote", controllers.drinkNoteController);

app.use("/reviews", controllers.reviewController);


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