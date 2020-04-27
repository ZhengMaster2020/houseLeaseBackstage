<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}房屋</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>  
      <el-form-item label="广州地区">
        <el-select clearable v-model="model.city" placeholder="请选择">
          <el-option v-for="(item, key) in houseCity" :key="key" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>   
      <el-form-item label="发布时间">
        <el-date-picker
          v-model="model.time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="图片" class="upload">
        <div class="imgwrap">
          <div >已上传后台服务器图片：</div>
          <img v-for="item in model.avatar" :key="item" :src="item" class="avatar" />
        </div>
        <div class="img-upload-icon">
          <div>本次新增图片：</div>
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL+'/upload'"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :show-file-list="true"
            list-type="picture-card"
            :on-success="afterUpload" >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="houseImg">
          </el-dialog>
        </div>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="model.price" placeholder="元 / 月"></el-input>
      </el-form-item>     
       <el-form-item label="面积">
        <el-input v-model="model.areaNum" placeholder="单位平方米"></el-input>
      </el-form-item>       
      <el-form-item label="房间数">
        <el-input v-model="model.roomNum" placeholder="房间数"></el-input>
      </el-form-item> 
      <el-form-item label="客厅数">
        <el-input v-model="model.livingRoomNum" placeholder="客厅数"></el-input>
      </el-form-item>     
      <el-form-item label="厕所">
        <el-input v-model="model.toiletNum" placeholder="厕所数量"></el-input>
      </el-form-item>
      <el-form-item label="信息">
        <el-input type="textarea" v-model="model.add" placeholder="房子描述信息"></el-input>
      </el-form-item>
      <el-form-item label="房屋类型">
        <el-select clearable v-model="model.type" placeholder="请选择">
          <el-option v-for="(item, key) in houseType" :key="key" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="状态">
        <el-select clearable v-model="model.status" placeholder="请选择">
          <el-option v-for="(item, key) in houseStatus" :key="key" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="租售情况">
        <el-select clearable v-model="model.saleSituation" placeholder="请选择">
          <el-option v-for="(item, key) in saleSituation" :key="key" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="是否有花园">
        <el-radio-group v-model="model.garden">
          <el-radio :label="true">有</el-radio>
          <el-radio :label="false">无</el-radio>
        </el-radio-group>
      </el-form-item>      
      <el-form-item label="拥有特点">
          <el-input type="textarea" v-model="model.feature" placeholder="每个特点以逗号分割" show-word-limit></el-input>
      </el-form-item>      
      <el-form-item label="卖点">
          <el-input type="textarea" v-model="model.sellingPoint" placeholder="键值对的方式输入，每个卖点以分号分割(例：人文风情：居民友善)" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="model.phone" placeholder="请输入电话号码" maxlength="11" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input disabled  v-model="model.userID"></el-input>
      </el-form-item>     
       <el-form-item label="评论ID">
        <el-input disabled v-model="commentID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 接收id
    id: {}
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      commentID: '',
      model: {
        avatar: [],
        type: '',
        userID: '',
        commentID: ''
      },
      houseType: [], // 房子类型
      houseStatus: [ // 房子出售状态
        { value: '出售中', label: '出售中'  },
        { value: '已出售', label: '已出售'  },
        { value: '出租中', label: '出租中'  },
        { value: '已出租', label: '已出租'  },
      ],
      saleSituation: [ // 房子租售情况
        { value: '合租', label: '合租' },
        { value: '单间', label: '单间' },
        { value: '整租', label: '整租' },
        { value: '整售', label: '整售' },
      ],
      houseCity: [
        { value: '增城', label: '增城' },
        { value: '番禺', label: '番禺' },
        { value: '南沙', label: '南沙' },
        { value: '花都', label: '花都' },
        { value: '白云', label: '白云' },
        { value: '海珠', label: '海珠' },
        { value: '越秀', label: '越秀' },
        { value: '荔湾', label: '荔湾' },
        { value: '天河', label: '天河' },
        { value: '从化', label: '从化' },
        { value: '黄埔', label: '黄埔' },
        { value: '广州周边', label: '广州周边' }
      ],
      parents: []
    };
  },
  methods: {
    // 图片上传
    afterUpload(res) {
      this.model['avatar'].push(res.url)
      console.log(this.model, 'img upload')
    },
    // afterUploads(res) {
    //   console.log(this.model);
    //   console.log(res)
    //   this.model.img = res.url
    // },
    // afterUploadss(res) {
    //   console.log(this.model);
    //   console.log(res)
    //   this.model.icon = res.url
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // this.$set(this.model, 'avatar', file.url)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async save() {
      let res;
      this.model.commentID = this.commentID.split(',')
      console.log(this.model, 'qingqiusanshu ')
      if (this.id) {
        res = await this.$http.put(`rest/house/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/house", this.model);
      }
      console.log(res, 'res')
      this.$router.push("/houses/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    // 获取房屋信息
    async fetch() {
      const res = await this.$http.get(`rest/house/${this.id}`);
      console.log(res.data, 'eeee')
      this.commentID = res.data.commentID.join(',')
      if (res.data.userID ) {
        this.model = res.data
      } else {
        const { _id } = JSON.parse(sessionStorage.getItem('userinfo'))
        res.data.userID = _id
        this.model = res.data;
      }
    },
    async fetchParents() {
      const typeArr = []
      const res = await this.$http.get(`rest/type`);
      res.data.forEach(({ type }) => typeArr.push({ label: type, value: type }))
      console.log(typeArr, 'type')
      this.houseType = typeArr;
    }
  },
  created() {  
    this.fetchParents();
    this.id && this.fetch();
  },
  mounted() {
    const { _id } = JSON.parse(sessionStorage.getItem('userinfo'))
    this.$set(this.model, 'userID', _id)
    console.log('userid', _id)
  }
};
</script>
<style>
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
    text-align: center;
  }
  .img-upload-icon{
    display: block;
  }
  .imgwrap {
    display: block;
  }
  .avatar {
    width: 148px;
    height: 148px;
    margin-right: 20px;
    display: inline-block;
  }
  /* .upload {
    display: flex;
    justify-content: flex-start;
  } */
</style>
