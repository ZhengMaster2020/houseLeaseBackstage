<template>
  <div>
    <h1>房屋类型列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="350"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
           <el-tag size="medium">{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="danger" round size="small" @click="remove(scope.row)">删除</el-button>
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
      const res = await this.$http.get("rest/type");
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除 "${row.adds}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/type/${row._id}`);
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

