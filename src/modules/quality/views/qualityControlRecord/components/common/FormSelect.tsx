/** 表单选择器  */
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { authStore } from 'src/stores'
import { qualityControlRecordApi } from 'src/modules/quality/views/qualityControlRecord/api/QualityControlRecordApi'
import { qualityControlRecordVM } from 'src/modules/quality/views/qualityControlRecord/QualityControlRecordVM.ts'

export interface DeptType {
  code: string
  name: string
}

interface Props {
  refreshData?: any
}

export default observer(function FormSelect(props: Props) {
  const onChange = (value: string) => {
    qualityControlRecordVM.filterForm = value
    props.refreshData()
  }

  return (
    <Wrapper>
      <Select
        value={qualityControlRecordVM.filterForm}
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
        {qualityControlRecordVM.formSelectList.map((item: DeptType) => (
          <Select.Option key={item.code} value={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Wrapper>
  )
})
const Wrapper = styled.div``
