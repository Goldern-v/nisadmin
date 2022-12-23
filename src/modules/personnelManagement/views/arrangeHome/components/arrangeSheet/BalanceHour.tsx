import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react-lite";
import { sheetViewModal } from "../../viewModal/SheetViewModal";
import moment from "moment";
import { appStore } from "src/stores";
export interface Props {
  id: any;
}

export default observer(function BalanceHour(props: Props) {
  let total = balanceHour(props.id)
  return <Wrapper>{total}</Wrapper>;
});

export const balanceHour = (id: any) => {

  let list = [];
  let user = sheetViewModal.sheetTableData.find((item: any) => {
    return item.id == id;
  });
  if (user) {
    list = user.settingDtos;
  }

  /** 计算总工时 */
  let real_balanceHour = 0;
  for (let j = 0; j < (user.settingDtos || []).length; j++) {
    real_balanceHour += Number(user.settingDtos[j].effectiveTime);
  }

  /** 如果存在一周7天都是 */
  let weekObj: any = {};
  for (let item of list) {
    if (sheetViewModal.weekArrangeNameList.includes(item.rangeName)) {
      let num = moment(item.workDate).week();
      if (weekObj[num]) {
        weekObj[num].push(num);
      } else {
        weekObj[num] = [];
        weekObj[num].push(num);
      }
    }
  }
  /** 标准周工时 */
  sheetViewModal.standardTimeList;
  for (let key in weekObj) {
    if (weekObj[key].length == 7) {
      let real_week = sheetViewModal.getStandTime(
        moment()
          .week(Number(key))
          .format("YYYY-MM-DD")
      );
      real_balanceHour -= (real_week / 5) * 2;
      // real_balanceHour = real_week;
    }
  }
  if ('whsl' === appStore.HOSPITAL_ID) {
    let hour = Number(user.balanceHour * 100 + real_balanceHour * 100 - user.current_balanceHour * 100) / 100
    return parseInt((hour / 8) + '') != 0 ? parseInt((hour / 8) + '') + 'd' + parseFloat(Math.abs(Math.ceil(Number((hour % 8 * 100).toFixed(1))) / 100) + '') + 'h' : parseFloat((Math.ceil(hour % 8 * 10) / 10) + '') + 'h'
  }
  return Number(user.balanceHour + real_balanceHour - user.current_balanceHour).toFixed(1)

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
