const { ref } = require('joi');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = require('./user.js');
const reviewShema = new Schema({
    comment:String,
    rating:
    {
        type:Number,
        min:1,
        max:5
    },
    createdAt:
    {
        type:Date,
        default:Date.now()
    },
    author:
    {
        type:Schema.Types.ObjectId,
        ref:'User',
    }
});

module.exports = mongoose.model('Review',reviewShema);