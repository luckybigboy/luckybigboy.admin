import ajax from './ajax'

const baseUrl = '/api'
// tables/basic
export const reqGetTableData = (per_page, cur_page) => ajax(baseUrl + '/getTableData', { per_page, cur_page })

// echarts bar数据
export const reqGetEchartsBar = () => ajax(baseUrl + '/getBarData');

// echarts line数据
export const reqGetEchartsLine = () => ajax(baseUrl + '/getLineData');

// echarts pie数据
export const reqGetEchartsPie = () => ajax(baseUrl + '/getPieData');