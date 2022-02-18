const mongoose = require("mongoose") //mongoose is the ODM used in communicating with mongodb

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
},
    {timestamps: true}
)

const User = new mongoose.model("User", userSchema)

module.exports = User