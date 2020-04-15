const express = require('express')
const app = express();

const tableData = require('../src/data/tables/tables.json')
const echartsBar = require('../src/data/charts/bar.json')
const echartsLine = require('../src/data/charts/line.json')
const echartsPie = require('../src/data/charts/pie.json')


// 分页数据
app.get('/getTableData', function (req, res) {
  let query = req.query;
  let per_page = query.per_page;
  let cur_page = query.cur_page;

  let min = per_page * cur_page - per_page;
  let max = per_page * cur_page;

  let arr = tableData.slice(min, max);
  res.json({
    code: 200,
    data: {
      table: arr,
      total: tableData.length
    }
  })
})

// bar数据
app.get('/getBarData', function (req, res) {
  res.json({
    code: 200,
    data: {
      bar: echartsBar
    }
  })
})

// line 数据
app.get('/getLineData', (req, res) => {
  res.json({
    code: 200,
    data: {
      line: echartsLine
    }
  })
})

//pie 数据
app.get('/getPieData', (req, res) => {
  res.json({
    code: 200,
    data: {
      pie: echartsPie
    }
  })
})


app.listen(3000, () => {
  console.log('http://localhost:3000')
  console.log("服务器已启动");
})