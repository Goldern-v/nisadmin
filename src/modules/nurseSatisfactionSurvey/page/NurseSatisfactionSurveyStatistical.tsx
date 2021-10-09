import styled from 'styled-components'
import React, { useState, useEffect, Component } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, ColumnProps, PaginationConfig, Modal, message, Input, Switch } from 'src/vendors/antd'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import NurseSatisfactionSurveyService from '../services/NurseSatisfactionSurveyService'
import NurseSatisfactionSurveyAddModal from '../components/NurseSatisfactionSurveyAddModal'
import { DoCon } from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { useKeepAliveEffect } from 'src/vendors/keep-alive'
import { fileDownload } from 'src/utils/file/file'
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import service from 'src/services/api'
import FormPageBody from '../components/FormPageBody'
import SetImportModal from '../components/SetImportModal'
const ButtonGroup = Button.Group;
export interface Props { }
const api = new NurseSatisfactionSurveyService();

export default observer(function MyCreateList() {
  const [year, setYear] = useState<Number>(+moment().format('YYYY'))
  const [month, setMonth] = useState<String>('')
  const [state, setState] = useState<String>('')
  const [templateList, setTemplateList]: any = useState([])
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
  const [dataSource, setDataSource] = useState([])
  const [deptSelect, setDeptSelect] = useState('')
  const [yearList, setYearList] = useState([] as number[])
  const [monthList, setMonthList] = useState([] as string[])
  const [deptListAll, setDeptListAll] = useState([] as any[])
  const [pageLoading, setPageLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])
  const [editVisible, setEditVisible] = useState(false)
  const [editVisible2, setEditVisible2] = useState(false)
  const [pathChange, setPathChange] = useState("")
  const [idChange, setIdChange] = useState("")
  const [date, setDate]: any = useState([])
  const [type, setType] = useState("表")
  const [satisfactionPerList, setSatisfactionPerList]: any = useState([])
  const [participationRatePerList, setParticipationRatePerList]: any = useState([])

  const [isAdd, setIsAdd] = useState(false)
  const [record, setRecord] = useState({} as any)

   //是否启用
   const changeStatus = (record: any, check: any) => {
    record.status = check ? 1 : 0
    setDataSource([...dataSource])
    setPageLoading(true)
    // api
    //   .setVisitTemplateStatus({
    //     formCode: record.formCode,
    //     status: record.status,
    //   })
    //   .then((res) => {
    //     setPageLoading(false)
    //     if (res.code == "200") {
    //       message.success("操作成功！");
    //     } 
    //   }, err => setPageLoading(false))
  }

  /** 类别 */
  const pathMap: any = {
    year: 'year',
    month: 'month',
    conclusion: 'conclusion',
    innovation: 'innovation'
  }
  const path = window.location.hash.split('/').reverse()[0]

  const status = pathMap[path]

  const getOption = ()=>{
    let option = {
      legend: {
        itemWidth:50,
        itemHeight:30,
      },
      tooltip: {
        formatter:
        '{b}<br />\
        {a}：{c}%<br />'
      },
      dataset: {
        source: []
      },
      grid:{
        height:220
      },
      xAxis: {
        type: 'category',  // 设置为类目轴
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']  // 横坐标的刻度标签
      },
      yAxis: {
        type: 'value',  // 设置为数值轴，该值有series的data传入
        max : 100,
        min : 0,
        splitNumber : 2,
        axisLabel: {  
          show: true,  
          interval: 'auto',  
          formatter: '{value} %'  
        },  
      },
      series: [{
        type: 'bar',
        name: '满意度',
        backgroundStyle: {
          color: 'rgba(84, 112, 198, 0.2)',
        },
        data: satisfactionPerList
      },
      {
        type: 'bar',
        name: '参与率',
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

  const initData = () => {
  }
  const onChangeSearchText = (e: any) => { setSearchText(e.target.value) }

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
        res.data.list.map((item: any)=>{
          a.push(item.participationRatePer.substring(0, item.participationRatePer.lastIndexOf('%')))
          b.push(item.satisfactionPer.substring(0, item.participationRatePer.lastIndexOf('%')))
        })
        setSatisfactionPerList(a)
        setParticipationRatePerList(b)
        setSelectedRowKeys([])
        setTotal(res.data.totalCount)
        setDataSource(res.data.list)
      }, err => setPageLoading(false))
  }

  const onEdit = (record: any) => {
    setEditVisible(true)
    // setPathChange(item.path)
    // setIdChange(item.id)
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

  useEffect(() => {
    initData()
  }, [])

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
        <Button onClick={handleExport}>打印</Button>
        <div className='ml-20 boxButton'>
          <div className={type == "表" ? "bgc left": "left"} onClick={() => setType("表")}>表</div>
          <div className={type == "图" ? "bgc right": "right"} onClick={() => setType("图")}>图</div>
        </div>
      </PageHeader>
      {type == "表" && <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
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
      />}
      {type == "图" && <div className='statisticalFigure'>
        <div className='echartsBody'>
            <ReactEcharts option={getOption()}/>
        </div>
      </div>}
      
    </Wrapper>
  )
})
const Wrapper = styled.div`
.ml-20 {
  margin-left: 20px;
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
}
.echartsBody {
  padding-top: 150px;
}
`
