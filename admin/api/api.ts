/**
    @api { GET } rest/users 获取全部用户（测试）
    @apiVersion 1.0.0
    @apiName get-all-user
    @apiGroup User

    @apiSuccess { number } code 表示状态码 200/300表示成功 404/400表示失败
    @apiSuccess { String } message 成功失败的信息返回
    @apiSuccess { Object } data返回一个对象

    @apiSuccessExample 成功
                    {
                        code:200,
                        message:"获取全部用户成功",
                        data:{ users }
                    }
    @apiSuccessExample 失败
                    {
                        code:404,message:"获取全部用户成功"
                    }
    @apiSampleRequest /api/getUsers

*/
//=================================================================================================
/**

    @api { POST } /api/register 1.注册用户
    @apiDescription 用户注册接口
    @apiVersion 1.0.0
    @apiName register-user
    @apiGroup User

    @apiParam { String } name  用户名
    @apiParam { String } password  密码

    @apiSuccess { number } code 表示状态码 200/300表示成功 404/400表示失败
    @apiSuccess { String } message 成功失败的信息返回
    @apiSuccessExample 成功
            {
                code:200,
                messgae:"注册成功"
            }
    @apiSuccessExample 失败
            {
                code:404,message:"用户已被注册"
            }
    @apiSampleRequest /api/register

*/
//=================================================================================================
/**

    @api { POST } /api/passLogin 2.邮箱登录
    @apiDescription 邮箱登录接口
    @apiVersion 1.0.0
    @apiName email-login
    @apiGroup User

    @apiParam { String } email  邮箱
    @apiParam { String } password  密码

    @apiSuccess { number } code 表示状态码 200/300表示成功 404/400表示失败
    @apiSuccess { String } message 成功失败的信息返回
    @apiSuccess { Object } data 成功的一些信息

    @apiSuccessExample 成功
        {
            code:200,message:"登录成功", data:{ token: "Bearer " + token }
        }

    @apiSuccessExample 失败
        {
            code:404,message:"用户不存在，请前往注册"  
        }

*/
//=================================================================================================
/**
    @api { POST } /api/getCode 3.短信验证码获取
    @apiDescription 获取手机短信验证码
    @apiVersion 1.0.0
    @apiName get-code
    @apiGroup User

    @apiParam { String } phone 手机号码

    @apiSuccess { number } code 表示状态码 200/300表示成功 404/400表示失败
    @apiSuccess { String } message 成功失败的信息返回
    @apiSuccess { Object } data 成功的一些信息

    @apiSuccessExample 成功
            {
                code:200,message:"验证码获取成功，有效期三分钟",data:{code:短信验证码}
            }


    @apiSuccessExample 失败
            {
                code:400,message:jsonObj.reason(文字描述的短信获取失败信息),data:{phone:手机号}
            }
          或
            {
                code:404,message:"短信验证码生成错误"
            }

*/
//=================================================================================================
/**

    @api { POST } /api/codeLogin 4.手机验证码登录
    @apiDescription 手机验证码验证登录接口
    @apiVersion 1.0.0
    @apiName code-verify-login
    @apiGroup User

    @apiParam { String } phone 手机号码
    @apiParam { String } code 正确的验证码

    @apiSuccess { number } code 表示状态码 200/300表示成功 404/400表示失败
    @apiSuccess { String } message 成功失败的信息返回
    @apiSuccess { Object } data 成功的一些信息

    @apiSuccessExample 成功
            {
                code:200,message:"短信验证成功,并自动注册", data:{ token: "Bearer " + token }
            }
        或
            {
                code:300,message:"短信验证成功", data:{ token: "Bearer " + token }
            }


    @apiSuccessExample 失败
            {
                code:404,message:"短信验证码错误"  
            }
        或
            {
                code:400,message:"短信验证码已过期，请重新获取验证码"
            }
            
*/
//=================================================================================================
/**
    @api { GET } /api/getCurrentUser 5.获取登录成功后的个人信息
    @apiDescription 这是一个登录成功后的信息获取接口，需要token验证
    @apiVersion 1.0.0
    @apiName login-success-getMeMessage
    @apiGroup User
    
    @apiHeader { String } Authorization 验证token

    @apiSuccess { number } code 表示状态码 200/300表示成功 404/400表示失败
    @apiSuccess { String } message 成功失败的信息返回
    @apiSuccess { Object } data 成功的一些信息

    @apiSuccessExample 成功
            {
                code:200,message:"获取用户自身信息成功", data:{ user,chats }
            }
    @apiSuccessExample 失败
            {
                code:404,message:"获取用户自身信息失败"  
            }
    @apiSampleRequest /api/getCurrentUser
*/
//=================================================================================================
/**
 
    @api { GET } /api/addHeader 6.登录后修改个人头像
    @apiVersion 1.0.0
    @apiName login-success-set-header
    @apiGroup User
    
    @apiHeader { String } Authorization 验证token
    @apiParam { String } header 头像图片名字+后缀

    @apiSuccess { number } code 表示状态码 200/300表示成功 404/400表示失败
    @apiSuccess { String } message 成功失败的信息返回

    @apiSuccessExample 成功
            {
                code:200,message:"修改头像成功", data:{ header }
            }
    @apiSuccessExample 失败
            {
                code:404,message:"头像修改失败"  
            }
*/
//=================================================================================================
/**
    @api { webStorage } [端口:ws://localhost:3000] 7.用户聊天socketIo
    @apiVersion 1.0.0
    @apiName socket-io
    @apiGroup User
    @apiParam { String } requestType 请求类型（ socketIo独特的方式,此项不用传 ）
    @apiParam { String } text 发的消息
    @apiParam { String } from 你的id
    @apiParam { String } to 聊天对方id
    
    @apiSuccess { function } sendMsg 监听sendMsg事件发送信息
    @apiSuccess { function } receiveMsg 监听receiveMsg事件接受信息

    @apiSuccessExample 请求返回的数据
        {
            _id:自动生成的id,
            text:发送的信息,
            from:当前登录用户id,
            to:接受到信息的用户id
            unite:双方id按照从小到大排序用-拼接成的字符串(例如:"dasjdash-djakjhdsa"),
            times:发送消息的时间
        }

*/
