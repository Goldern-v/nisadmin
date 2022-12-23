import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react-lite";
import { sheetViewModal } from "../../viewModal/SheetViewModal";
import { message } from "src/vendors/antd";
import { appStore } from "src/stores";
export interface Props {
  id: any;
}

export default observer(function PublicHour(props: Props) {
  let total = publicHour(props.id)
  return <Wrapper className={total < 0 ? "public-hour-warning" : ""}>{total}</Wrapper>;
});

export const publicHour = (id: any) => {
  let user =
    sheetViewModal.sheetTableData.find((item: any) => {
      return item.id == id;
    }) || {};

  /** 计算总公修 */
  let real_publicHour = 0;
  for (let j = 0; j < (user.settingDtos || []).length; j++) {
    if (['whyx','whhk'].includes(appStore.HOSPITAL_ID)) {
      real_publicHour += user.settingDtos[j].shiftType == "公休" ? 1 : 0;
    } else {
      real_publicHour += user.settingDtos[j].rangeName == "公休" ? 1 : 0;
    }
    if (user.settingDtos[j]!.workDate.includes("-01-01")) {
      if (['whyx','whhk'].includes(appStore.HOSPITAL_ID)) {
        real_publicHour = user.settingDtos[j].shiftType == "公休" ? 1 : 0;
      } else {
        real_publicHour = user.settingDtos[j].rangeName == "公休" ? 1 : 0;
      }
    }
  }
  let total =
    Number(user.publicHour) -
    Number(real_publicHour) +
    Number(user.current_publicHour);
  if (total < 0 && ['sdlj', 'qzde'].includes(appStore.HOSPITAL_ID)) {
    message.warning(`${user.empName}的公休天数小于0，请修正`);
  }
  if ('whsl' === appStore.HOSPITAL_ID) return Number(total) + 'd'
  return Number(total)
}
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
  &.public-hour-warning {
    color: red;
    font-weight: bold;
  }
`;
