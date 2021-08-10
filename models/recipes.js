const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
// const User= mongoose.model("User");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    steps: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    serves: {
        type: String,
        required: true
    },
    cuisine_type: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    Ingredients: {
        type: String,
        required: true
    },
    foodtype: {
        type: String,
        default: "none",
        required: true
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{
        text: String,
        postedby: { id: { type: ObjectId, ref: "User" }, username: { type: String, required: true } }
    }],
    postedby: {
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model("Recipe", recipeSchema);
