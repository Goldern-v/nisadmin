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
  const [listData, setListData] = useState([])
  let [defaultFormValue, setDefaultFormValue]: any = useState('全部')
  const onChange = (value: string) => {
    qualityControlRecordVM.filterForm = value
    props.refreshData()
  }
  const formSelectMethod = () => {
    qualityControlRecordApi.dictTemplate().then((res: any) => {
      setListData(res.data)
      qualityControlRecordVM.formSelectList = res.data
    })
  }
  useEffect(() => {
    qualityControlRecordApi.qcRoleCodeSelf().then((res: any) => {
      setListData(res.data)
      qualityControlRecordVM.formSelectList = res.data
      let cacheDefaultName: string
      // if (res.data[0]) {
      //   cacheDefaultName = res.data[0].name
      //   // setDefaultFormValue(cacheDefaultName)
      //   qualityControlRecordVM.formSelectCode = res.data[0].code
      // }
    })
  }, [])

  return (
    <Wrapper>
      {/* {qualityControlRecordVM.formSelectCode + '33'} */}
      <Select value={qualityControlRecordVM.filterForm} showSearch style={{ width: 200 }} onChange={onChange}>
        <Select.Option key='' value=''>
          全部
        </Select.Option>
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
