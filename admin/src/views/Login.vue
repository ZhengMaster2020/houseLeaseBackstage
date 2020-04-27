<template>
  <div class="wrap">
    <h3 class="title">房屋租赁系统后台管理系统</h3>
    <div class="login-container">
      <el-card header="请先登录" class="login-card">
        <el-form @submit.native.prevent="login">
          <el-form-item label="用户类型">
            <el-select clearable v-model="model.userType" placeholder="请选择">
              <el-option v-for="(item, key) in userType" :key="key" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="model.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" >登录</el-button>
            <el-button @click="reset" class="reset-btn" style="margin-left: 40px">重置</el-button>
          </el-form-item>
          
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      model: {},
      userType: [
        // { value: 'tenant', label: '租客'},
        { value: 'landlord', label: '房东'},
        { value: 'admin', label: '管理员'}
      ]
    }
  },
  methods: {
    // 管理员登录接口
    async login(){
      if (!this.model.username || !this.model.password) return this.$message.error('用户名或密码不能为空！')
      const res = await this.$http.post('/login', this.model)
      if (res.data.message === '用户不存在')  return this.$message.error('该用户不存在，请先注册用户！')
      if (res.data.message === '密码错误')  return this.$message.error('密码错误，请重新输入！')
      // 将toke存入缓存中
      sessionStorage.token = res.data.token
      // 将用户信息存入sessionStorage中
      sessionStorage.setItem('userinfo', JSON.stringify(res.data.user))
      // 跳转后台首页
      this.$router.push('/')
      this.$message.success('登录成功')
    },
    reset() {
      this.model = {}
    }
  }
}
</script>

<style scoped>
.reset-btn {
  margin-left: 50px;
}
.title {
  position: absolute;
  font-size: 28px;
  top: 10%;
  left: 50%;
  color: #777;
  transform: translate(-50%, 0);
}
.wrap {
  position: relative;
  text-align: center;
  width: 100vw;
  height: 100vh;
  background: rgb(221, 206, 178) url(../assets/login-bg.jpg);
  background-size: 100% auto;
  overflow: hidden;
}
.login-container {
  position: absolute;
  text-align: left;
  top: 50%;
  left: 50%;
  width: 25rem;
  transform: translate(-50%, -50%);
  box-shadow: -10px 10px 10px #777;
}
.login-card {
  background: rgba(255, 255, 255, 0.411) !important;
  border:none;
}
</style>
