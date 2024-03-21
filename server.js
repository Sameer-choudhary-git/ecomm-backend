const express = require('express');
const mongoose = require('mongoose');
const server_config = require("./configs/server.config")
const db_config = require('./configs/db.config')
const app = express();
const user_model = require("./models/user.model")
const bcrypt = require('bcrypt');

app.use(express.json());

mongoose.connect(db_config.DB_URL);
const db = mongoose.connection;

db.on('error', () => {
    console.log("error while connecting database")
});
db.once('open', () => {
    console.log("DB connected");
    inLogic();
});

async function inLogic() {
    let user = await user_model.findOne({userId:"admin"});
    if (user) {
        console.log("admin already exist!");
        return;
    }
    try {
        user = await user_model.create({
            name: "Sameer",
            userId: "admin",
            email: "admin@gmai.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("sameer@123", 8)
        });
        console.log("user created ", user);
    } catch (err) {
        console.log("error while creating admin ", err);
    }
}

//stich the route to the server
require("./routes/auth.route")(app);
require("./routes/category.route")(app);












// start the server
app.listen(server_config.PORT, () => {
    console.log("sevrer started at: ", server_config.PORT)
})