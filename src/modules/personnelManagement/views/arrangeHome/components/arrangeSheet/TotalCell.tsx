import moment from 'moment'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { cloneJson } from 'src/utils/json/clone'
import { message as Message } from 'antd'
import { appStore } from 'src/stores'

import { sheetViewModal } from '../../viewModal/SheetViewModal'
import { ArrangeItem } from '../../types/Sheet'

export interface Props {
  id: any;
}

export default observer(function TotalCell(props: Props) {
  let total = totalCellContent(props.id);

  return <Wrapper>{total}</Wrapper>;
});

export const totalCellContent = (id: any) => {
  let list: any = [];
  let allTimeLimit = 0; // 根据天数结算总共可排班时长
  let user = sheetViewModal.sheetTableData.find((item: any) => {
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
    // console.log('schAddOrSubs', current.schAddOrSubs)
    if (isOk && (appStore.HOSPITAL_ID === "wh" || ["lyyz","qhwy", "ytll"].includes(appStore.HOSPITAL_ID))) {
      return total
    // } else if (['dghl'].includes(appStore.HOSPITAL_ID) && current.schAddOrSubs) {
    //   // 计算加减班工时
    //   let schAddOrSubs = current.schAddOrSubs.reduce((schAddOrSubs: any, current2: ArrangeItem | any) => {
    //     if (current2.statusType == 2) {
    //       return schAddOrSubs - Number(current2.hour)
    //     } else if (current.statusType == 1) {
    //       return schAddOrSubs + Number(current2.hour)
    //     }
    //     return schAddOrSubs
    //   }, 0)
    //   return total + Number(current.effectiveTime) + Number(schAddOrSubs)
    } else {
      return total + Number(current.effectiveTime)
    }
    // return isOk && (appStore.HOSPITAL_ID === "wh")
    //   ? total
    //   : total + Number(current.effectiveTime);
  }, 0);
  // console.log('schAddOrSubs', user.settingDtosschAddOrSubs)
  // 超过周工作时长给提示
  if (user && user.timeLimit && allTimeLimit && total > allTimeLimit) {
    Message.warning(
      `请注意： 该人员每周排班时长不可以超过 ${user.timeLimit} !`
    );
  }

  // 超过周班次数给提示
  if (sheetViewModal.arrangeMenu) {
    sheetViewModal.arrangeMenu.map((item: any, index: any) => {
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
