import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite.ts'
import { sheetViewModal } from '../../viewModal/SheetViewModal'
import { ArrangeItem } from '../../types/Sheet'
import { Input } from 'src/vendors/antd'
export interface Props {
  id: any
}

export default observer(function BalanceHour(props: Props) {
  let user =
    sheetViewModal.sheetTableData.find((item: any) => {
      return item.id == props.id
    }) || {}
  /** 计算总工时 */
  let real_balanceHour = 0
  for (let j = 0; j < user.settingDtos.length; j++) {
    real_balanceHour += Number(user.settingDtos[j].effectiveTime)
  }
  return <Wrapper>{Number(user.balanceHour + real_balanceHour - user.current_balanceHour).toFixed(2)}</Wrapper>
})
const Wrapper = styled.div`
  margin: 0 -2px;
  input {
    border: 0 !important;
    text-align: center;
    border-radius: 0;
    outline: none;
    box-shadow: none !important;
    font-size: 12px;
    height: 24px;
  }
`
