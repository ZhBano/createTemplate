let data=`
<template>
  <div class="app-container">
    <div class="header">
      <el-input v-model.trim="searchParams.keyword" class="input" size="small" clearable @change="searchLsit">
        <el-button slot="append" icon="el-icon-search" />
      </el-input>

      <el-button size="mini" type="primary" @click="openDialog('add')">新增</el-button>
      <el-button size="mini" type="danger" :disabled="!selectCheckList.length" @click="deleteAll">批量删除</el-button>

    </div>

    <el-table
      :data="tableList"
      style="width: 100%"
      border
      :height="650"
      highlight-current-row
      @selection-change="selectCheck"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="日期" min-width="auto" align="center">
        <template slot-scope="{row}">
          <span>111</span>
        </template>
      </el-table-column>

      <el-table-column label="日期" min-width="auto" align="center">
        <template slot-scope="{row}">
          <span>111</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" width="150" align="center">
        <template slot-scope="{row}">
          <el-button type="text">修改</el-button>
          <el-button type="text" @click="deleteAll(row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import { fetchList, editForm, updataFrom } from '@/api/htc/index.js'

export default {
  data() {
    return {
      total: 0,
      selectCheckList: [], // 表格勾选框
      tableList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      searchParams: {

        currPage: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.searchParams).then(res => {
        this.selectCheckList.length = 0
        this.tableList = res.list
        this.total = res.total
      })
    },

    // 表格勾选
    selectCheck(data) {
      this.selectCheckList = data
    },

    // 搜索框搜索
    searchLsit() {
      this.searchParams.currPage = 1
      this.getList()
    },

    openDialog(type, row) {

    },

    // 删除
    deleteAll(row) {
      let params = null

      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row) {
        // 删除单行
          params = {
            submitFlag: 'delete',
            ids: row.id
          }
          updataFrom(params).then(_ => {
            this.$message.success('操作成功')
            this.getList()
          }).catch(_ => {})
        } else {
        // 批量删除
          params = {
            submitFlag: 'delete_all',
            ids: this.selectCheckList.map(item => item.id).join(',')
          }
          updataFrom(params).then(_ => {
            this.$message.success('操作成功')
            this.getList()
          }).catch(_ => {})
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.header{
    margin-bottom: 20px;

    .input{
        width: 200px;
        margin-right: 10px
    }
}
</style>

`
module.exports=data
