import styled from 'styled-components'
import React, { useState, useEffect,useRef } from 'react'
import { Button, DatePicker, Radio, Select, Spin } from 'antd'
import CommonLayout, { ChartCon } from './../../common/CommonLayout'
import { observer } from 'mobx-react'
import { appStore, authStore } from 'src/stores'
import CircleChart from './../../components/CircleChart'
import BaseTable from 'src/components/BaseTable'
import { statisticsApi } from './../../api/StatisticsApi'
import { ColumnProps } from 'antd/lib/table'
import moment from 'src/vendors/moment'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import printing from "printing";
import {Con} from 'src/modules/statistic/common/css/CommonLayout.ts';
import { chartHeightCol } from '../../utils/chartHeightCol'
import PrintTable from '../printTable/printTable'
import { delWithResData } from '../../utils/dealWithData'

const RangePicker = DatePicker.RangePicker

const Option = Select.Option

export interface Props { }

export default observer(function 护士在职状态分析() {
  let _currentMonth = currentMonth()

  let _currentQuater = currentQuater()

  let _currentYear = currentYear()

  const { deptList } = authStore
  const [query, setQuery] = useState({
    deptCode:['whyx','whhk'].includes(appStore.HOSPITAL_ID) ? authStore.defaultDeptCode:"",
    startDate: _currentMonth[0].format('YYYY-MM-DD'),
    endDate: _currentMonth[1].format('YYYY-MM-DD'),
  })

  const [data, setData] = useState([] as any)
  const [chartData, setChartData] = useState([] as { type: string, value: number }[])
  const [chartHeight, setChartHeight] = useState(chartHeightCol())
  const [chartVisible, setChartVisible] = useState(false)
  const [isPrint, setIsPrint] = useState(false)
  const [chartsImg, setChartsImg] = useState<any[]>([])
  const tablePrintRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
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

    statisticsApi.countStatus(query)
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
      let current = chartVisible ? tableRef.current! : tablePrintRef.current!
      !chartVisible && (current.style.display = 'block')
      printing(current, {
        injectGlobalCss: true,
        scanStyles: false,
        css: `
          @page {
            margin: 10px;
          }
          .right-group{
            display:none
          }
          .chart-img {
            width: 100%;
            object-fit: contain;
            height: 100%;
          }
        `,
      }).then(()=>{
        setIsPrint(false)
      });
      tablePrintRef.current!.style.display = 'none'
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

  return <CommonLayout
    header={<div>
      <Select
        style={{ minWidth: 180 }}
        className="content-item"
        value={query.deptCode}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(deptCode: string) => setQuery({ ...query, deptCode })}>
        {
          appStore.hisMatch({
            map: {
              "whyx,whhk":authStore.isDepartmentYaXin &&<Option  value={''}>全院</Option>,
              other:<Option value={''}>全院</Option>
            },
            vague: true
          })  
        }
        {deptList.map((dept: any, idx: number) =>
          <Option key={idx} value={dept.code}>{dept.name}</Option>
        )}
      </Select>
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
      {['jmfy','hj'].includes(appStore.HOSPITAL_ID) && <Button type="primary" onClick={exportPdf}>导出pdf</Button>}
    </div>}
    body={<Spin spinning={loading}>
      <Con ref={tableRef} className="tableBox">
        <div className="main-title">护士在职状态分析</div>
        <div className="sub-title">统计日期：{query.startDate} 至 {query.endDate}</div>
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
          surplusHeight={320}
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
        <div ref={tablePrintRef} style={{display:'none'}}>
          <PrintTable dataSource={data} columns={columns} title={'护士在职状态分析'}></PrintTable>
        </div>
      </Con>
    </Spin>} />
})