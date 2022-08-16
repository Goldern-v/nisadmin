/** 表单选择器  */
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { authStore } from 'src/stores'
import { qualityControlRecordApi } from 'src/modules/quality/views/qualityControlRecord/api/QualityControlRecordApi'
import { qualityControlRecordVM } from 'src/modules/quality/views/qualityControlRecord/QualityControlRecordVM'

export interface DeptType {
  code: string
  name: string
}

interface Props {
  refreshData?: any
}

export default observer(function FormSelect(props: Props) {
  const onChange = (value: string) => {
    console.log(value);
    qualityControlRecordVM.qcCode = value
    console.log(qualityControlRecordVM.qcCode);
    props.refreshData()
  }

  return (
    <Wrapper>
      <Select
        value={qualityControlRecordVM.qcCode}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        style={{ width: 180 }}
        onChange={onChange}
      >
        <Select.Option key='' value=''>
          全部
        </Select.Option>
        {qualityControlRecordVM.tableSelectList.map((item: any) => (
          <Select.Option key={item.qcCode} value={item.qcCode}>
            {item.qcName}
          </Select.Option>
        ))}
      </Select>
    </Wrapper>
  )
})
const Wrapper = styled.div``
