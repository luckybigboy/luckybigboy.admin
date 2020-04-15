import Vue from 'vue'
import App from './App'
import axios from 'axios'

// router
import router from './router'

// element
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// store
import store from './store/index'

// 引入echarts主模块（基础模块）
let echarts = require('echarts/lib/echarts')
// 引入需要的图标bar
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
// 引入提示框组件、标题组件、工具箱组件。
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
require('echarts/lib/component/visualMap');
require('echarts/lib/component/toolbox');

Vue.prototype.$echarts = echarts;



// normalize.css
import 'normalize.css'

// 工共样式
import './assets/style/variable.scss'
import './assets/style/common.scss'

Vue.config.productionTip = false;

Vue.use(element);

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
