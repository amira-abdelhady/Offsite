const uniqueValidator = require("mongoose-unique-validator"); 
const mongoose = require("mongoose");

const playgroundSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true },
    owner: { type: String, required: true },
    price: { type: Number, required: true }, 
    phone: { type: String, required: true,unique:true },
    pmHours: {type:[String],required: true},
    amHours: {type:[String],required: true},
    location: { type: String, required: true },
    imagePath:{ type: String, required: true,unique:true },
    ownerId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin", 
        required: true,
        unique:true
     }  
});
playgroundSchema.plugin(uniqueValidator);


module.exports = mongoose.model("Playground", playgroundSchema);
