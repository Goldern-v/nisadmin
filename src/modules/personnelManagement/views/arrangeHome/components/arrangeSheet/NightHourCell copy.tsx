import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite.ts'
import { sheetViewModal } from '../../viewModal/SheetViewModal'
import { ArrangeItem } from '../../types/Sheet'
import { Input } from 'src/vendors/antd'
export interface Props {
  id: any
  isEdit: boolean
}

export default observer(function NightHourCell(props: Props) {
  let user =
    sheetViewModal.sheetTableData.find((item: any) => {
      return item.id == props.id
    }) || {}

  return (
    <Wrapper>
      <Input
        readOnly={!props.isEdit}
        value={user.settingNightHour}
        onChange={(e) => (user.settingNightHour = e.target.value)}
      />
    </Wrapper>
  )
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
