const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require('../middleware/requirelogin.js');
const Cure = mongoose.model("Cure")


//disease recipes
router.get('/curerecipe', requirelogin, (req, res) => {
    console.log('hi')
    Cure.find()
        .then(doc => {
            if (!doc) {
                console.log('no recipes found')
                res.json({ message: "No recipes found" })
            }
            console.log('cureres')
            console.log(doc)
            res.json({ cureres: doc })
        }).catch(err => {
            console.log('error in db')
        })
})

module.exports = router