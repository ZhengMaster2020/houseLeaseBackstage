module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.set('useCreateIndex', true)
  // mongoose.connect('mongodb://houseadmin:123456@127.0.0.1:27017/house', {
  mongoose.connect('mongodb://127.0.0.1:27017/house', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  }, err => {
    if (err) {
      console.log('MongoDB连接出错', err)
    } else {
      console.log('MongoDB连接成功')
    }
  })
}