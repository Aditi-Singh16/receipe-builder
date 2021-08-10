const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys')
// const requirelogin = require('../middleware/requirelogin.js');


router.post('/signup', (req, res) => {
    const { fullname, username, password, email } = req.body
    if (!fullname || !username || !password || !email) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    else {
        User.findOne({ email: email })
            .then(doc => {
                if (doc) {
                    return res.status(422).json({ error: "User with this email already exists" })
                }
                bcrypt.hash(password, 10)
                    .then(hashedpass => {
                        const user = new User({
                            fullname,
                            username,
                            password: hashedpass,
                            email
                        })
                        user.save()
                            .then(saveduser => {
                                res.status(200).json({ message: "saved successfully" })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }).catch((err) => {
                        console.log(err);
                    })

            }).catch((err) => {
                console.log(err);
            })
    }

})


router.route("/login").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('hiiiiiii')
    if (!username || !password) {
        return res.status(422).json({ error: "please add username and paswsword" })
    }
    User.findOne({ username: username })
        .then(doc => {
            if (!doc) {
                return res.status(422).json({ error: "Invalid username or password" });
            }
            bcrypt.compare(password, doc.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log("doc:", doc)
                        const token = jwt.sign({ _id: doc._id }, JWT_SECRET)
                        const { _id, username, email, profilePic } = doc;
                        res.json({ token, user: { _id, username, email, profilePic } })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid username or password" });
                    }
                })
                .catch(err => {
                    console.log('error is', err);
                })

        })
})

// router.route('/allusers').get((req,res)=>{
//     User.find()
//     .then(result=>{
//         if(!result){
//             return res.status(422).json({error:"Some error occurred!!"})
//         }else{
//             res.json(result)
//         }
//     }).catch(err=>{
//         console.log(err)
//     })
// })

module.exports = router