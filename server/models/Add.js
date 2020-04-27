const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    adds: {type:String},
})

module.exports = mongoose.model('add',schema)