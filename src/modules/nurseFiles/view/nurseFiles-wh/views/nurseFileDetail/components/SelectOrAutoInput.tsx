import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { nurseFileDetailViewModal, DictName } from '../NurseFileDetailViewModal'
import { AutoComplete, Select } from 'src/vendors/antd'
export interface Props {
  dict?: DictName | '全部科室'
  dictList?: any[]
  onChange?: any
  value?: any
}

export default function SelectOrAutoInput(props: Props) {
  let { dict, dictList, onChange, value } = props
  let list = dictList ? dictList : dict ? nurseFileDetailViewModal.getDict(dict) : []
  if (list.find((item: any) => item.name == '其他')) {
    return (
      <AutoComplete
        value={value}
        dataSource={list.map((item) => item.name)}
        onChange={(value: any) => onChange && onChange(value)}
      />
    )
  } else {
    return (
      <Select onChange={(value: any) => onChange && onChange(value)} allowClear={true} value={value}>
        {list.map((item) => (
          <Select.Option value={item.name} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    )
  }
}
const Wrapper = styled.div``
