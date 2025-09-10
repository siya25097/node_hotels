const mongoose= require('mongoose');
const newItemSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        taste:{
            type:String,
            enum:['sweet','sour','spicy'],
            required:true,
            default:'spicy'
        },
        is_drink:{
            type:Boolean,
            default:false
        },
        ingredients:{
            type:[String],
            default:[]
        },
        num_sales:{
            type:Number,
            default:0
        }
});

const MenuItem=mongoose.model('MenuItem',newItemSchema);
module.exports=MenuItem;