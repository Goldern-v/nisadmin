import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Table, Button, DatePicker, Radio, Spin } from 'antd'
import CommonLayout, { ChartCon } from './../../common/CommonLayout'
import { observer } from 'mobx-react'
import { appStore, authStore } from 'src/stores'
import CircleChart from './../../components/CircleChart'
import LineChart from './../../components/LineChart'
import BaseTable from 'src/components/BaseTable'
import { statisticsApi } from './../../api/StatisticsApi'
import { ColumnProps } from 'antd/lib/table'
import { chartHeightCol } from '../../utils/chartHeightCol'
import { delWithResData } from '../../utils/dealWithData'
import moment from 'src/vendors/moment'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
const RangePicker = DatePicker.RangePicker

export interface Props { }

export default observer(function FeverPatient() {
  let _currentMonth = currentMonth()

  let _currentQuater = currentQuater()

  let _currentYear = currentYear()
  // const { deptList } = authStore
  const [query, setQuery] = useState({
    deptCode: '',
    startDate: _currentMonth[0].format('YYYY-MM-DD'),
    endDate: _currentMonth[1].format('YYYY-MM-DD'),
  })
  const [data, setData] = useState([] as any[])
  const [chartData, setChartData] = useState([] as { type: string, value: number }[])
  const [chartHeight, setChartHeight] = useState(chartHeightCol())
  const [chartVisible, setChartVisible] = useState(false)
  const [chartWithDate, setDateBtnVisible] = useState('year')

  const [loading, setLoading] = useState(false)

  const [extraColumns, setExtraColumns] = useState([] as ColumnProps<any>[])
  
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
      // render: (val: any, record: any, idx: number) => idx + 1
    },
    {
      title: '手术三天',
      width: 90,
      dataIndex: 'operation',
      align: 'center',
    },
    {
      title: '入院三天',
      width: 90,
      dataIndex: 'hospitalized',
      align: 'center',
    },
    {
      title: '入院三天内术后',
      width: 90,
      dataIndex: 'postoperative',
      align: 'center',
    },
    {
      title: '其他',
      width: 90,
      dataIndex: 'other',
      align: 'center',
    },
  ]
  interface ITableData {
    key: number;
    wardName: string;
    operation: number;
    hospitalized: number;
    postoperative: number;
    other: number;
  }
  const tableData: ITableData[] = [
    {
      key: 1,
      wardName: '妇科护理单元',
      operation: 2,
      hospitalized: 2,
      postoperative: 2,
      other: 3,
      
    },
    {
      key: 2,
      wardName: '产科护理单元',
      operation: 2,
      hospitalized: 2,
      postoperative: 2,
      other: 3,
    },
  ];

  const expandedRowRender = () => {
    const columnsTwo: ColumnProps<IHeaderType>[] = [
      { title: '', dataIndex: '', key: 'empty', width: 140, align: 'center' },
      { title: '姓名-床号', dataIndex: 'patientNameOne', key: 'patientNameOne', width: 90, align: 'center'},
      { title: 'Name', dataIndex: 'patientNameTwo', key: 'patientNameTwo', width: 90, align: 'center' },
      { title: 'Name', dataIndex: 'patientNameThree', key: 'patientNameThree', width: 90, align: 'center' },
      { title: 'Name', dataIndex: 'patientNameFour', key: 'patientNameFour', width: 90, align: 'center' },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i + 'name',
        patientNameOne: '哈哈哈 13床',
        patientNameTwo: '嘻嘻嘻 12床',
        patientNameThree: '呵呵呵 9床',
        patientNameFour: '喵喵喵 1床',
      });
    }
    return <BaseTable 
            className='subTable'
            scroll={{y: false}}
            surplusWidth={500}
            bordered={false} 
            showHeader={false} 
            columns={columnsTwo} 
            dataSource={data} 
            pagination={false} 
          />
  };
  const handleSearch = () => getData()

  const getData = () => {
    setLoading(true)

    statisticsApi.countSex(query)
      .then((res: any) => {
        setLoading(false)

        let dataList = res.data
        if (dataList) {
          const {
            newExtraColumns,
            newChartData,
            newData,
          } = delWithResData({
            dataList
          })

          setExtraColumns(newExtraColumns)
          setChartData(newChartData)
          setData(newData)
        }
      }, () => setLoading(false))
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
      <RangePicker
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
        allowClear={false} />
      <Button type="primary" onClick={handleSearch}>查询</Button>
      {chartVisible && <Radio.Group
        className='chartBtnGroup'
        size="default"
        buttonStyle="solid"
        value={chartWithDate}
        onChange={(e) => setDateBtnVisible(e.target.value)}>
        <Radio.Button value={'year'}>年</Radio.Button>
        <Radio.Button value={'quarter'}>季度</Radio.Button>
        <Radio.Button value={'month'}>月份</Radio.Button>
        <Radio.Button value={'day'}>日</Radio.Button>
      </Radio.Group>}
    </div>}
    body={<Spin spinning={loading}>
      <div className="main-title">多种类型发热患者人数统计</div>
      <div className="right-group">
        <Radio.Group
          size="small"
          buttonStyle="solid"
          value={chartVisible}
          onChange={(e) => setChartVisible(e.target.value)}>
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
        surplusHeight={300}
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={tableData} />}
      {chartVisible && 
        <ChartCon style={{ height: `${chartHeight || 0}px` }}>
          {chartData.length > 0 && <CircleChart
            chartHeight={chartHeight}
            sourceData={chartData} />}
          {chartData.length <= 0 && <div className="no-data">
            <img
              style={{ width: '100px' }}
              src={require('src/modules/statistic/img/noData.png')} />
            <br />
            <span>暂无数据</span>
          </div>}
          <LineChart ></LineChart>
        </ChartCon>}
    </Spin>} />
  </Con> 
})

const Con = styled.div`
  .bHdIpD#baseTable {
    padding: 0px;
    .ant-table-wrapper {
      td {
        padding: 0px;
      }
    }
  }
  .bHdIpD#baseTable .ant-table-body .bHdIpD#baseTable .ant-table-body {
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