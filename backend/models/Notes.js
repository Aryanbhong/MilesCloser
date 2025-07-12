const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    story: {
        type: String,
        require: true,
    },
    visitedLocation: {
        type:[String],
        default: [],
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    userId:{
        type: Schema.Types.ObjectId, 
        ref:"User",
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    imageUrl: {
        type:String,
        required: true
    },
    visitedDate: {
        type: Date,
        required: true
    },
    sharedWith: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  default: []
}],
});


module.exports = mongoose.model("Notes", NotesSchema)