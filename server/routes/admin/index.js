const mongoose = require('mongoose')
module.exports = app => {
  const express = require('express')
  // express子路由
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const router = express.Router({
    mergeParams: true
  })
  
  // multer模块是负责文件和图片上传
  const multer = require('multer')
  // 上传到uploads文件夹
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  
  const AdminUser = require('../../models/AdminUser')
  const User = require('../../models/User')
  const House = require('../../models/House')
  
  // 创建
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    console.log(model, 'model')
    res.send(model)
  })

  // 更新
  router.put('/:id', async (req, res) => {
    console.log(req.params.id, req.body, 'gengxin')
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    // if (req.Model.modelName === 'comment')
    //  {
    //   const id = req.params.id
    //   const house = await House.update({_id: id.split(',')[0]}, { $pullAll: { commentID: [id.split(',')[1]] } })
    //   console.log(house, 'housessss')
    // }
    res.send({
      success: true
    })
  })

  //显示
  router.get('/', async (req, res) => {
    const queryOptions = {}
    console.log(req.Model.modelName, 'name')
    if (req.Model.modelName === 'Add') {
      queryOptions.populate = 'parent '
    }
    // const items = await req.Model.find().setOptions(queryOptions).limit(10)
    const items = await req.Model.find()
    res.send(items)
  })

  // 编辑
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 挂载路由
  // 动态路由
  // 动态参数
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    // inflection包专门处理大小写，格式，数字大小转换
    // 取出资源的名称再转成模型的名称
    const modelName = require('inflection').classify(req.params.resource)
    // 转成模型的名称后再引入进来
    // req就是给请求对象挂载一个model
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  // // 新增用户
  // app.post('/admin/api/rest/users', async (req, res) => {
  //   const model = await User.create(req.body)
  //   console.log(model, 'model')
  //   console.log(req.body, 'body')
  //   res.send(model)
  // })

  // 上传图片接口
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 管理员登录
  app.post('/admin/api/login', async (req, res) => {
    console.log(req.body, 'body')
    const { username, password, userType } = req.body
    let user
    // 1.根据用户名找用户
    if(userType === 'admin')  user = await AdminUser.findOne({ username, password})
    if(userType === 'landlord') user = await User.findOne({ username, password, userType: '房东' })
    console.log(user, 'user')
    assert(user, 200, '用户不存在')
    // 2.校验密码
    assert(user.password === password, 200, '密码错误')
    // const isValid = require('bcrypt').compareSync(password, user.password)
    // assert(isValid, 200, '密码错误')
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token, user })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}