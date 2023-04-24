import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react-lite";
import { sheetViewModal } from "../../viewModal/SheetViewModal";
// import { message } from "src/vendors/antd";
import { appStore } from "src/stores";
/**
 * 假期的flag值和类型
 */
const CONFIG = {
  maternityHour: '产假',
  marriageHour: '婚假',
  funeralHour: '丧假',
}
export interface Props {
  id: any;
  flag: string;
}
/**
 * 产假结余/婚假结余/丧假结余
 * 统计单位：天 */
export default observer(function CommonHour(props: Props) {
  let total = getHour(props)
  return <Wrapper>{total}</Wrapper>;
});

export const getHour = ({ id, flag }: Props) => {
  let user =
    sheetViewModal.sheetTableData.find((item: any) => {
      return item.id === id;
    }) || {};

  /** 计算总结余
   * 
   */
  let totalHour = 0;
  let type = CONFIG[flag]
  for (let j = 0; j < (user.settingDtos || []).length; j++) {
    if (['whyx', 'whhk'].includes(appStore.HOSPITAL_ID)) {
      totalHour += user.settingDtos[j].shiftType === type  ? 1 : 0;
    } else {
      totalHour += user.settingDtos[j].rangeName === type  ? 1 : 0;
    }
    // if (user.settingDtos[j]!.workDate.includes("-01-01")) {
    //   if (['whyx', 'whhk'].includes(appStore.HOSPITAL_ID)) {
    //     totalHour = user.settingDtos[j].shiftType == type  ? 1 : 0;
    //   } else {
    //     totalHour = user.settingDtos[j].rangeName == type  ? 1 : 0;
    //   }
    // }
  }
  let total =
    Number(user[flag]) -
    Number(totalHour) +
    Number(user[`current_${flag}`]);
  // if (total < 0 && ['sdlj', 'qzde'].includes(appStore.HOSPITAL_ID)) {
  //   message.warning(`${user.empName}的公休天数小于0，请修正`);
  // }
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
`;
