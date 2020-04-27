<template>
  <div>
    <h1>用户列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:2rem;">
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/users/edit/${scope.row._id}`)"
          >编辑</el-button>
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
      const res = await this.$http.get("rest/users");
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除 "${row.username}"这个用户？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/users/${row._id}`);
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

