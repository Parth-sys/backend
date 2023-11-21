const mongoose = require('mongoose');


const OrderSchema = mongoose.Schema({

    name:{type:String,require},
    image:{type:String,require},
    quantity:{type:String,require},
    varient:{type:String,require},
    Price: {type:String,require}
    
},
    {
        timestamps: true

    },
    {
        collection:"Order"
    }
    
    );


module.exports = mongoose.model("Order",OrderSchema)