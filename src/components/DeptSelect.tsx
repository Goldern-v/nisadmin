/** 科室选择器全局使用  */
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { authStore, appStore } from 'src/stores'
export interface Props {
  onChange: (value: string) => void
  extraDept?: any[]
}

export interface DeptType {
  code: string
  name: string
}

export default observer(function DeptSelect(props: Props) {
  const [hasAllDept, setHasAllDept] = useState(false)
  const [defaultValue, setDefaultValue] = useState(authStore.selectedDeptCode)
  let deptList = authStore.deptList
  const onChange = (value: string) => {
    authStore.selectedDeptCode = value
    // if(authStore.deptList)
    if (!authStore.deptList) {
      authStore.deptList = []
    }
    if (!authStore.deptList[0]) {
      authStore.deptList = [{ code: '', name: '' }]
    }

    authStore.selectDeptCode(value)
    setDefaultValue(value)
    props.onChange(value)
  }

  useEffect(() => {
    const hasAllDeptRouteList = ['/home', '/nurseFilesList', '/statistic/:name']
    if (authStore.post === '护理部' || authStore.isAdmin) {
      if (hasAllDeptRouteList.indexOf(appStore.match.path) > -1) {
        setHasAllDept(true)
        if (!authStore.selectedDeptCode) {
          authStore.selectedDeptCode = '全院'
        }
      } else {
        setHasAllDept(false)
        if (authStore.selectedDeptCode === '全院') {
          authStore.selectedDeptCode = authStore.defaultDeptCode
        }
      }
    }
    onChange(authStore.selectedDeptCode)
    return () => {
      setTimeout(() => {
        // authStore.selectedDeptCode = authStore.defaultDeptCode
      }, 0)
    }
  }, [])

  return (
    <Wrapper>
      <Select
        value={defaultValue}
        showSearch
        style={{ width: 200 }}
        onChange={onChange}
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {hasAllDept && (
          <Select.Option key={'全院'} value={'全院'}>
            全院
          </Select.Option>
        )}

        {props.extraDept &&
          props.extraDept.map((item: DeptType) => (
            <Select.Option key={item.name} value={item.code}>
              {item.name}
            </Select.Option>
          ))}

        {deptList.map((item: DeptType) => (
          <Select.Option key={item.name} value={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Wrapper>
  )
})
const Wrapper = styled.div``
