<template>
  <div class="line">
    <el-row>
      <el-col :span="12"
              style="padding-right: 4px">
        <el-card>
          <div slot="header">某周网站访客来源趋势图</div>
          <div ref="A"
               :options="optionsA"
               style="width: 100%; height: 400px"></div>
        </el-card>
      </el-col>
      <el-col :span="12"
              style="padding-left: 4px">
        <el-card>
          <div slot="header">未来一周天气变化</div>
          <div ref="B"
               :options="optionsB"
               style="width: 100%; height: 400px"></div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <div slot="header">各年份降水量</div>
          <div ref="C"
               style="width: 100%; height: 400px"
               :options="optionsC"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
var colors = ['#5793f3', '#d14a61', '#675bba'];
import { reqGetEchartsLine } from '@/api/index'
export default {
  name: 'lines',
  data () {
    return {
      timer: null,
      optionsA: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: 0,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        toolbox: {
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false }, // 数据试图
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },  // 切换为柱状和折线
            restore: {},  // 重置
            saveAsImage: {},
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: null
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: null
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: null
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: null
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: null
          }
        ]
      },
      optionsB: {
        title: {
          show: false,
          text: '未来一周气温变化',
          subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 0,
          data: ['最高气温', '最低气温']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: [
          {
            name: '最高气温',
            type: 'line',
            data: null,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '最低气温',
            type: 'line',
            data: null,
            markPoint: {
              data: [
                { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' },
                [{
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'max'
                }, {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: '最大值'
                  },
                  type: 'max',
                  name: '最高点'
                }]
              ]
            }
          }
        ]
      },
      optionsC: {
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ['2015 降水量', '2016 降水量']
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1]
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return '降水量  ' + params.value
                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                }
              }
            },
            data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0]
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return '降水量  ' + params.value
                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                }
              }
            },
            data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '2015 降水量',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: null,
            itemStyle: {
              normal: {
                color: '#5AB1EF',
                areaStyle: { type: 'default' }
              }
            },
          },
          {
            name: '2016 降水量',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#BAA8DF',
                areaStyle: { type: 'default' }
              }
            },
            data: null
          }
        ]
      }
    }
  },
  mounted () {
    this.init();
    this.getLineData();
  },
  destroyed () {
    clearTimeout(this.timer);
  },
  methods: {
    init () {
      this.lineA = this.$echarts.init(this.$refs['A']);
      this.lineB = this.$echarts.init(this.$refs['B']);
      this.lineC = this.$echarts.init(this.$refs['C']);
      this.lineA.setOption(this.optionsA, true);
      this.lineB.setOption(this.optionsB, true);
      this.lineC.setOption(this.optionsC, true);
    },
    getLineData () {
      this.lineA.showLoading();
      this.lineB.showLoading();
      this.lineC.showLoading();
      reqGetEchartsLine().then(data => {
        if (data.code === 200) {
          const options = data.data;
          this.lineA.setOption({
            series: options.line.optionsA.series
          })
          this.lineB.setOption({
            series: options.line.optionsB.series
          })
          this.lineC.setOption({
            series: options.line.optionsC.series
          })
          this.timer = setTimeout(() => {
            this.lineA.hideLoading();
            this.lineB.hideLoading();
            this.lineC.hideLoading();
          }, 1000);
        } else {
          this.lineA.hideLoading();
          this.lineB.hideLoading();
          this.lineC.hideLoading();
        }
      }).catch(err => {
        this.lineA.hideLoading();
        this.lineB.hideLoading();
        this.lineC.hideLoading();
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss">
</style>