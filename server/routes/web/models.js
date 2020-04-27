const mongoose = require("mongoose")
mongoose.set('useCreateIndex', true)
// mongoose.connect('mongodb://houseadmin:123456@127.0.0.1:27017/house', {
mongoose.connect('mongodb://127.0.0.1:27017/house', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
const User = mongoose.model('user', new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    // set(val) {
    //   return require('bcrypt').hashSync(val, 10)
    // },
  }
}))
module.exports = {
  User
}