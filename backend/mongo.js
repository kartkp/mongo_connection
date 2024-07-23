const mongoose = require("mongoose");
const dotenv = require('dotenv');
require('dotenv').config();
mongoose.connect(process.env.MONGO_KEY)

    .then(() => {
        console.log("mongoDB connected");
    })

    .catch(() => {
        console.log('failed');
    })

const newSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const collection = mongoose.model("collection", newSchema)

module.exports = collection
