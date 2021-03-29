import styled from 'styled-components'
import React from 'react'
import { observer } from "mobx-react-lite";
import { sheetViewModal } from '../../viewModal/SheetViewModal'
export interface Props {
  id: any
}

/**
 * @param effectiveTime 班次工时
 * 计算规则： 总工时 - 40
 */
export default observer(function HolidayHourNys(props: Props) {
  let user =
    sheetViewModal.sheetTableData.find((item: any) => {
      return item.id == props.id
    }) || {}
  /** 计算总工时 */
  let real_holidayHour = 0
  for (let j = 0; j < (user.settingDtos || []).length; j++) {
    real_holidayHour += Number(user.settingDtos[j].effectiveTime);
  }
  return <Wrapper>{real_holidayHour - 40}</Wrapper>
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
