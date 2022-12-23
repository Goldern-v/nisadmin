import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react-lite";
import { sheetViewModal } from "../../viewModal/SheetViewModal";
import { message } from "src/vendors/antd";
import { appStore } from "src/stores";
export interface Props {
  id: any;
}

export default observer(function PeriodHour(props: Props) {
  let total = periodHour(props.id)
  return <Wrapper className={total < 0 ? "period-hour-warning" : ""}>{total}</Wrapper>;
});

export const periodHour = (id: any) => {
  let user =
    sheetViewModal.sheetTableData.find((item: any) => {
      return item.id == id;
    }) || {};

  /** 计算例假结余 */
  let real_periodHour = 0;
  for (let j = 0; j < (user.settingDtos || []).length; j++) {
      real_periodHour += user.settingDtos[j].shiftType == "例假" ? user.settingDtos[j].deductionDay : 0;
    if (user.settingDtos[j]!.workDate.includes("-01-01")) {
      real_periodHour = user.settingDtos[j].shiftType == "例假" ? user.settingDtos[j].deductionDay : 0;
    }
  }
  let total =
    Number(user.periodHour) -
    Number(real_periodHour) +
    Number(user.current_periodHour);
  if (total < 0 && ['sdlj', 'qzde'].includes(appStore.HOSPITAL_ID)) {
    message.warning(`${user.empName}的例假天数小于0，请修正`);
  }
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
  &.period-hour-warning {
    color: red;
    font-weight: bold;
  }
`;
