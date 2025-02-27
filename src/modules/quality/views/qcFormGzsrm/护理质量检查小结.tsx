import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Radio, Select, Spin } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { appStore, authStore } from 'src/stores'
import { PageTitle } from 'src/components/common'
import { qcFormGzsrmService } from './api/qcFormGzsrmService'
import { fileDownload } from "src/utils/file/file";
import BarChart from './components/BarChart'
import ColumnChart from './components/ColumnChart'
import CircleChart from './components/CircleChart'

import moment from 'moment'

const Option = Select.Option

export default observer(function 护理质量检查小结() {
  const { queryObj } = appStore
  const { deptList } = authStore

  const [filterDate, setFilterDate] = useState([moment(moment().format('YYYY-MM') + '-01'), moment()])
  const [wardCode, setWardCode] = useState(
    (authStore.isDepartment || authStore.isSupervisorNurse) ?
      '' :
      authStore.defaultDeptCode
  )

  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState<any[]>([])
  const [viewType, setViewType] = useState('table')

  //图表高度自适应相关
  const chartHeightCol = (restHeight = 200): number => {
    let windowHeight = document.documentElement.clientHeight

    return windowHeight - restHeight
  }
  const [chartHeight, setChartHeight] = useState(chartHeightCol())

  //图表相关数据
  const [chartData, setChartData] = useState<any[]>([])
  //查看图表类型
  const [chartType, setChartType] = useState<'bar' | 'circle' | 'ring' | 'column'>('column')
  const chartTypeArr = [
    {
      name: '柱状',
      type: 'column',
    },
    {
      name: '条形',
      type: 'bar',
    },
    {
      name: '饼状',
      type: 'circle',
    },
    {
      name: '圆环',
      type: 'ring',
    },
  ]
  //柱状图数据
  const barChartData = chartData.map((item: any) => {
    return {
      type: item.itemName,
      value: item.size
    }
  })

  const columns: any[] = [
    {
      title: '科室',
      dataIndex: 'wardName',
      width: 180,
      align: 'center',
      render:(value:any, row:any, index:number)=>{
        return {children:value,props:{colSpan:row.colSpan,rowSpan:row.rowSpan}}
      },
      onCell:(record:any,rowIndex:number)=>{
        return {className:`${record.wardCode}`}
      }
    },
    {
      title: '质控项目',
      dataIndex: 'qcName',
      width: 210,
      align: 'center',
      onCell:(record:any,rowIndex:number)=>{
        return {className:`${record.wardCode}`}
      }
    },
    {
      title: '平均分',
      dataIndex: 'averageScore',
      width: 80,
      align: 'center',
      onCell:(record:any,rowIndex:number)=>{
        return {className:`${record.wardCode}`}
      }
    },
    {
      title: '存在问题',
      dataIndex: 'itemNameList',
      width: 180,
      align: 'left',
      render:(arr:string[])=>{
        return <div>
          {arr.map((item:string,idx:number)=>{
             return <div key={idx}> {`${idx}.${item}`}</div>
          })}
        </div>
      },
      onCell:(record:any,rowIndex:number)=>{
        return {className:`${record.wardCode}`}
      }
    },
    {
      title: '备注',
      dataIndex: 'remarkList',
      width: 180,
      align: 'left',
      render:(arr:string[])=>{
        return <div>
          {arr.map((item:string,idx:number)=>{
             return <div key={idx}> {`${idx}.${item}`}</div>
          })}
        </div>
      },
      onCell:(record:any,rowIndex:any)=>{
        return {className:`${record.wardCode}`}
      }
    },
  ]

  const getTableData = () => {
    setLoading(true)
    qcFormGzsrmService.countTemplateDetail({
      qcLevel: queryObj.qcLevel || '1',
      beginDate: filterDate[0].format('YYYY-MM-DD'),
      endDate: filterDate[1].format('YYYY-MM-DD'),
      wardCode,
    })
      .then(res => {
        setLoading(false)
        if (res.data) {
          let newData:any = []
          let a={}
          res.data.wardCountTemplateDetailList.map((item:any)=>{
            if(item.qcTemplateCountList.length>0){
              item.qcTemplateCountList.map((col:any)=>{
                let {key,parentWardName,wardCode,wardName} = item
                col = {...col,key,parentWardName,wardCode,wardName}
                item.wardName = ''
                col.rowSpan = col.wardName? item.qcTemplateCountList.length : 0
                col.colSpan = col.wardName? 1 : 0
                newData.push(col)
                })
            }else{
              let {parentWardName,wardCode,wardName} = item
              let itemData={...item,parentWardName,wardCode,wardName,itemNameList:[],qcName:'',remarkList:[],rowSpan:1,colspan:1}
              newData.push(itemData)
            }
            
          })          
          setTableData(newData)


          setChartData(res.data.itemCountList || [])
        }
      }, err => setLoading(false))
  }

  const handleExport = () => {
    setLoading(true)
    qcFormGzsrmService.countDetailExport({
        qcLevel: queryObj.qcLevel || '1',
        beginDate: filterDate[0].format('YYYY-MM-DD'),
        endDate: filterDate[1].format('YYYY-MM-DD'),
        wardCode,
      })
      .then(res => {
        setLoading(false)
        fileDownload(res)
      }, err => setLoading(false))
  }

  useEffect(() => {
    let resizeCallBack = () => setChartHeight(chartHeightCol())

    window.addEventListener('resize', resizeCallBack)
    return () => {
      window.removeEventListener('resize', resizeCallBack)
    }
  }, [])

  useEffect(() => {
    getTableData()
  }, [filterDate, wardCode])

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle>
          {filterDate[0].format('YYYY')}年{queryObj.title || '护理质量检查小结'}
        </PageTitle>
      </LeftIcon>
      <RightIcon>
        <div className="item">
          <div className="label">科室：</div>
          <div className="content">
            <Select
              value={wardCode}
              style={{ width: 200 }}
              showSearch
              onChange={(wardCode: string) => {
                setWardCode(wardCode)
                if (wardCode) authStore.selectDeptCode(wardCode)
              }}
              filterOption={(input: any, option: any) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {(authStore.isDepartment || authStore.isSupervisorNurse) && <Option value="" title="全部">全部</Option>}
              {deptList.map((item: any, index: number) =>
                <Option value={item.code} key={index} title={item.name}>{item.name}</Option>)}
            </Select>
          </div>
        </div>
        <div className="item">
          <div className="label">时间：</div>
          <div className="content">
            <DatePicker.RangePicker
              allowClear={false}
              value={[filterDate[0], filterDate[1]]}
              onChange={(value: any) => setFilterDate(value)}
              style={{ width: 220 }}
            />
          </div>
        </div>
        <div className='item'>
          <Button type='primary' onClick={getTableData}>
            查询
          </Button>
        </div>
        <div className="item">
          <Button onClick={handleExport}>
            导出
          </Button>
        </div>
      </RightIcon>
    </HeaderCon>
    <MidCon>
      <div className="switch-con">
        <span className="align-left" style={{ display: viewType == 'chart' ? 'block' : 'none' }}>
          <Radio.Group
            size="small"
            buttonStyle="solid"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}>
            {chartTypeArr.map((item: any, idx: number) => (
              <Radio.Button value={item.type} key={idx}>{item.name}</Radio.Button>
            ))}
          </Radio.Group>
        </span>
        <span className="align-right">
          <Radio.Group
            size="small"
            buttonStyle="solid"
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}>
            <Radio.Button value="table" >表格</Radio.Button>
            <Radio.Button value="chart">图表</Radio.Button>
          </Radio.Group>
        </span>
      </div>
      {viewType == 'table' && <TableCon>
        <BaseTable
          loading={loading}
          surplusHeight={260}
          dataSource={tableData}
          columns={columns}
          onRow={record=> {
            return {
              onMouseEnter: (event:any) => {
                let list=document.getElementsByClassName(`${record.wardCode}`) 
                for(let i=0;i<list.length;i++){
                 let ele: any = list[i]
                 ele.style.backgroundColor='rgb(211, 229, 220)';
                }
                return
              }, // 鼠标移入行
              onMouseLeave:()=>{
               let list=document.getElementsByClassName(`${record.wardCode}`)
                for(let i=0;i<list.length;i++){
                  let ele: any = list[i]
                  ele.style.backgroundColor='';
                 }
                return
              }
            };
          }}
        />
      </TableCon>}
      {viewType == 'chart' &&
        <Spin spinning={loading}>
          <ChartCon style={{ height: `${chartHeight || 0}px` }}>
            {chartType === 'column' && (
              <ColumnChart
                chartHeight={chartHeight}
                chartData={barChartData}
                title="频次" />
            )}
            {chartType === 'bar' && (
              <BarChart
                chartData={barChartData}
                title="频次" />
            )}
            {(chartType === 'circle' || chartType === 'ring') && (
              <CircleChart
                isRing={chartType === 'ring'}
                chartHeight={chartHeight}
                sourceData={barChartData}
              />
            )}
            {chartData.length <= 0 && <div className="no-data">
              <img
                style={{ width: '100px' }}
                src={require('src/modules/statistic/img/noData.png')} />
              <br />
              <span>暂无数据</span>
            </div>}
          </ChartCon>
        </Spin>}
    </MidCon>
  </Wrapper>
})

