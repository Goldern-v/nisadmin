/** 状态选择器  */
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

export default observer(function StateSelect() {
  const [listData, setListData] = useState([])
  let [defaultFormValue, setDefaultFormValue]: any = useState(qualityControlRecordVM.getDefaultStateName)
  const onChange = (value: string) => {
    qualityControlRecordVM.stateSelectCode = value
  }
  const formSelectMethod = () => {
    qualityControlRecordApi.dictChainNode().then((res: any) => {
      setListData(res.data)
      qualityControlRecordVM.stateSelectList = res.data
    })
  }
  useEffect(() => {
    qualityControlRecordApi.dictChainNode().then((res: any) => {
      setListData(res.data)
      qualityControlRecordVM.stateSelectList = res.data
      let cacheDefaultName: string
      if (res.data[0]) {
        cacheDefaultName = res.data[0].name
        setDefaultFormValue(cacheDefaultName)
        qualityControlRecordVM.stateSelectCode = res.data[0].code
      }
    })
  }, [])

  return (
    <Wrapper>
      {/* {qualityControlRecordVM.stateSelectCode + '33'} */}
      <Select defaultValue={defaultFormValue} showSearch style={{ width: 150 }} onChange={onChange}>
        {listData.map((item: DeptType) => (
          <Select.Option key={item.code} value={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Wrapper>
  )
})
const Wrapper = styled.div``
