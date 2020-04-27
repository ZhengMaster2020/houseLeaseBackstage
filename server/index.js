const express = require('express')
// 引入express模块

const app = express()
// 声明express

app.set('secret', 'i2u34y12oi3u4y8')

app.use(express.json())
// 允许express接收json格式的数据

app.use('/uploads',express.static(__dirname +'/uploads'))
//静态文件托管

app.use(require('cors')())
// 允许express跨域

// require('./routes/admin/add')(app)
require('./routes/web/server')(app)
require('./routes/admin')(app)
require('./plugins/db')(app)
// 传app

app.get('/admin/api/test', (req, res) => {
	res.send('test page')
})

app.listen(3000, ()=>{
	console.log('服务运行于 http://localhost:3000')
})
// 监听3000端口传给他回调函数