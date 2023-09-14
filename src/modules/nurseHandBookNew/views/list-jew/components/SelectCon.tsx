import { Button, DatePicker, Select } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import YearPicker from 'src/components/YearPicker'
import { Obj } from 'src/libs/types'
import { authStore } from 'src/stores'
import styled from 'styled-components'
import { STATUS_LIST } from '../utils/enums'
import {quarterList, quarterYear} from "src/enums/date";
const { Option } = Select

const dateFormat = 'YYYY-MM-DD';
export interface Props extends Obj {
  query: Obj
  setQuery: (data: Obj) => void
  openCreate: () => void
  title: string
  formList: Obj[]
  openAudit?: () => void
}
/**搜索组件 */
export default observer(function (props: Props) {
  const { query, openCreate, setQuery, title, formList, openAudit } = props
  const changeQuery = (e: any, key: string) => {
    if (key === 'date') {
      const [d1, d2] = e
      setQuery({
        ...query,
        startTime: d1 ? d1 : null,
        endTime: d2 ? d2 : null,
      })
      return
    }
    setQuery({
      ...query,
      [key]:  e
    })
  }
    const monthList = (() => {
        let currentMonth = 12;
        let monthArr = []
        while (currentMonth--) {
            monthArr.push(currentMonth + 1)
        }
        return monthArr
    })()
  return (
    <Wrapper>
      <PageTitle>{title}</PageTitle>
      <Place />
      <span className='label'>科室:</span>
      <Select value={query.deptCode} onChange={(e: any) => { changeQuery(e, 'deptCode') }}>
        <Option key={0} value={''}>全部</Option>
        {
          authStore.deptList.map(v => (
            <Option key={v.code} value={v.code}>{v.name}</Option>
          ))
        }</Select>
      {query.menuCode !== undefined && <>
        <span className='label'>记录表:</span>
        <Select value={query.menuCode} onChange={(e: any) => { changeQuery(e, 'menuCode') }}>
          <Option key={'all'} value={''}>全部</Option>
          {
            formList.map(v => (
              <Option key={v.menuCode} value={v.menuCode}>{v.name}</Option>
            ))
          }
        </Select>
      </>
      }
      {query.hasOwnProperty('year') && <>
        <span className='label'>年份:</span>
        <YearPicker value={query.year} onChange={(e: any) => { changeQuery(e, 'year') }} />
      </>}
      {query.startTime !== undefined && <>
        <span className='label'>日期:</span>
        <DatePicker.RangePicker format={dateFormat} value={[query.startTime, query.endTime]} onChange={(e: any) => { changeQuery(e, 'date') }} />
      </>
      }
        {
            query.quarter !==undefined &&
            <>
            <span>季度:</span>
            <Select
                value={query.quarter}
                onChange={(quarter: string) =>  changeQuery(quarter, 'quarter')}>
             {quarterList.map((quarter: string) => <Option value={`${quarter}`} key={quarter}>{quarter}</Option>)}
            </Select>
            </>

        }
        {query.hasOwnProperty('month') &&
            <>
                <span className='label'>月份:</span>
                <Select
                    value={query.month}
                    onChange={(month: string) =>  changeQuery(month, 'month')}>
                    {monthList.map((month: number) => <Option value={`${month}`} key={month}>{month}</Option>)}
                </Select>
            </>}
        {query.hasOwnProperty('halfYear') &&
            <>
                <span className='label'>年度:</span>
                <Select
                    value={query.halfYear}
                    onChange={(halfYear: string) =>  changeQuery(halfYear, 'halfYear')}>
                    {quarterYear.map((halfYear: string) => <Option value={`${halfYear}`} key={halfYear}>{halfYear}</Option>)}
                </Select>
            </>}
      <span className='label'>状态:</span>
      <Select value={query.status} onChange={(e: any) => { changeQuery(e, 'status') }}>
        {
          STATUS_LIST.map(v => (
            <Option key={v.value} value={v.value}>{v.label}</Option>
          ))
        }
      </Select>
      <Button type='primary' onClick={openCreate}>创建</Button>
      <Button type='primary' onClick={openAudit}>批量审批</Button>
    </Wrapper>
  )
})

const Wrapper: any = styled(PageHeader)`
  .ant-calendar-picker {
    width: 200px;
  }
`