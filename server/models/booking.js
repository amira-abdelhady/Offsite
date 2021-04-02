const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const booking=new Schema({
    totalPrice:{
        type:Number
    },
    playerId:{
            type:Schema.Types.ObjectId,
            ref:'Player',
            required:true
    },
    playgroundId:{
            type:Schema.Types.ObjectId,
            ref:'Playground',
            required:true
    },
    bookingDate:{
        type:String,
        required:true
    },
    bookingPmHours: {type:[String]},
    bookingAmHours: {type:[String]}, 
    reservationDate:{
        type:String,
        required:true
    },
    statusOfPayment:{
        type:Boolean,
        required:true,
        default:false
    }

});

module.exports=mongoose.model('booking',booking); 