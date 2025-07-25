const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName : {
        type: String,
        required: true
    },
    email: {
        type:String,
        required:true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    profilePic:{
        type: String,
        required:true,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);