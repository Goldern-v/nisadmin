import React, { useState, useEffect,useRef } from 'react'
import {Button, DatePicker, Radio, Select, Spin} from 'antd'
import CommonLayout, { ChartCon } from '../../common/CommonLayout'
import { observer } from 'mobx-react'
import { appStore, authStore } from 'src/stores'
import CircleChart from '../../components/CircleChart'
import BaseTable from 'src/components/BaseTable'
import { statisticsApi } from '../../api/StatisticsApi'
import { ColumnProps } from 'antd/lib/table'
import { chartHeightCol } from '../../utils/chartHeightCol'
import { delWithResData } from '../../utils/dealWithData'
import printing from "printing";
import {Con} from 'src/modules/statistic/common/css/CommonLayout.ts';
import {currentMonth, currentQuater, currentYear} from "src/utils/date/rangeMethod";
import moment from "src/vendors/moment";
const RangePicker = DatePicker.RangePicker

const Option = Select.Option

export interface Props { }

export default observer(function 护士职称统计() {
  let _currentMonth = currentMonth()
  let _currentQuater = currentQuater()
  let _currentYear = currentYear()
  const { deptList } = authStore
  const [query, setQuery] = useState({
    deptCode: '',
    startDate: moment('1999-01-01').format('YYYY-MM-DD'),
    endDate: _currentMonth[1].format('YYYY-MM-DD'),
  })
  const [data, setData] = useState([] as any[])
  const [chartData, setChartData] = useState([] as { type: string, value: number }[])
  const [chartHeight, setChartHeight] = useState(chartHeightCol())
  const [chartVisible, setChartVisible] = useState(false)
  const [isPrint, setIsPrint] = useState(false)
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [chartsImg, setChartsImg] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [extraColumns, setExtraColumns] = useState([] as ColumnProps<any>[])

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (val: any, record: any, idx: number) => idx + 1
    },
    {
      title: '科室',
      width: 180,
      dataIndex: 'DEPTNAME',
      align: 'center',
    },
    {
      title: '护士人数',
      width: 60,
      dataIndex: 'NUM',
      align: 'center',
    },
    ...extraColumns,
  ]

  const handleSearch = () => getData()

  const getData = () => {
    setLoading(true)
    let jmfyQuery ={...query}
    statisticsApi.countTitle(appStore.HOSPITAL_ID !== 'jmfy'? {deptCode:query.deptCode}:jmfyQuery)
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
    let timer: any = null
    if (chartVisible) {
      timer = setTimeout(() => {
        let canvasEl = document.querySelectorAll('canvas') as any
        if (canvasEl.length) {
          let arr = []
          for (let i = 0; i < canvasEl.length; i++) {
            arr.push(canvasEl[i].toDataURL())
          }
          setChartsImg(arr)
        }
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [chartVisible])
  
  useEffect(() => {
    if(isPrint){
      setImg()
      printing(tableRef.current!, {
        injectGlobalCss: true,
        scanStyles: false,
        css: `
          @page {
            margin: 10px;
          }
          #baseTable{
            position: absolute;
            left: 0;
            top: 30px;
          }
          .ant-table-body{
            max-height: none !important;
            height: auto !important;
          }
          .tableBox{
            height:1100px;
            overflow:hidden;
            page-break-after: always;
          }
          .right-group{
            display:none
          }
          .chart-img {
            max-height: 260mm;
            width: 100%;
            object-fit: cover
          }
          .tableBox #baseTable .ant-table-wrapper td{
            height: 40px !important;
          }
        `,
      }).then(()=>{
        setIsPrint(false)
      });
    }
  }, [isPrint])

  const exportPdf = ()=>{
    setIsPrint(true)
  }

  const setImg = () => {
    let imgEl = document.querySelectorAll('.chart-img') as any
    if (imgEl.length) {
      for (let i = 0; i < imgEl.length; i++) {
        chartsImg[i] && (imgEl[i].src = chartsImg[i])
      }
    }
  }

  useEffect(() => {
    let resizeCallBack = () => setChartHeight(chartHeightCol())

    window.addEventListener('resize', resizeCallBack)
    return () => {
      window.removeEventListener('resize', resizeCallBack)
    }
  }, [])

  let pathArr = appStore.location.pathname.split('/')
  let formName = pathArr[pathArr.length - 1]

  return <CommonLayout
    header={<div>
      <Select
        style={{ minWidth: 180 }}
        className="content-item"
        value={query.deptCode}
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(deptCode: string) => setQuery({ ...query, deptCode })}>
        <Option value={''}>全院</Option>
        {deptList.map((dept: any, idx: number) =>
          <Option key={idx} value={dept.code}>{dept.name}</Option>
        )}
      </Select>
      {appStore.HOSPITAL_ID == 'jmfy'&& <RangePicker
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
      <Button type="primary" onClick={handleSearch}>查询</Button>
      {['jmfy'].includes(appStore.HOSPITAL_ID) && <Button type="primary" onClick={exportPdf}>导出pdf</Button>}
    </div>}
    body={<Spin spinning={loading}>
      <Con ref={tableRef} className="tableBox">

        <div className="main-title">{formName || '科室护士明细表'}</div>
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
          surplusWidth={500}
          surplusHeight={300}
          columns={columns}
          dataSource={data} />}
        {chartVisible && <ChartCon style={{ height: `${chartHeight || 0}px` }}>
          {chartData.length > 0 && 
            !isPrint ?
            <CircleChart
              chartHeight={chartHeight}
              sourceData={chartData} />
              : <img className="chart-img" src={''} />
            }
          {chartData.length <= 0 && <div className="no-data">
            <img
              style={{ width: '100px' }}
              src={require('src/modules/statistic/img/noData.png')} />
            <br />
            <span>暂无数据</span>
          </div>}
        </ChartCon>}
      </Con>
    </Spin>} />
})