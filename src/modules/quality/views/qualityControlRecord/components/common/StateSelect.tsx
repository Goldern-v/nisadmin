/** 状态选择器  */
import styled from 'styled-components'
import React from 'react'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { qualityControlRecordVM } from 'src/modules/quality/views/qualityControlRecord/QualityControlRecordVM'

export interface DeptType {
  code: string
  name: string
}

interface Props {
  refreshData: any
}
export default observer(function StateSelect(props: Props) {
  const onChange = (value: string) => {
    qualityControlRecordVM.filterState = value
    props.refreshData()
  }

  return (
    <Wrapper>
      <Select
        value={qualityControlRecordVM.filterState}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        style={{ width: 140 }}
        onChange={onChange}
      >
        <Select.Option key='' value=''>
          全部
        </Select.Option>
        {qualityControlRecordVM.stateSelectList.map((item: DeptType) => (
          <Select.Option key={item.code} value={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Wrapper>
  )
})
const Wrapper = styled.div``
