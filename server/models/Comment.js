const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    comment: { // 房子问答问题
        type:String
    },
    publishTime: { // 评论时间
        type: String
    },
    userID: { // 评论用户
        type: String
    },
    houseID: {
        type: String
    }
})

module.exports = mongoose.model('comment',schema)