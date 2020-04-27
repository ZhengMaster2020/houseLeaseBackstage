<template>
  <div>
    <h1>房屋列表</h1>
    <el-table :data="items">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="city" label="地区"></el-table-column>
      <el-table-column prop="avatar" label="图片1">
        <template slot-scope="scope">
          <img :src="scope.row.avatar[0]" style="height:3rem;">
        </template>
      </el-table-column>
      <el-table-column prop="img" label="图片2">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="height:3rem;">
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图片3">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height:3rem;">
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="add" label="信息"></el-table-column>
      <el-table-column prop="parent" label="类型"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/houses/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/house");
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/house/${row._id}`);
        console.log(res, 'res')
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

