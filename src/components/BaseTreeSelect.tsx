import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Tabs, Input, Cascader } from 'antd'
import { appStore } from 'src/stores'
const TabPane = Tabs.TabPane
export interface Props {
  config?: any[]
  style?: any
  treeData: any
  value?: any
  onChange?: any
}

export default React.forwardRef(function BaseTreeSelect(props: Props, ref: any) {
  let { value, ...others } = props
  const InputTextOnChange = (e: any) => {
    // const { onChange } = props
    let newValue = e.target.value
    if (props.hasOwnProperty('onChange')) {
      props.onChange(newValue)
    }
    // onChange(newValue)
  }
  const CascaderOnChange = (newValue: any) => {
    if (props.hasOwnProperty('onChange') && newValue.length > 1) {
      props.onChange(newValue[1])
    }
  }
  // Just show the latest item.
  const displayRender = (label: any) => {
    return label[label.length - 1]
  }
  const findShiftType = (shiftTitle: any) => {
    const { treeData } = props
    let result = ''
    if (treeData) {
      treeData.map((t: any) => {
        if (t.children) {
          t.children.map((c: any) => {
            if (c.title == shiftTitle) {
              result = c.shiftType
              return result
            }
          })
        }
        if (result) {
          return result
        }
      })
    }
    return result
  }
  const fieldNames = { label: 'title', value: 'value', children: 'children' }
  return (
    <Wrapper style={props.style ? { ...props.style } : {}}>
      <Cascader
        style={{ width: props.style }}
        expandTrigger='hover'
        onChange={CascaderOnChange}
        options={props.treeData ? props.treeData : {}}
        displayRender={displayRender}
        defaultValue={props.hasOwnProperty('value') ? [findShiftType(props.value), props.value] : ['']}
        fieldNames={fieldNames}
        notFoundContent='暂无数据'
        showSearch
        allowClear={appStore.HOSPITAL_ID === 'jmfy' ? false : true} 
        popupClassName={'popup-menus'}
        className={'class-menus'}
        ref={ref}
      />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  ul {
    min-width: 125px !important;
  }

  .popup-menus {
    div >>> ul {
      min-width: 125px !important;
    }
    div > .ant-cascader-menu {
      min-width: 125px !important;
    }
  }
`
