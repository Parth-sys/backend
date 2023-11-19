const mongoose = require('mongoose');




const mobileSchema = mongoose.Schema({

    name: String,
    varients:[],
    Prices: [],
    Category: { type:String,require}, 
    image:  {type:String,require},
    description:{type: String,require}
},
    {
        timestamps: true

    },
    {
        collection:"mobiles"
    }
    
    );


module.exports = mongoose.model("mobiles",mobileSchema)