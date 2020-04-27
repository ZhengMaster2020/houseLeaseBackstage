module.exports = app => {

const User = require('../../models/User')
const House = require('../../models/House')
const Comment = require('../../models/Comment')

const jwt = require('jsonwebtoken')

app.use(require('cors')())

const SECRET = 'sjhsjgagsjgsutuwbjhgsjh1122398398984'

// 注册
app.post('/api/register',async(req,res)=>{
    console.log(req.body, 'req.body')
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
    })
    res.send(user)
})
// 登陆
app.post('/api/login',async(req,res)=>{
    const user = await User.findOne({
        username:req.body.username
    })
    console.log( req.body.username, 'name', user, 'user')
    if(!user){
        return res.status(200).send({
            message:'用户名不存在'
        })
    }
    // const isPasswordValid = require('bcrypt').compareSync(
    //     req.body.password,
    //     user.password,
    // )
    // if(!isPasswordValid){
    if(user.password !== req.body.password){
        return res.status(200).send({
            message:'密码不对'
        })
    }
    //生成token
    const jwt =require('jsonwebtoken')
    const token = jwt.sign({
        _id:String(user._id),
    },SECRET)
    res.send({
        user,
        token
    })
})

// 集合
const auth = async (req,res,next)=>{
    const raw = String(req.headers.authorization).split('').pop()
    const {id} = jwt.verify(raw, SECRET)
    const user = await User.findById(id)
    next()
}

// 文件上传
app.get('/api/profile',async(req,res) =>{
    const raw = String(req.headers.authorization).split(' ').pop()
    const {id} = jwt.verify(raw, SECRET)
    const user = await User.findById(id)
    res.send(user)
})

// 获取用户信息
app.get('/api/landlord', async(req, res) => {
    const users = await User.find({ userType: '房东' })
    console.log(users[0], 'users')
    if (!users.length) return res.status(200).send({ message:'尚无房东推荐' })
    res.send(users)
})

// 获取最新发布的房源信息
app.get('/api/publish', async(req, res) => {
    const houses = await House.find({}).sort({'_id': -1})
    console.log(houses, 'house')
    res.send(houses)
})

// 根据id获房源信息
app.get('/api/house/:id', async(req, res) => {
    console.log('params', req.params)
    const houses = await House.findById({ _id: req.params.id })
    console.log(houses, 'house')
    res.send(houses)
})

// 根据地区查找房子
app.get('/api/area/:area', async(req, res) => {
    console.log('params', req.params)
    const area = req.params.area
    if (area === '全部') return res.send(await House.find())
    const houses = await House.find({ city: area })
    console.log(houses, 'house')
    res.send(houses)
})

// 根据关键字进行查询房子
app.get('/api/house/search/:keyword', async(req, res) => {
    console.log('keyword', req.params)
    const { keyword } = req.params
    const filter = new RegExp(keyword, 'i') // 利用正表达式实现 标题以及特色字段的模糊查询
    const houses = await House.find({ $or:[{ feature: filter }, {title: filter }] })
    res.send(houses)
    console.log(houses, 'house')
})

app.post('/api/house/update', async(req, res) => {
    console.log('req.params', req.body)
    const { houseID, commentID } = req.body
    try {
        const house = await House.findByIdAndUpdate({ _id: houseID }, { $addToSet: { commentID } })
        console.log('house', house)
        res.send(house)
    } catch (err) {
        console.log(err, 'err')
    }
})

// 根据用户id查询用户信息
app.get('/api/users/:id',async(req,res)=>{
    const user = await User.findById({ _id: req.params.id })
    console.log(user, 'user')
    if (!user) return  res.status(200).send({ message:'查询尚无房东' })
    res.send(user)
})

// 根据评论id查询回答信息
app.get('/api/comment/:id', async(req,res)=>{
    console.log('req.params', req.params)
    const { id } = req.params
    const comments = await Comment.find({
        _id: {$in: id.split(',')}
    }).sort({ _id: -1 }).limit(4)
    res.send(comments)
    console.log(comments, 'comment')
})

// 新增评论内容
app.post('/api/comment', async(req, res) => {
    console.log(req.body, 'body')
    const comment = await Comment.create(req.body)
    console.log(comment, 'comment')
    res.send(comment)
})

}