const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const player=new Schema({ 
    name:{
        type:String,
        required:true,
        unique:true
    }
    ,phone:{
        type:String,
        required:true,
        unique:true
    },
     password:{
        type:String,
        required:true
    },
    location:{
        type:String
        ,required:true
    }
    ,
    cart:{
        bookingIds: [{
                type:Schema.Types.ObjectId,
                ref:'booking'
            }] ,
        totalPrice:{
            type:Number
        } 
         /* ,
         quantity:{
            type:Number,
            required:true,
            defult:1
        } */
    }

});

module.exports=mongoose.model('Player',player); 