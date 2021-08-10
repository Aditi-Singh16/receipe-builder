const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const { URL } = require('./config/keys')
app.use(cors())



//connect to mongoose
mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

require('./models/user')
require('./models/recipes')
require('./models/cure')
app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/recipe'))
app.use(require('./routes/cure'))

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
}

app.listen(process.env.PORT || 5000, function (req, res) {
    console.log("express server is running on 5000");
})