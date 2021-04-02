const mongoose=require('mongoose') 
require('mongoose-double')(mongoose)
const SchemaTypes=mongoose.Schema.Types;
const Schema=mongoose.Schema;


const egycity=new Schema({ 
    city:{
        type:String,  
    },
    lat:{
        type:SchemaTypes.Double,
    },
    lng:{
        type:SchemaTypes.Double 
    } 

},{collection:"egycity"} );

module.exports=mongoose.model('Egycity',egycity); 