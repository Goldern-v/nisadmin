import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Radio, Spin } from 'antd'
import CommonLayout, { ChartCon } from './../../common/CommonLayout'
import { observer } from 'mobx-react'
import { appStore } from 'src/stores'
import CircleChart from './components/CircleChart'
import LineChart from './components/LineChart'
import BaseTable from 'src/components/BaseTable'
import { statisticsApi } from './../../api/StatisticsApi'
import { ColumnProps } from 'antd/lib/table'
import { chartHeightCol } from '../../utils/chartHeightCol'
import { setResData, getLineData } from './dealWithData'
import moment from 'src/vendors/moment'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
const RangePicker = DatePicker.RangePicker
export interface Props { }

export default observer(function FeverPatient() {
  let _currentMonth = currentMonth()

  let _currentQuater = currentQuater()

  let _currentYear = currentYear()
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
      title: '',
      width: 140,
      dataIndex: 'wardName',
      align: 'center',
    },
    {
      title: '手术三天',
      width: 90,
      dataIndex: 'shoushu',
      align: 'center',
    },
    {
      title: '入院三天',
      width: 90,
      dataIndex: 'ruyuan',
      align: 'center',
    },
    {
      title: '入院三天内术后',
      width: 90,
      dataIndex: 'ruyuanshoushu',
      align: 'center',
    },
    {
      title: '其他',
      width: 90,
      dataIndex: 'qita',
      align: 'center',
    },
    ...appStore.hisMatch({
      map: {
        gzsrm: [
          {
            title: '患者总数',
            width: 90,
            dataIndex: 'inHospitalCount',
            align: 'center',
            render:(value:any,row:any,index:number)=>{
              return <span>{row.shoushu+row.ruyuan+row.ruyuanshoushu+row.qita}</span>
            }
          }
        ],
        other: []
      }
    })
  ]

  const expandedRowRender = (record: any): JSX.Element => {
    const columnsTwo: ColumnProps<IHeaderType>[] = [
      { title: '', dataIndex: '', key: 'empty', width: 140, align: 'center' },
      { title: '姓名-床号', dataIndex: 'patientNameOne', key: 'patientNameOne', width: 90, align: 'center'},
      { title: 'Name', dataIndex: 'patientNameTwo', key: 'patientNameTwo', width: 90, align: 'center' },
      { title: 'Name', dataIndex: 'patientNameThree', key: 'patientNameThree', width: 90, align: 'center' },
      { title: 'Name', dataIndex: 'patientNameFour', key: 'patientNameFour', width: 90, align: 'center' },
      ...appStore.hisMatch({
        map: {
          gzsrm: [
            {
              title: '患者总数',
              width: 90,
              dataIndex: 'hahah',
              align: 'center'
            }
          ],
          other: []
        }
      })
    ];
    
    return <BaseTable 
            className='subTable'
            scroll={{y: false}}
            surplusWidth={500}
            bordered={false} 
            showHeader={false} 
            columns={columnsTwo} 
            dataSource={record.option} 
            pagination={false} 
          />
  };
  const handleSearch = () => getData()

  const getData = async () => {
    setLoading(true)
    // 获取发热患者
    const result = await statisticsApi.countFeverPatient(query)
    // 获取未发热患者
    const noFever = await statisticsApi.countNoFeverPatient(query)
    let resultData = result.data
    const rData = setResData(resultData)
    setData(rData.tableData)
    setChartData(rData.chartData)
    // 获取折线图数据
    resultData.nofever = noFever.data
    const lineData = getLineData(resultData, query, searchMode)
    // console.log('lineData', lineData)
    setLineData(lineData)
    setSearchMode(lineData.searchMode || 'year')
    setLoading(false)
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
            // console.log('payload', payload)
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
      {chartVisible && <Radio.Group
        className='chartBtnGroup'
        size="default"
        buttonStyle="solid"
        value={searchMode}
        onChange={(e) => {
          setSearchMode(e.target.value)
          if (e.target.value === 'year')  {
            setFormat('YYYY')
            setMode('year')
          }
          if (e.target.value === 'month' || e.target.value === 'quarter') {
            setFormat('YYYY-MM')
            setMode('month')
          }
          if (e.target.value === 'day') {
            setFormat('YYYY-MM-DD')
            setMode('date')
          }
        }}>
        <Radio.Button value={'year'}>年</Radio.Button>
        <Radio.Button value={'quarter'}>季度</Radio.Button>
        <Radio.Button value={'month'}>月份</Radio.Button>
        <Radio.Button value={'day'}>日</Radio.Button>
      </Radio.Group>}
    </div>}
    body={
    <Spin spinning={loading}>
      <div className="main-title">多种类型发热患者人数统计</div>
      <div className="right-group">
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
          <Radio.Button value={false} >表格</Radio.Button>
          <Radio.Button value={true}>图表</Radio.Button>
        </Radio.Group>
      </div>
      {!chartVisible && <BaseTable
        rowClassName={(record, index) => {
          if (index % 2 == 0) return 'singleRow'
          else return 'evenRow'
        }}
        expandRowByClick={true}
        bordered={false}
        expandIconAsCell={false}
        expandIconColumnIndex={-1}
        surplusWidth={500}
        surplusHeight={250}
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={data} />}
      {chartVisible && 
        <ChartCon style={{ height: `${chartHeight || 0}px` }}>
          {chartData.length > 0 && 
            <div>
              <CircleChart
                chartHeight={chartHeight}
                sourceData={chartData} 
              />
              <LineChart 
                chartHeight={chartHeight}
                sourceData={lineData} 
              ></LineChart>
            </div>
          }
          {chartData.length <= 0 && 
            <div className="no-data">
              <img
                style={{ width: '100px' }}
                src={require('src/modules/statistic/img/noData.png')} />
              <br />
              <span>暂无数据</span>
            </div>
          }
        </ChartCon>
      }
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
