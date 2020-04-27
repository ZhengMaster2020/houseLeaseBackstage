<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}房屋类型</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="房屋类型">
        <el-input v-model="model.type" placeholder="请输入房屋的类型"></el-input>
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
    id: {}
  },
  data() {
    return {
      model: {
        type: ''
      }
    };
  },
  methods: {
    async save() {
      const res = await this.$http.post("rest/type", this.model);
      console.log("save", res);
      this.$router.push("/add/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/type/${this.id}`)
      console.log(res, 'da')
      this.model = res.date;
      console.log(this.id);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

