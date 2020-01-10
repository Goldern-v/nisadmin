import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { observer } from "src/vendors/mobx-react-lite.ts";
import { sheetViewModal } from "../../viewModal/SheetViewModal";
import { ArrangeItem } from "../../types/Sheet";
import { Input } from "src/vendors/antd";
import moment from "moment";
export interface Props {
  id: any;
}

export default observer(function BalanceHour(props: Props) {
  let list = [];
  let user = sheetViewModal.sheetTableData.find((item: any) => {
    return item.id == props.id;
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

  return (
    <Wrapper>
      {Number(
        user.balanceHour + real_balanceHour - user.current_balanceHour
      ).toFixed(1)}
    </Wrapper>
  );
});
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
