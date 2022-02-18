const mongoose = require("mongoose") 

const goalSchema = mongoose.Schema({ //every goal will be associated with a specific user. hence .. user field
    user: {
        type: mongoose.Schema.Types.ObjectId, //_id field is the object id
        required: true,
        ref: "User"
    },
    text: {
        type: String,
        required: [true, "Please add a text value"]
    }
},
    {timestamps: true}
)

const Goal = new mongoose.model("Goal", goalSchema)

module.exports = Goal
