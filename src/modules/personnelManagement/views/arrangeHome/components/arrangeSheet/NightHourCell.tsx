import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite.ts'
import { sheetViewModal } from '../../viewModal/SheetViewModal'
import { ArrangeItem } from '../../types/Sheet'
export interface Props {
  id: any
}

export default observer(function NightHourCell(props: Props) {
  let list = []
  let user = sheetViewModal.sheetTableData.find((item: any) => {
    return item.id == props.id
  })
  if (user) {
    list = user.settingDtos
  }

  let total = list
    .filter((item: ArrangeItem) => item.shiftType == '夜班')
    .reduce((total: any, current: ArrangeItem) => {
      return total + Number(current.effectiveTime)
    }, 0)
  return <Wrapper>{Number(total).toFixed(1)}</Wrapper>
})
const Wrapper = styled.div``
