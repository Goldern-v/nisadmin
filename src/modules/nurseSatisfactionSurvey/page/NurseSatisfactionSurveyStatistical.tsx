import styled from 'styled-components'
import React, { useState, useEffect, Component } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, ColumnProps, PaginationConfig } from 'src/vendors/antd'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import NurseSatisfactionSurveyService from '../services/NurseSatisfactionSurveyService'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { useKeepAliveEffect } from 'src/vendors/keep-alive'
import { fileDownload } from 'src/utils/file/file'
import ReactEcharts from 'echarts-for-react';
import printing from 'printing'

import { useRef } from 'src/types/react'
const ButtonGroup = Button.Group;
export interface Props { }
const api = new NurseSatisfactionSurveyService();

export default observer(function MyCreateList() {
  const [dataSource, setDataSource] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [date, setDate]: any = useState([moment(moment().format('YYYY-01')),moment(moment().format('YYYY-12'))])
  const [type, setType] = useState("表")
  const [satisfactionPerList, setSatisfactionPerList]: any = useState([])
  const [participationRatePerList, setParticipationRatePerList]: any = useState([])
  const [monthList, setMonthList]: any = useState([])

  const getOption = () => {
    let option = {
      legend: {
        itemWidth: 50,
        itemHeight: 30,
      },
      tooltip: {
        formatter:
          '{b}<br />\
        {a}：{c}%<br />'
      },
      dataset: {
        source: []
      },
      grid: {
        height: 400
      },
      xAxis: {
        type: 'category',  // 设置为类目轴
        data: monthList  // 横坐标的刻度标签
      },
      yAxis: {
        type: 'value',  // 设置为数值轴，该值有series的data传入
        max: 100,
        min: 0,
        splitNumber: 2,
        axisLabel: {
          show: true,
          interval: 'auto',
          formatter: '{value} %'
        },
      },
      series: [{
        type: 'bar',
        name: '参与率',
        backgroundStyle: {
          color: 'rgba(84, 112, 198, 0.2)',
        },
        data: satisfactionPerList
      },
      {
        type: 'bar',
        name: '满意度',
        backgroundStyle: {
          color: 'rgba(146, 204, 118, 0.2)',
        },
        data: participationRatePerList
      }]

    };
    return option;
  };

  let columns: ColumnProps<any>[] = []
  columns =
    [
      {
        title: '年份',
        dataIndex: 'year',
        width: 50,
        align: 'center',
        render(year: any) {
          return year + "年";
        }
      },
      {
        title: '月份',
        dataIndex: 'month',
        width: 50,
        align: 'center',
        render(month: any) {
          return month + "月";
        }
      },
      {
        title: '调查人数',
        dataIndex: 'surveyNum',
        width: 80,
        align: 'center'
      },
      {
        title: '参与人数',
        dataIndex: 'participation',
        width: 80,
        align: 'center'
      },
      {
        title: '参与率',
        dataIndex: 'participationRatePer',
        width: 80,
        align: 'center'
      },
      {
        title: '平均分',
        dataIndex: 'averageScore',
        width: 80,
        align: 'center'
      },
      {
        title: '满意度',
        dataIndex: 'satisfactionPer',
        width: 80,
        align: 'center'
      },
    ]

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  })
  const [total, setTotal]: any = useState(0)

  const getData = () => {
    setPageLoading(true)
    let startYear = date[0] ? +moment(date[0]).format('YYYY') : ''
    let endYear = date[0] ? +moment(date[1]).format('YYYY') : ''
    let startMonth = date[0] ? +moment(date[0]).format('MM') : ''
    let endMonth = date[0] ? +moment(date[1]).format('MM') : ''
    api
      .surveyReport({
        ...pageOptions,
        startYear,
        endYear,
        startMonth,
        endMonth,
      })
      .then((res) => {
        setPageLoading(false)
        let a: any = [];
        let b: any = [];
        let c: any = [];
        res.data.list.map((item: any) => {
          a.push(item.participationRatePer.substring(0, item.participationRatePer.lastIndexOf('%')))
          b.push(item.satisfactionPer.substring(0, item.participationRatePer.lastIndexOf('%')))
          c.push(item.month+"月")
        })
        setSatisfactionPerList(a)
        setParticipationRatePerList(b)
        setMonthList(c)
        setTotal(res.data.totalCount)
        setDataSource(res.data.list)
      }, err => setPageLoading(false))
  }

  const handlePrint = () => {
    let printbox = document.createElement('div')
    printbox.id = "printpage"
    let titlebox = document.createElement('div')
    titlebox.className = 'print-title'
    let title = `横沥医院${moment(date[0]).format('YYYY')}年${moment(date[0]).format('MM')}月 - ${moment(date[1]).format('YYYY')}年${moment(date[1]).format('MM')}月护士长满意度统计汇总`
    titlebox.innerText = title
    let tablebox = (document.getElementById('baseTable') || document.createElement('div')).cloneNode(true)
    let chartsPart = document.getElementById('charts') || document.createElement('div')
    chartsPart.classList.remove('dis')
    let charts = document.getElementsByTagName('canvas')[0] || document.createElement('div')
    let chartsbox = document.createElement('img')
    chartsbox.id = "canvasImg"
    setTimeout(() => {
      chartsbox.src = charts.toDataURL()
      printbox.appendChild(titlebox)
      printbox.appendChild(chartsbox)
      printbox.appendChild(tablebox)
      document.body.appendChild(printbox)
      printing(printbox, {
        injectGlobalCss: true,
        css: `
          #printpage{
            padding-top:1cm;
          }
          #canvasImg{
            width:21cm;
          }
          .ant-table-wrapper{
            width:17cm;
            margin:0 auto;
          }
          .ant-pagination,.ant-table-pagination{
            display:none;
          }
          .print-title{
            line-height:40px;
            font-weight:700;
            font-size:18px;
            text-align:center;
            margin-bottom:5px;
          }
          @page{
            margin:0mm;
          }
          .ant-spin-nested-loading{
            height:auto;
          }
          .ant-table-body{
            overflow-y:hidden !important;
          }
        `
      })
      document.body.removeChild(printbox)
      if(type == "表"){
        chartsPart.classList.add('dis')
      }
    }, 500);
  }
  const handleExport = () => {
    setPageLoading(true)
    let startYear = date[0] ? +moment(date[0]).format('YYYY') : ''
    let endYear = date[0] ? +moment(date[1]).format('YYYY') : ''
    let startMonth = date[0] ? +moment(date[0]).format('MM') : ''
    let endMonth = date[0] ? +moment(date[1]).format('MM') : ''
    api.exportReport({
      startYear,
      endYear,
      startMonth,
      endMonth,
    })
      .then(res => {
        setPageLoading(false)
        fileDownload(res)
      }, err => setPageLoading(false))
  }

  useEffect(() => {
    getData()
  }, [
    pageOptions.pageIndex,
    pageOptions.pageSize,
    date,
  ])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP') {
      getData()
    }
  })

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>满意度调查表统计</PageTitle>
        <Place />
        <span className='label'>时间:</span>
        <DatePicker.RangePicker
          allowClear
          style={{ width: 220 }}
          value={date}
          mode={['month', 'month']}
          format={'YYYY-MM'}
          placeholder={['开始时间', '结束时间']}
          onChange={(value: any) => setDate(value)}
          onPanelChange={(value: any) => setDate(value)}
        />
        <Button type='primary' onClick={() => getData()}>
          查询
        </Button>
        <Button onClick={handleExport}>导出</Button>
        <Button onClick={handlePrint}>打印</Button>
        <div className='ml-20 boxButton'>
          <div className={type == "表" ? "bgc left" : "left"} onClick={() => setType("表")}>表</div>
          <div className={type == "图" ? "bgc right" : "right"} onClick={() => setType("图")}>图</div>
        </div>
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        className={type == "表" ? "" : "dis"}
        wrapperStyle={{ margin: '0 15px' }}
        type={['index']}
        rowKey='id'
        surplusHeight={220}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: total
        }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
          })
        }}
      />
      <div className={type == "图" ? "statisticalFigure" : "statisticalFigure dis"} id="charts">
        <h1>横沥医院{moment(date[0]).format('YYYY')}年{moment(date[0]).format('MM')}月 - {moment(date[1]).format('YYYY')}年{moment(date[1]).format('MM')}月护士长满意度统计汇总</h1>
        <div className='echartsBody'>
          <ReactEcharts option={getOption()} />
        </div>
      </div>

    </Wrapper>
  )
})
const Wrapper = styled.div`
.ml-20 {
  margin-left: 20px;
}
.dis{
  display: none;
}
.active{
  color: #09a9f0;
}
.active1{
  color: #f6ac4b;
}

.boxButton {
  display:flex;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  width: 65px;
  height: 32px;
  overflow: hidden;
  background-color: #fff;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
  user-select: none;
  .left{
    width: 32px;
    height: 32px;
    border-right: 1px solid #d9d9d9
  }
  .right{
    width: 32px;
    height: 32px;
  }
}

.bgc{
  background-color: #00a680;
  color: #fff
}

.statisticalFigure {
  width: calc(100% - 30px);
  height: 88vh;
  margin: 0 15px;
  margin-bottom: 15px;
  background-color: #fff;
  h1{
    text-align: center;
  }
  .echartsBody{
    .echarts-for-react {
      height: 500px !important;
    }
  }
}
.echartsBody {
  padding-top: 70px;
}
`
