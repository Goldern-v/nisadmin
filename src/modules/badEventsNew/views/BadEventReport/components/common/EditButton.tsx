import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { NativeButtonProps } from 'antd/es/button/button'
import { badEventReportModel } from './../../BadEventReportModel'
import { observer } from 'src/vendors/mobx-react-lite'
import { authStore } from 'src/stores'
export interface Props extends NativeButtonProps {
  border?: boolean
}

export default observer(function EditButton(props: Props) {
  if (!authStore.isOnlyRoleManage) return <span></span>
  let btnDisabled = () => {
    if (!badEventReportModel.allData.report) return true
    if (badEventReportModel.allData.report.status == '1') return true
    return false
  }
  return <ButtonStyl {...props} icon={'edit'} border={props.border ? 1 : 0} disabled={btnDisabled()} />
})
const ButtonStyl = styled(Button) <{ border: number }>`
  &.ant-btn {
    ${(p) => !p.border && 'border: 0'}
  }
  &.ant-btn {
    background: rgba(255, 255, 255, 0.6);
    box-shadow: none;
  }
  &.ant-btn[disabled],
  &.ant-btn[disabled]:hover {
    background: rgba(0, 0, 0, 0);
  }
`
