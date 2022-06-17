import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Table, Button, DatePicker, Radio, Spin } from 'antd'
import CommonLayout, { ChartCon } from '../../common/CommonLayout'
import { observer } from 'mobx-react'
import { appStore, authStore } from 'src/stores'
// import CircleChart from './../../components/CircleChart'
// import LineChart from './../../components/LineChart'
import CircleChart from './components/CircleChart'
import LineChart from './components/LineChart'
import BaseTable from 'src/components/BaseTable'
import { statisticsApi } from '../../api/StatisticsApi'
import { ColumnProps } from 'antd/lib/table'
import { chartHeightCol } from '../../utils/chartHeightCol'
// import { delWithResData } from '../../utils/dealWithData'
import { setResData, getLineData } from './dealWithData'
import moment from 'src/vendors/moment'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
const RangePicker = DatePicker.RangePicker
const MonthPicker = DatePicker.MonthPicker
export interface Props { }

export default observer(function FeverPatient() {
  let _currentMonth = currentMonth()

  let _currentQuater = currentQuater()

  let _currentYear = currentYear()
  // const { deptList } = authStore
  interface IQuery {
    startDate: string|any;
    endDate: string|any;
  }
  const [query, setQuery] = useState<IQuery>({
    // deptCode: '',
    startDate: _currentMonth[0].format('YYYY-MM-DD'),
    endDate: _currentMonth[1].format('YYYY-MM-DD'),
  })
  const [data, setData] = useState([] as any[])
  const [chartData, setChartData] = useState([] as any[])
  const [chartHeight, setChartHeight] = useState(chartHeightCol())
  const [chartVisible, setChartVisible] = useState(false)
  const [searchMode, setSearchMode] = useState('year')
  const [mode, setMode] = useState('year')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [format, setFormat] = useState('YYYY-MM-DD')
  const [lineData, setLineData] = useState({})
  // const [extraColumns, setExtraColumns] = useState([] as ColumnProps<any>[])
  
  // 表头数据类型
  interface IHeaderType {
    title: string;
    width: number;
    align: string;
    render?: (val: any, record: any, idx: number) => number;
    dataIndex: string;
  }
  const columns: ColumnProps<IHeaderType>[] = [
    {
      title: '序号',
      width: 90,
      dataIndex: 'wardName',
      align: 'center',
    },
    {
      title: '科室',
      width: 150,
      dataIndex: 'shoushu',
      align: 'center',
    },
    {
      title: '设备数量',
      width: 90,
      dataIndex: 'ruyuan',
      align: 'center',
    },
    {
      title: '使用情况',
      width: 90,
      dataIndex: 'ruyuanshoushu',
      align: 'center',
    },
  ]


  const handleSearch = () => getData()

  const getData = async () => {
    // setLoading(true)
    // // 获取发热患者
    // const result = await statisticsApi.countFeverPatient(query)
    // // 获取未发热患者
    // const noFever = await statisticsApi.countNoFeverPatient(query)
    // console.log('noFever', noFever)
    // let resultData = result.data
    // const rData = setResData(resultData)
    let data =[
      {
        wardName:'1',
        shoushu:'急症科',
        ruyuan:'8',
        ruyuanshoushu:'正常：7，停用：1'
      },
      {
        wardName:'2',
        shoushu:'骨科单元',
        ruyuan:'5',
        ruyuanshoushu:'正常：5，停用：0'
      },
      {
        wardName:'3',
        shoushu:'妇科单元',
        ruyuan:'11',
        ruyuanshoushu:'正常：11，停用：0'
      },
      {
        wardName:'4',
        shoushu:'儿科单元',
        ruyuan:'4',
        ruyuanshoushu:'正常：4，停用：0'
      },
      {
        wardName:'5',
        shoushu:'新生儿单元',
        ruyuan:'9',
        ruyuanshoushu:'正常：8，停用：1'
      },
      {
        wardName:'6',
        shoushu:'ICU重症室',
        ruyuan:'12',
        ruyuanshoushu:'正常：10，停用：2'
      },
      {
        wardName:'7',
        shoushu:'泌尿外科',
        ruyuan:'3',
        ruyuanshoushu:'正常：3，停用：0'
      },
      {
        wardName:'8',
        shoushu:'产科-产前产房护理单元',
        ruyuan:'6',
        ruyuanshoushu:'正常：6，停用：0'
      },
      {
        wardName:'9',
        shoushu:'产科-产休二区护理单元',
        ruyuan:'4',
        ruyuanshoushu:'正常：4，停用：0'
      },
      {
        wardName:'10',
        shoushu:'产科-产休一区护理单元',
        ruyuan:'8',
        ruyuanshoushu:'正常：7，停用：1'
      },
      {
        wardName:'11',
        shoushu:'产科护理单元',
        ruyuan:'5',
        ruyuanshoushu:'正常：4，停用：1'
      },
      {
        wardName:'12',
        shoushu:'感染科护理单元',
        ruyuan:'3',
        ruyuanshoushu:'正常：2，停用：1'
      },
      {
        wardName:'13',
        shoushu:'高压氧护理单元',
        ruyuan:'5',
        ruyuanshoushu:'正常：2，停用：3'
      },
      {
        wardName:'14',
        shoushu:'呼吸与危重症医学科护理单元',
        ruyuan:'10',
        ruyuanshoushu:'正常：8，停用：2'
      },
      {
        wardName:'15',
        shoushu:'甲状腺乳腺科护理单元',
        ruyuan:'11',
        ruyuanshoushu:'正常：11，停用：0'
      },
      {
        wardName:'16',
        shoushu:'健康体检中心护理单元',
        ruyuan:'1',
        ruyuanshoushu:'正常：1，停用：0'
      },
      {
        wardName:'17',
        shoushu:'介入室、放射科护理单元',
        ruyuan:'2',
        ruyuanshoushu:'正常：2，停用：0'
      },
      {
        wardName:'18',
        shoushu:'康复医学科护理单元',
        ruyuan:'7',
        ruyuanshoushu:'正常：6，停用：1'
      },
      {
        wardName:'19',
        shoushu:'内分泌肾内科护理单元',
        ruyuan:'9',
        ruyuanshoushu:'正常：9，停用：0'
      },
      {
        wardName:'20',
        shoushu:'消化内科护理单元',
        ruyuan:'1',
        ruyuanshoushu:'正常：1，停用：0'
      },
      {
        wardName:'21',
        shoushu:'眼耳鼻喉科护理单元',
        ruyuan:'4',
        ruyuanshoushu:'正常：4，停用：0'
      }
    ]
    
    
    setData(data)
    // setData(rData.tableData)
    // setChartData(rData.chartData)
    // // 获取折线图数据
    // resultData.nofever = noFever.data
    // const lineData = getLineData(resultData, query, searchMode)
    // console.log('lineData', lineData)
    // setLineData(lineData)
    // setSearchMode(lineData.searchMode || 'year')
    // setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [query])


  useEffect(() => {
    let resizeCallBack = () => setChartHeight(chartHeightCol())

    window.addEventListener('resize', resizeCallBack)
    return () => {
      window.removeEventListener('resize', resizeCallBack)
    }
  }, [])
  return <Con> 
    <CommonLayout
    header={<div>
      <span>日期：</span>
      {(!chartVisible || searchMode == 'day') && <RangePicker
        className="content-item"
        style={{ width: 220 }}
        value={[moment(query.startDate), moment(query.endDate)]}
        ranges={{
          '本月': _currentMonth,
          '本季度': _currentQuater,
          '本年度': _currentYear,
        }}
        onChange={(payload: any) => {
          setQuery({
            ...query,
            startDate: payload[0].format('YYYY-MM-DD'),
            endDate: payload[1].format('YYYY-MM-DD'),
          })
        }}
        allowClear={false} />}
      {(chartVisible && searchMode != 'day') && 
        <RangePicker
          className="content-item"
          style={{ width: 220 }}
          value={[moment(query.startDate), moment(query.endDate)]}
          format={format}
          mode={[mode, mode]}
          open={open}
          ranges={{
            '本月': _currentMonth,
            '本季度': _currentQuater,
            '本年度': _currentYear,
          }}
          onOpenChange={(status) => {
            // console.log('status', status)
            if(status){
              setOpen(true)
            } else {
              setOpen(false)
            }
          }} 
          onPanelChange={(payload: any) => {
            console.log('payload', payload)
            setOpen(false)
            setQuery({
              ...query,
              startDate: payload[0].format('YYYY-MM-DD'),
              endDate: payload[1].format('YYYY-MM-DD'),
            })
          }}
          allowClear={false} 
        />
      }
      <Button type="primary" onClick={handleSearch}>查询</Button>
      
    </div>}
    body={
    <Spin spinning={loading}>
      <div className="main-title">病区设备统计</div>
      {/* <div className="right-group">
        <Radio.Group
          size="small"
          buttonStyle="solid"
          value={chartVisible}
          onChange={(e) => {
            setChartVisible(e.target.value)
            if (e.target.value) {
              setFormat('YYYY')
              setSearchMode(searchMode)
            } else {
              setFormat('YYYY-MM-DD')
              setSearchMode('')
            }
          }}>
        </Radio.Group>
      </div> */}
      {<BaseTable
        rowClassName={(record, index) => {
          if (index % 2 == 0) return 'singleRow'
          else return 'evenRow'
        }}
        expandRowByClick={true}
        bordered={false}
        expandIconAsCell={false}
        expandIconColumnIndex={-1}
        surplusWidth={500}
        surplusHeight={300}
        columns={columns}
        dataSource={data} />}
    </Spin>} />
  </Con> 
})

const Con = styled.div`
  #baseTable {
    padding: 0px;
    .ant-table-wrapper {
      td {
        padding: 0px;
      }
    }
  }
  #baseTable .ant-table-body #baseTable .ant-table-body {
    overflow: hidden!important;
  }
  .subTable {
    background-color: rgba(47, 46, 63, 0.08);
  }
  .chartBtnGroup {
    margin-left: 50px;
  }
  .singleRow, .evenRow {
    cursor: pointer;
  }
  .evenRow {
    background-color: rgba(247, 247, 247, 1);
  }
  
  
`