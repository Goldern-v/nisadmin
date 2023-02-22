import { Button, DatePicker, Input, Select } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import YearPicker from 'src/components/YearPicker'
import { monthList } from 'src/enums/date'
import { Obj } from 'src/libs/types'
import { authStore } from 'src/stores'
import styled from 'styled-components'
import { STATUS_LIST } from '../utils/enums'
const { Option } = Select

const dateFormat = 'YYYY-MM-DD';
export interface Props {
  query: Obj
  setQuery: (data: Obj) => void
  openCreate: () => void,
  title: string
}
/**搜索组件 */
export default observer(function (props: Props) {
  const { query, openCreate, setQuery, title } = props
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
      [key]: e
    })
  }
  return (
    <Wrapper>
      <PageTitle>{title}</PageTitle>
      <Place />
      {query.year !== undefined && <>
        <span className='label'>年份:</span>
        <YearPicker className='select-year' value={query.year} onChange={(e: any) => { changeQuery(e, 'year') }} />
      </>
      }
      {query.month !== undefined && <>
        <span className='label'>月份:</span>
        <Select value={query.month} onChange={(e: any) => { changeQuery(e, 'month') }}>
          {
            monthList.map((v: string, i: number) => (
              <Option key={i} value={`${i + 1}`}>{v}</Option>
            ))
          }
        </Select>
      </>
      }
      {query.startTime !== undefined && <>
        <span className='label'>日期:</span>
        <DatePicker.RangePicker format={dateFormat} value={[query.startTime, query.endTime]} onChange={(e: any) => { changeQuery(e, 'date') }} />
      </>
      }
      <span className='label'>科室:</span>
      <Select value={query.deptCode} onChange={(e: any) => { changeQuery(e, 'deptCode') }}>
        <Option key={0} value={''}>全部</Option>
        {
          authStore.deptList.map(v => (
            <Option key={v.code} value={v.code}>{v.name}</Option>
          ))
        }
      </Select>
      <span className='label'>状态:</span>
      <Select value={query.status} onChange={(e: any) => { changeQuery(e, 'status') }}>
        {
          STATUS_LIST.map(v => (
            <Option key={v.value} value={v.value}>{v.label}</Option>
          ))
        }
      </Select>
      <Input className='select-kw' placeholder='创建人关键字' value={query.keyword} />
      <Button type='primary' onClick={openCreate}>创建</Button>
    </Wrapper>
  )
})

const Wrapper: any = styled(PageHeader)`

.select-kw {
  width: 120px;
  margin-left: 15px;
}
`