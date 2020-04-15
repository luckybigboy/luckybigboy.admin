<template>
  <div class="pie">
    <el-row>
      <el-col :span='24'>
        <el-card>
          <div slot="header">网站访客来源分析</div>
          <div ref="A"
               :options="optionsA"
               style="width: 100%; height: 400px"></div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <div slot="header">某站点用户访问来源（纯属虚构）</div>
          <div ref="B"
               :options="optionsB"
               style="width: 100%; height: 400px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reqGetEchartsPie } from '@/api/index'
export default {
  name: 'pie',
  data () {
    return {
      timer: null,
      optionsA: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        toolbox: {
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false }, // 数据试图
            restore: {},  // 重置
            saveAsImage: {},
          }
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '直达', selected: true },
              { value: 679, name: '营销广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: [
              { value: 335, name: '直达' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1048, name: '百度' },
              { value: 251, name: '谷歌' },
              { value: 147, name: '必应' },
              { value: 102, name: '其他' }
            ]
          }
        ]
      },
      optionsB: {
        title: {
          show: false,
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false }, // 数据试图
            restore: {},  // 重置
            saveAsImage: {},
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: null,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.init();
    this.getPieData();
  },
  destroyed () {
    clearTimeout(this.timer);
  },
  methods: {
    init () {
      this.pieA = this.$echarts.init(this.$refs['A']);
      this.pieB = this.$echarts.init(this.$refs['B']);
      this.pieA.setOption(this.optionsA, true);
      this.pieB.setOption(this.optionsB, true);
    },
    getPieData () {
      this.pieA.showLoading()
      this.pieB.showLoading()
      reqGetEchartsPie().then(data => {
        if (data.code === 200) {
          const options = data.data;
          this.pieA.setOption({
            series: options.pie.optionsB.series
          })
          this.pieB.setOption({
            series: options.pie.optionsA.series
          })
          this.timer = setTimeout(() => {
            this.pieA.hideLoading()
            this.pieB.hideLoading()
          }, 1000);
        } else {
          this.pieA.hideLoading()
          this.pieB.hideLoading()
        }
      })
    }
  }
}
</script>
<style lang="scss">
</style>