const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String
    // 用户名
  },
  avatar: {
    type: String
    // 头像
  },
  userType: {
    type: String
    // 用户类型
  },
  userDesc: {
    type: String,
    // 用户描述信息
  },
  email: {
    type: String
    // 邮箱
  },
  phone: {
    type: String
    // 手机号码
  },
  address: {
    type: String
  }, // 房东地址信息
  password: {
    type: String,
    // select: false,
    // set(val) {
    //   return require('bcrypt').hashSync(val, 10)
    // }
  },
  serviceNum: {
    type: Number
  }, // 服务分数
  houseQualityNum: {
    type: Number
  }, //  房源质量分数
  appraisalNum: {
    type: Number
  },// 评价分数
  houseID: {
    type: String,
  } // 已经发布房源id
})

module.exports = mongoose.model('user', schema)