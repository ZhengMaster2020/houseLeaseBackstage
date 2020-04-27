const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: {
        type: String
    }, //标题
    city: {
        type: String
    }, //城市
    avatar: {
        type: Array
    }, //图片
    img: {
        type: String
    }, //图片
    icon: {
        type: String
    }, //图片
    price: {
        type: String
    }, //价格
    time: {
        type: String
    }, //发布时间
    add: {
        type: String
    }, //信息    
    type: {
        type: String
    }, //房屋类型
    parent: {
        type: String
    }, //类型   
    status: {
        type: String
    }, //销售状态
    comment: {
        type: String
    }, //评论
    phone: {
        type: String
    }, //电话号码
    areaNum: {
        type: Number
    }, // 面积
    roomNum: {
        type: Number
    }, // 房间数
    livingRoomNum: {
        type: Number
    }, //客厅数
    toiletNum: {
        type: Number
    }, //厕所
    saleSituation: {
        type: String
    }, //租售情况
    garden: {
        type: Boolean
    }, //是否有花园    
    feature: {
        type: String
    }, //房子特性
    sellingPoint: {
        type: String
    }, // 卖点
    userID: {
        type: String
    }, // 用户id    
    commentID: {
        type: Array
    }, // 房子评论id
})

module.exports = mongoose.model('house', schema)