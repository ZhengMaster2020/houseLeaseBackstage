<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}用户</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input show-word-limit clearable v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select @change="setUserType" v-model="model.userType" clearable placeholder="请选择">
          <el-option
            v-for="item in userTypeOptins"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> 
      <el-form-item label="房东信息简介">
        <el-input type="textarea" clearable show-word-limit placeholder="请输入描述内容" :disabled="!isLandlord" v-model="model.userDesc"></el-input>
      </el-form-item>     
      <el-form-item label="房东地址">
        <el-input type="textarea" clearable show-word-limit placeholder="请输入详细地址" :disabled="!isLandlord" v-model="model.address"></el-input>
      </el-form-item>
      <el-form-item label="已发布的房源">
        <el-input  type="textarea" clearable show-word-limit p1aceholder="房源id以分号隔开,如要新增请求最后的分号加上id" :disabled="!isLandlord" v-model="model.houseID"></el-input>
      </el-form-item>
       <el-form-item label="房源质量分数">
        <el-input type="text" clearable v-model.number="model.houseQualityNum" :disabled="!isLandlord"  show-word-limit></el-input>
      </el-form-item>
       <el-form-item label="服务分数">
        <el-input type="text" clearable v-model.number="model.serviceNum" show-word-limit :disabled="!isLandlord" ></el-input>
      </el-form-item>
       <el-form-item label="评价分数">
        <el-input type="text" clearable v-model.number="model.appraisalNum" show-word-limit :disabled="!isLandlord" ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input clearable type="text" v-model="model.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input type="text" clearable v-model.number="model.phone" show-word-limit maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" show-word-limit clearable v-model="model.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button native-type="reset" @click="model = {}">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data(){
    return {
      isLandlord: false, // 是否为房东
      model: {
        userType: '租客',  // 用户类型
        userDesc: '',  // 用户信息简介
      },
      userTypeOptins: [{
        value: '租客',
        label: '租客'
      }, {
        value: '房东',
        label: '房东'
      }]
    }
  },
  watch: {
    'model.userType': function(val) {
      this.setUserType(val)
    }
  },
  methods: {
    afterUpload(res) {
      console.log(this.model);
      console.log(res)
      // 显示赋值
      // this.$set(this.model.avatar, `icon`, res.url)
      this.model.avatar = res.url
    },
    // 新建或者跟新用户信息
    async save(){
      let res
      if (this.id) {
        res = await this.$http.put(`rest/users/${this.id}`, this.model) //更新
      } else {
        res = await this.$http.post('rest/users', this.model) // 保存
      }
      console.log(res, 'res')
      this.$router.push('/users/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // 根据用户id 获取某个用户的信息
    async fetch(){
      const res = await this.$http.get(`rest/users/${this.id}`)
      this.model = res.data
    },

    // 只有用户是房东时才可以填写信息简介
    setUserType(val) {
      console.log(val, 'vL')
      if (val === '房东') {
        this.isLandlord = true
      } else {
        this.$set(this.model, 'userDesc', '')
        this.isLandlord = false
      }
    }
  },
  created(){
    this.id && this.fetch()
  }
}
</script>

<style scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
