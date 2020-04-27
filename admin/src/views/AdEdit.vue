<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}评论</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="评论">
        <el-input v-model="model.comment" show-word-limit></el-input>
      </el-form-item>
      <!-- <el-form-item label="发布时间">
        <el-date-picker
          v-model="model.publishTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item> -->
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
      model: {},
      parents: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/comment/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/comment", this.model);
      }
      console.log(res, 'res')
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/comment/${this.id}`);
      console.log(res, 'res')
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/comment`);
      this.parents = res.data;
    }
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  }
};
</script>

