import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { observer } from "src/vendors/mobx-react-lite.ts";
import { sheetViewModal } from "../../viewModal/SheetViewModal";
import { ArrangeItem } from "../../types/Sheet";
import { cloneJson } from "src/utils/json/clone";
import moment from "moment";
export interface Props {
  id: any;
}

export default observer(function TotalCell(props: Props) {
  let total = totalCellContent(props.id)

  return <Wrapper>{total}</Wrapper>;
});

export const totalCellContent = (id: any) => {
  let list = [];
  let user = sheetViewModal.sheetTableData.find((item: any) => {
    return item.id == id;
  });
  // console.log(user, "useruseruseruseruser");

  if (user) {
    list = user.settingDtos;
  }

  let total = list.reduce((total: any, current: ArrangeItem | any) => {
    return total + Number(current.effectiveTime);
  }, 0);
  // console.log(total, "current");

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
  // console.log(weekObj, "weekObj");

  /** 标准周工时 */
  sheetViewModal.standardTimeList;
  for (let key in weekObj) {
    if (weekObj[key].length == 7) {
      let real_week = sheetViewModal.getStandTime(
        moment()
          .week(Number(key))
          .format("YYYY-MM-DD")
      );
      // console.log(
      //   real_week,
      //   moment()
      //     .week(Number(key))
      //     .format("YYYY-MM-DD"),
      //   "real_week"
      // );
      total -= (real_week / 5) * 2;
      // total = real_week;
    }
  }

  return Number(total).toFixed(1)
}
const Wrapper = styled.div``;
