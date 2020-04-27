<template>
  <div>
      <h1>评论列表</h1>
      <el-table :data="items">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="comment" label="评论"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
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
      const res = await this.$http.get("rest/comment");
      this.items = res.data;
    },
    remove(row) {
      console.log('row', row)
      this.$confirm(`是否确定要删除该条评论`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/comment/${row._id}`);
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

<style>

</style>