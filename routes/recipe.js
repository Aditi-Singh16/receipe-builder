const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require('../middleware/requirelogin.js');
const Recipe = mongoose.model("Recipe");




router.post('/addrecipe', requirelogin, (req, res) => {
    console.log("id====", req.user)
    const { title, serves, time, ingred, steps, foodtype, cuisine_type, photo } = req.body
    if (!title || !steps || !photo || !serves || !ingred || !foodtype || !cuisine_type || !time) {
        return res.status(422).json({ error: "please fill all the fields" })
    }
    const recipe = new Recipe({
        title: req.body.title,
        steps: req.body.steps,
        serves: req.body.serves,
        cuisine_type: req.body.cuisine_type,
        time: req.body.time,
        Ingredients: req.body.ingred,
        foodtype: req.body.foodtype,
        photo: req.body.photo,
        postedby: req.user
    })
    recipe.save().then(doc => {
        res.json({ recipeposted: doc })
    }).catch(err => {
        console.log(err)
    })
})

//getting top 3 recipes
router.get('/toprecipe', requirelogin, (req, res) => {
    // const mydb = Recipe.db.name
    // const mycoll = Recipe.collection.collectionName

    Recipe.aggregate([
        {
            $project: {
                title: 1,
                steps: 1,
                serves: 1,
                cuisine_type: 1,
                time: 1,
                Ingredients: 1,
                foodtype: 1,
                postedby: 1,
                photo: 1,
                likes: {
                    $size: '$likes'
                },
            }
        },
        {
            $match: { // Filter documents that don't have likes >= 0
                likes: {
                    $gte: 0
                }
            }
        }
    ]).lookup({ from: 'users', localField: 'postedby', foreignField: '_id', as: 'usersnamee' })
        .then(doc => {
            if (!doc) {
                return res.status(422).json({ error: "Cannot find recipes" })
            }
            console.log(JSON.stringify(doc.usersnamee))
            res.json({ toprec: doc })


        })
})

router.put('/likerecipe', requirelogin, (req, res) => {

    Recipe.findByIdAndUpdate(req.body.recipeId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedby", "_id username").exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})

router.put('/unlikerecipe', requirelogin, (req, res) => {
    Recipe.findByIdAndUpdate(req.body.recipeId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedby", "_id username").exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})

router.put('/commentrecipe', requirelogin, (req, res) => {
    const comment = {
        text: req.body.text,
        postedby: {
            id: req.user._id,
            username: req.user.username
        }
    }
    Recipe.findByIdAndUpdate(req.body.recipeId, {
        $push: { comments: comment }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            console.log('comments', result)
            res.json(result)
        }
    })
})

router.get('/searchrecipe', requirelogin, (req, res) => {
    Recipe.find()
        .then(doc => {
            if (!doc) {
                console.log('no recipes found')
                res.json({ message: "No recipes found" })
            }
            res.json({ searchres: doc })
            console.log(doc)

        })
})

router.get('/getrecipes', requirelogin, (req, res) => {
    if (req.user) {
        Recipe.find({ postedby: req.user }, function (err, doc) {
            if (!doc) {
                console.log("no docs")
                res.json({ message: "You haven't added any recipe yet" })
            }
            res.json({ myrecipe: doc })
            console.log(doc)
        })
    }
})




module.exports = router