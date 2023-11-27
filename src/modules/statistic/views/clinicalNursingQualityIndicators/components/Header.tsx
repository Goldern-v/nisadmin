import React from 'react'
import { Button, Cascader, Checkbox, Select } from 'antd'
import { SearchCon } from 'src/modules/statistic/common/style'
import styled from 'styled-components'
import YearPicker from 'src/components/YearPicker'
import { Obj } from 'src/libs/types'
import YearMonthRangePicker from 'src/components/YearMonthRangePicker'
import moment from 'moment'
import { quarterList } from 'src/enums/date'
interface Props {
  getTableData: () => void,
  query: Obj,
  setQuery: Function,
  areaList: Obj[],
  blockList: any[],
  exportExcel: Function
}
const types = [
  { code: 1, name: '按全院' },
  { code: 3, name: '按科室' },
]
const timeTypes = [
  { code: 1, name: '按年度' },
  { code: 2, name: '按季度' },
  { code: 3, name: '按月度' },
]
export default function (props: Props) {
  const { getTableData, query, setQuery, areaList, blockList, exportExcel } = props

  const onChange = (value: any, key: string) => {
    const newQuery = { ...query, [key]: value }
    setQuery(newQuery)
  }

  return (
    <Wrapper>
      <Select value={query.type} onChange={(e: any) => onChange(e, 'type')}>
        {types.map((v, i) => (
          <Select.Option value={v.code} key={i}>{v.name}</Select.Option>
        ))}
      </Select>
      {query.type === 3 && <Select value={query.wardCode} onChange={(e: any) => onChange(e, 'wardCode')}>
        {areaList.map((v, i) => (
          <Select.Option value={v.code} key={i}>{v.name}</Select.Option>
        ))}
      </Select>}
      <Select value={query.timeType} onChange={(e: any) => onChange(e, 'timeType')}>
        {timeTypes.map((v, i) => (
          <Select.Option value={v.code} key={i}>{v.name}</Select.Option>
        ))}
      </Select>
      {query.timeType !== 3 && <YearPicker value={query.year} onChange={(e: any) => setQuery({ ...query, year: e })} />}
      {query.type === 3 && <Select value={query.qcRegisterBlockId} onChange={(e: any) => onChange(e, 'qcRegisterBlockId')}>
        {blockList.map((item: any) => (
          <Select.Option value={item.id} key={item.id}>
            {item.registerName +
              " " +
              moment(item.createTime).format("MM-DD")}
          </Select.Option>
        ))}
      </Select>}
      {query.timeType === 2 && <Select value={query.quarter} mode="multiple" onChange={(e: any) => onChange(e, 'quarter')}>
        {quarterList.map((v, i) => (
          <Select.Option value={i + 1} key={i}>{v}</Select.Option>
        ))}
      </Select>}
      {query.timeType === 3 && <YearMonthRangePicker value={query.months} onChange={(e: any) => onChange(e, 'months')} />}
      <Button type='primary' style={{ margin: '0 0 0 60px', width: '90px' }} onClick={getTableData}>
        查询
      </Button>
      <Button style={{ margin: '0 10px', width: '90px' }} onClick={() => exportExcel()}>
        导出Excel
      </Button>
    </Wrapper>
  )
}
const Wrapper = styled(SearchCon)`
.ant-cascader-picker {
  margin-left: 10px;
}
`
