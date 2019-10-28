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

export default observer(function HolidayHour(props: Props) {
  let user =
    sheetViewModal.sheetTableData.find((item: any) => {
      return item.id == props.id
    }) || {}
  /** 计算总节修 */
  let real_holidayHour = 0
  for (let j = 0; j < user.settingDtos.length; j++) {
    real_holidayHour += user.settingDtos[j].rangeName == '节休' ? 1 : 0
  }
  return <Wrapper>{user.holidayHour - real_holidayHour + user.current_holidayHour}</Wrapper>
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
