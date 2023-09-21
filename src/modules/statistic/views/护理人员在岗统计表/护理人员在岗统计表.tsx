import styled from 'styled-components'
import React, { useState, useEffect,useRef } from 'react'
import { Button, DatePicker, Radio, Select, Spin,message } from 'antd'
import CommonLayout from './../../common/CommonLayout'
import { observer } from 'mobx-react'
import { appStore, authStore } from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import { statisticsApi } from './../../api/StatisticsApi'
import { ColumnProps } from 'antd/lib/table'
import moment from 'src/vendors/moment'
import printing from "printing";
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import {Con} from 'src/modules/statistic/common/css/CommonLayout.ts';
import { colums } from "./utils"

const RangePicker = DatePicker.RangePicker

const Option = Select.Option

export interface Props { }

export default observer(function 护理人员在岗统计表() {
  let _currentMonth = currentMonth()

  let _currentQuater = currentQuater()

  let _currentYear = currentYear()

  const [query, setQuery] = useState({
    startTime: _currentMonth[0].format('YYYY-MM-DD'),
    endTime: _currentMonth[1].format('YYYY-MM-DD'),
  })

  const [data, setData] = useState([] as any)

  const [loading, setLoading] = useState(false)
  const tableRef = useRef<HTMLDivElement | null>(null);

  const columns:ColumnProps<any>[] = colums

  const handleSearch = () => getData()

  const getData = () => {
    setLoading(true)
    statisticsApi.countDutyNurse(query).then(res=>{
      setLoading(false)
      if(res.data) setData(res.data)
    },()=>setLoading(false))
  }

  useEffect(() => {
    getData()
  }, [query])

  const exportPdf = ()=>{
    printing(tableRef.current!, {
      injectGlobalCss: true,
      scanStyles: false,
      css: `
        @page {
          size:landscape;
          margin: 10px;
        }
        .ant-table-body{
          max-height: none !important;
          height: auto !important;
        }
        .tableBox{
          height:770px;
          overflow:hidden;
          page-break-after: always;
        }
      `,
    });
  }

  return <CommonLayout
    header={<div>
      <RangePicker
        className="content-item"
        style={{ width: 220 }}
        value={[moment(query.startTime), moment(query.endTime)]}
        ranges={{
          '本月': _currentMonth,
          '本季度': _currentQuater,
          '本年度': _currentYear,
        }}
        onChange={(payload: any) => {
          setQuery({
            ...query,
            startTime: payload[0].format('YYYY-MM-DD'),
            endTime: payload[1].format('YYYY-MM-DD'),
          })
        }}
        allowClear={false} />
      <Button type="primary" onClick={handleSearch}>查询</Button>
      {['jmfy'].includes(appStore.HOSPITAL_ID) && <Button type="primary" onClick={exportPdf}>导出pdf</Button>}
    </div>}
      body={<Spin spinning={loading}>
        <Con ref={tableRef} className="tableBox">
          <div className='main-title'>护理人员在岗统计表</div>
          <div className='sub-title'>统计日期：{query.startTime} 至 {query.endTime}</div>
          <BaseTable
            surplusWidth={500}
            surplusHeight={320}
            columns={columns}
            dataSource={data} />
        </Con>
      </Spin>} 
      />
})