const Wrapper = styled.div`
height: 100%;
  width: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  flex-direction: column;
  .item {
    display: inline-block;
    margin-right: 15px;
    vertical-align: middle;
    & > div {
      display: inline-block;
      vertical-align: middle;
    }
    .label {
    }
    .content {
      .year-picker {
        width: 75px;
      }
      .recode-type-select {
        min-width: 200px;
      }
      .month-select {
        width: 72px;
      }
    }
    .statistics {
      border-color: #fff;
    }
  }
  .cell {
    margin: 0 -8px;
    padding: 5px;
    text-align: center;
    & + .cell {
      border-top: 1px solid rgb(232, 232, 232);
    }
  }
  td{
    word-break: break-all;
  }
`

const LeftIcon = styled.div`
  height: 55px;
  float: left;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`

const RightIcon = styled.div`
  height: 55px;
  float: right;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`

const HeaderCon = styled.div`
  height: 55px;
  align-items: center;
`

const TableCon = styled.div`
  /* width: 700px; */
  margin: 0 auto;
`

const MidCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  /* height: 0; */
  margin: 0 15px 15px 15px;
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  .switch-con{
    
    .align-right{
      float: right;
      text-align:right;
      padding-right: 20px;
    }
    .align-left{
      float: left;
      padding-left: 20px;
      text-align: left;
    }
  }
`

const ChartCon = styled.div.attrs({
  height: 0
})`
  padding: 0 40px;
  min-height: ${(p) => p.height};
    position: relative;
  .no-data{
    text-align:center;
    cursor: default;
    color: #999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    i{
      font-size: 44px;
      transform: scaleX(1.2);
    }
    span{
      font-size:20px;
    color: #aaa;
    }
  }
`