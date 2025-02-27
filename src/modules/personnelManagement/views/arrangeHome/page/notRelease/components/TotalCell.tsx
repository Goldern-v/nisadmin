import moment from 'moment'
import styled from 'styled-components'
import React from 'react'
import { observer } from 'mobx-react-lite'
import { message as Message } from 'antd'
import { appStore } from 'src/stores'

import { sheetViewModal } from '../../../viewModal/SheetViewModal'
import { ArrangeItem } from '../../../types/Sheet'

export interface Props {
  id: any;
}

export default observer(function TotalCell(props: Props) {
  let total = props.id ? totalCellContent(props.id) : '0.0';

  return <Wrapper>{total}</Wrapper>;
});

export const totalCellContent = (id: any) => {
  let list: any = [];
  let allTimeLimit = 0; // 根据天数结算总共可排班时长
  let user = sheetViewModal.notSheetTableData.find((item: any) => {
    return item.id == id;
  });
  const arr: any = [
    "公休",
    "产假",
    "事假",
    "丧假",
    "陪产假",
    "探亲假",
    "计生假",
    "进修",
    "借调",
    "婚假",
    "放射假 ",
    "病假",
    "节休"
  ]; // 工时小计为0的班次

  if (user) {
    list = user.settingDtos || [];
    allTimeLimit = user.timeLimit
      ? Math.ceil(list.length / 7) * user.timeLimit
      : 0;
    // sheetViewModal.timeLimit = user.timeLimit;
  }

  // 武汉
  let total = list.reduce((total: any, current: ArrangeItem | any) => {
    let isOk: any = arr.find((item: any) => item === current.rangeName);
    return isOk && (["wh", 'gxjb', "lyyz","qhwy", 'ytll', 'whhk', 'dglb', 'dghm'].includes(appStore.HOSPITAL_ID))
      ? total
      : total + Number(current.effectiveTime);
  }, 0);

  // 超过周工作时长给提示
  if (user && user.timeLimit && allTimeLimit && total > allTimeLimit) {
    Message.warning(
      `请注意： 该人员每周排班时长不可以超过 ${user.timeLimit} !`
    );
  }

  // 超过周班次数给提示
  if (sheetViewModal.notArrangeMenu) {
    sheetViewModal.notArrangeMenu.map((item: any, index: any) => {
      let num = 0;
      let rangeLength: any = item.rangeLimit
        ? Math.ceil(list.length / 7) * item.rangeLimit
        : 0;
      list.map((o: any) => {
        if (item.name === o.rangeName) {
          num++;
          if (rangeLength && num > rangeLength) {
            Message.warning(
              `请注意：每周排班该班次不可以超过 ${item.rangeLimit} !`
            );
          }
        }
      });
    });
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
      let makeZero = list.find((item: any) => arr.includes(item.rangeName));
      let real_week =
        appStore.HOSPITAL_ID === "nys" || makeZero
          ? 0
          : sheetViewModal.getStandTime(
            moment()
              .week(Number(key))
              .format("YYYY-MM-DD")
          );
      total -= (real_week / 5) * 2;
    }
  }

  return Number(total).toFixed(1);
};
const Wrapper = styled.div``;
