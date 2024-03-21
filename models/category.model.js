const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true,versionKey:false});

module.exports = mongoose.model("Category",categorySchema);