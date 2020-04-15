<template>
  <div class="basic">
    <h2>基本表格</h2>
    <div class="tables">
      <el-table :data="tableData"
                v-loading="loading"
                element-loading-text="加载数据中"
                style="width: 100%;"
                height="100%"
                border>
        <el-table-column prop="username"
                         label="用户名"
                         align="center"
                         width="80">
        </el-table-column>
        <el-table-column label="头像"
                         align="center"
                         width="80">
          <template slot-scope="scope">
            <img :src="scope.row.avatar"
                 alt="用户头像"
                 width="42"
                 height="42"
                 style="border-radius: 50%;">
          </template>
        </el-table-column>
        <el-table-column label="评分"
                         align="center"
                         width="130">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.score"
                     disabled
                     show-score
                     text-color="#ff9900"
                     score-template="{scope.row.score}">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="评价类型"
                         align="center"
                         width="80">
          <template slot-scope="scope">
            {{scope.row.rateType | rateTypeToText}}
          </template>
        </el-table-column>
        <el-table-column prop="deliveryTime"
                         label="送达时间"
                         align="center"
                         width="80">
        </el-table-column>
        <el-table-column prop="text"
                         align="center"
                         label="内容">
        </el-table-column>
        <el-table-column prop="recommend"
                         align="center"
                         label="推荐">
          <template slot-scope="scope">
            <div class="recommend-tag"
                 v-for="(recommend, index) in scope.row.recommend"
                 :key="index">
              <el-tag>{{recommend}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="评价时间"
                         width="160">
          <template slot-scope="scope">
            {{scope.row.rateTime | formatDate}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination style="margin-top: 5px; text-align: right; padding: 0 20px 10px"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-sizes="[5, 10, 15, 20]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { formatDate } from '@/utils/utils';
import { reqGetTableData } from '@/api/index'
export default {
  name: 'basic',
  data () {
    return {
      pagesize: 10,
      currentpage: 1,
      tableData: [],
      total: 0,
      loading: true,
    }
  },
  created () {
    this.getTableData();
  },
  methods: {
    handleSizeChange (value) {
      this.pagesize = value;
      this.getTableData();
    },
    handleCurrentChange (value) {
      this.currentpage = value;
      this.getTableData();
    },
    // 请求table数据
    getTableData () {
      reqGetTableData(this.pagesize, this.currentpage).then(data => {
        if (data.code === 200) {
          this.tableData = data.data.table;
          this.total = data.data.total;
          this.loading = false;
        }
      })
    }
  },
  filters: {
    rateTypeToText (type) {
      return type == 0 ? '满意' : '不满意';
    },
    formatDate (time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  }
}
</script>
<style lang="scss" scoped>
.basic {
  width: 100%;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
  h2 {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    font-size: 16px;
  }
  .tables {
    padding: 20px;
    height: 65vh;
    .recommend-tag {
      display: inline-block;
      margin: 4px 0;
      margin-right: 4px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>