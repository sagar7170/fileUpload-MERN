const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    imgName:{
        type:String
    },
    image:{
        type: String
    }
})

module.exports = mongoose.model('images',schema);