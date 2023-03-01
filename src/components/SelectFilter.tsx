import { Select } from 'antd'
import { SelectProps } from 'antd/es/select'
import React from 'react'
import { Obj } from 'src/libs/types'
const { Option } = Select
export interface configIn {
  name: string,
  value: string
}
export interface Props extends SelectProps {
  list: Obj[]
  configKey?: configIn
}
/**默认搜索功能的select */
export default function (props: Props) {
  const {list, configKey = { value: 'code', name: 'name'}, ...other} = props
  return (
    <Select allowClear showSearch filterOption={(input: any, option: any) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    } {...other}>
      {
        list.map(v => (
          <Option key={v[configKey.value]} value={v[configKey.value]}>{v[configKey.name]}</Option>
        ))
      }
    </Select>
  )
}

