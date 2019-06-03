/** 科室选择器全局使用  */
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { authStore, appStore } from 'src/stores'
export interface Props {
  onChange: (value: string) => void
}

export interface DeptType {
  code: string
  name: string
}

export default observer(function DeptSelect (props: Props) {
  const [hasAllDept, setHasAllDept] = useState(false)
  let defaultValue = authStore.selectedDeptName || authStore.selectedDeptName
  let deptList = authStore.deptList
  const onChange = (value: string) => {
    authStore.selectedDeptName = value
    // if(authStore.deptList)
    if (!authStore.deptList) {
      authStore.deptList = []
    }
    if (!authStore.deptList[0]) {
      authStore.deptList = [{ code: '', name: '' }]
    }
    let cacheCodeObj: any = authStore.deptList.find((item: any) => item.name === value)
    if (!cacheCodeObj) {
      cacheCodeObj = {}
    }
    let cacheCode = cacheCodeObj.code
    // 特殊的不是接口里的数据
    if (value === '全院') {
      cacheCode = '全院'
    }
    authStore.selectDeptCode(cacheCode)
    props.onChange(cacheCode)
    console.log('6666666666666666666', value)
  }

  useEffect(() => {
    const hasAllDeptRouteList = ['/home', '/nurseFilesList', '/statistic/:name']
    if (authStore.post === '护理部' || authStore.isAdmin) {
      if (hasAllDeptRouteList.indexOf(appStore.match.path) > -1) {
        setHasAllDept(true)
        // if (!authStore.selectedDeptCode) {
        authStore.selectedDeptCode = '全院'
        // }
      } else {
        setHasAllDept(false)
        if (authStore.selectedDeptCode === '全院') {
          authStore.selectedDeptCode = authStore.defaultDeptCode
        }
      }
    }
    onChange(authStore.selectedDeptName)
    return () => {
      setTimeout(() => {
        // authStore.selectedDeptCode = authStore.defaultDeptCode
      }, 0)
    }
  }, [])

  return (
    <Wrapper>
      <Select value={defaultValue} showSearch style={{ width: 200 }} onChange={onChange}>
        {hasAllDept && (
          <Select.Option key={'全院'} value={'全院'}>
            全院
          </Select.Option>
        )}

        {deptList.map((item: DeptType) => (
          <Select.Option key={item.name} value={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Wrapper>
  )
})
const Wrapper = styled.div``
