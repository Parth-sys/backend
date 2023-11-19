const mongoose = require('mongoose');




const clothSchema = mongoose.Schema({

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
        collection:"Clothes"
    }
    
    );


module.exports = mongoose.model("Clothes",clothSchema)