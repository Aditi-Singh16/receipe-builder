const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;


const cureSchema = new mongoose.Schema({
    disease: {
        type: String,
        required: true
    },
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
    time: {
        type: String,
        required: true
    },
    Ingredients: {
        type: String,
        required: true
    },
    likes: [{ type: ObjectId, ref: "User" }],

})

mongoose.model("Cure", cureSchema);