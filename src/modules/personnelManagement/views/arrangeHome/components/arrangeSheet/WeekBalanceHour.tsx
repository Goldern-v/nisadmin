import styled from "styled-components";
import React from "react";
// import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { sheetViewModal } from "../../viewModal/SheetViewModal";
// import { ArrangeItem } from "../../types/Sheet";
// import { Input } from "src/vendors/antd";
// import moment from "moment";
import { appStore } from "src/stores";

export interface Props {
  id: any;
}

export default observer(function WeekBalanceHour(props: Props) {
  let total = weekBalanceHour(props.id)
  return <Wrapper>{total}</Wrapper>;
});

export const weekBalanceHour = (id: any) => {
  let list = [];
  let user = sheetViewModal.sheetTableData.find((item: any) => {
    return item.id == id;
  });
  if (user) {
    list = user.settingDtos;
  }

  /** 计算总工时 */
  let real_balanceHour = 0;
  for (let j = 0; j < (list || []).length; j++) {
    real_balanceHour += Number(user.settingDtos[j].effectiveTime);
  }

  /**每周应上天数 */
  let weekDate = 38.5;
  switch (appStore.HOSPITAL_ID){
    case "dghl":
      weekDate=38.5;
      break;
    case "fsxt":
      weekDate=40;
      break;
    default:
      weekDate=38.5;
      break;
  }
  /**实际应上时间 每天应上*实际上班天数*/
  let weekShouldDate=(weekDate/7)*(user?.settingDtos && user.settingDtos.length>0?user.settingDtos.length:0);


  /** 如果存在一周7天都是 */
  // let weekObj: any = {};
  // for (let item of list) {
  //   if (sheetViewModal.weekArrangeNameList.includes(item.rangeName)) {
  //     let num = moment(item.workDate).week();
  //     if (weekObj[num]) {
  //       weekObj[num].push(num);
  //     } else {
  //       weekObj[num] = [];
  //       weekObj[num].push(num);
  //     }
  //   }
  // }
  /** 标准周工时 */
  // sheetViewModal.standardTimeList;
  // for (let key in weekObj) {
  //   if (weekObj[key].length == 7) {
  //     let real_week = sheetViewModal.getStandTime(
  //       moment()
  //         .week(Number(key))
  //         .format("YYYY-MM-DD")
  //     );
  //     real_balanceHour -= (real_week / 5) * 2;
  //     // real_balanceHour = real_week;
  //   }
  // }
  return (Number(real_balanceHour - weekShouldDate).toFixed(1));
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
