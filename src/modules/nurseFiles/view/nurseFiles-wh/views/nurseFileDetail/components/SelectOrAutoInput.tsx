import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { nurseFileDetailViewModal, DictName } from '../NurseFileDetailViewModal'
import { AutoComplete, Select } from 'src/vendors/antd'
export interface Props {
  dict: DictName | '全部科室'
  onChange?: any
}

export default function SelectOrAutoInput(props: Props) {
  let { dict, onChange } = props
  if (nurseFileDetailViewModal.getDict(dict).find((item: any) => item.name == '其他')) {
    return (
      <AutoComplete
        dataSource={nurseFileDetailViewModal.getDict(dict).map((item) => item.name)}
        onChange={(value: any) => onChange && onChange(value)}
      />
    )
  } else {
    return (
      <Select onChange={(value: any) => onChange && onChange(value)}>
        {nurseFileDetailViewModal.getDict(dict).map((item) => (
          <Select.Option value={item.name} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    )
  }
}
const Wrapper = styled.div``
