const mongoose=require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema=mongoose.Schema;
const adminSchema=new Schema({ 
    phone:{
        type:String,
        required:true,
        unique:true
    },
     password:{
        type:String,
        required:true
    } 
});

adminSchema.plugin(uniqueValidator);

module.exports=mongoose.model('Admin',adminSchema); 