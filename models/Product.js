const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
    prodName : {
        type : String,
        required : [true, "Product Name required."]
    },
    prodDesc : {
        type : String,
        required : [true, "Product Description required."]
    },
    prodPrice : {
        type : Number,
        required : [true, "Product price required."]
    },
    prodAvail : {
        type : Boolean,
        default : true,
    },
    prodCreatedOn : {
        type : Date,
        default : new Date()
    },
})


const Product = mongoose.model('Product', prodSchema);

module.exports = Product;