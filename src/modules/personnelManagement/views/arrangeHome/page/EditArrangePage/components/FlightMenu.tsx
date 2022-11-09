import moment from 'moment'
import BaseTabs from 'src/components/BaseTabs'
import service from 'src/services/api'
import styled from 'styled-components'
import React from 'react'
import { observer } from 'mobx-react-lite'
import { appStore } from 'src/stores'

import { sheetViewModal } from '../../../viewModal/SheetViewModal'
import { ArrangeItem } from '../../../types/Sheet'

export interface Props {
}

const BoxInner = styled.div<{ color?: string, backgroundColor?: string }>`
  height: 30px;
  padding: 5px;
  border: 1px solid #d9d9d9;
  color: ${p => p.color || "#666"};
  background: ${p => p.backgroundColor || ""};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    border-color: ${p => p.theme.$mtc};
  }
`;

/**重置某个用户某个班次的编号 */
export const resetArrangeCount = (userId: number, arrangeName: string) => {
  let [user, list] = sheetViewModal.getUser(userId);
  // let mess = {
  //   workDate: "",
  //   type: ""
  // };
  // let data: any = [];
  // // 存放所有排班日期
  // list.map((item: ArrangeItem, index: number) => {
  //   for (let o in item) {
  //     if (typeof item[o] === "string") {
  //       console.log(o, "11111111");
  //       if (item[1]) {
  //         mess.type = item[1];
  //         if (item[o].indexOf("-") !== -1) {
  //           mess.workDate = item[o];
  //         }
  //       } else {
  //         return;
  //       }
  //     }
  //   }
  // });
  // console.log(mess, "ooooooooooo");

  if (user) {
    let baseCount = user.countArrangeBaseIndexObj[arrangeName];
    /** 计数顺序 */
    let _index = 0;
    /** 基本序号 */
    let _baseCount = baseCount;
    let _oldTime = "";
    list
      .filter((item: ArrangeItem) => {
        return item.rangeName == arrangeName;
      })
      .forEach((item: ArrangeItem, index: number) => {
        if (!item) return;

        const timeData: any = item.workDate;

        if (
          (item!.rangeName == "公休" || item!.rangeName == "病假") &&
          (item!.workDate || "").includes("-01-01")
        ) {
          if (!item.rangeNameCodeList) {
            item.rangeNameCodeList = 1;
          }
        }

        if (item.rangeNameCodeList) {
          _index = 0;
          _baseCount = Number(item.rangeNameCodeList);
          item.rangeNameCode = Number(item.rangeNameCodeList);
        } else {
          _index += 1;
          item.rangeNameCode = _baseCount + _index;
        }
      });
  }
};

export default observer(function FlightMenu() {
  return (
    <Wrapper>
      <BaseTabs
        config={[
          {
            title: "可选班次",
            index: "0",
            component: <MenuCon dataSource={sheetViewModal.arrangeMenu} />
          },
          {
            title: "班次套餐",
            index: "1",
            component: <MealCon dataSource={sheetViewModal.arrangeMeal} />
          }
        ]}
      />
    </Wrapper>
  );
});

function MenuCon(props: { dataSource: any[] }) {
  const Contain = styled.div`
    padding: 5px;
    .menu-box {
      width: 50%;
      float: left;
      padding: 5px;
    }
  `;


  const setCellData = (cell: ArrangeItem, countArrangeNameList: any[], item: any) => {
    // let _rangeName: any = cell!.rangeName;
    if (cell) {
      cell!.rangeName = item.name;
      cell!.settingNightHour = item.settingNightHour;
      cell!.settingMorningHour = item.settingMorningHour;
      cell!.rangeNameCode = null;
      cell!.nameColor = item.nameColor;
      cell!.effectiveTime = item.effectiveTime;
      cell!.effectiveTimeOld = item.effectiveTime;
      cell!.shiftType = item.shiftType;
      cell!.settings = null;
      cell!.statusType = "";
      cell!.schAddOrSubs = [];
      cell!.backgroundColor = item.backgroundColor;
      cell!.rangeScore = item.rangeScore;
      cell!.coefficient = item.coefficient;
      cell!.deductionDay = item.deductionDay;
      // cell!.rangeNameCode = item.rangeNameCode
      // 聊城二院-冬令时-白夜小时
      if (appStore.HOSPITAL_ID == 'lcey') {
        cell!.settingWinNightHour = item.settingWinNightHour;
        cell!.settingWinMorningHour = item.settingWinMorningHour;
      }

      /** 判断是否生成编号 */
      if (
        cell.rangeName &&
        cell.userId &&
        countArrangeNameList.includes(cell.rangeName)
      ) {
        resetArrangeCount(cell.userId, cell.rangeName)
      }
      // 添加班次时间段
      if (['qhwy', 'dglb'].includes(appStore.HOSPITAL_ID)) {
        cell!.workTime = item.workTime
      }
      // if (
      //   _rangeName &&
      //   cell.userId &&
      //   countArrangeNameList.includes(_rangeName)
      // ) {
      //   resetArrangeCount(cell.userId, _rangeName);
      // }
      // cell = cell.getNextCell();
    }
  }

  const onClick = async (item: any) => {
    if (['wh', "lyyz","qhwy", "ytll"].includes(appStore.HOSPITAL_ID)) {
      // let res = await service.scheduleMealApiService.check(item.id)
    }
    if (['dghl', 'fqfybjy'].includes(appStore.HOSPITAL_ID)) {
      if (sheetViewModal.selectedCellList.length > 0) {
        sheetViewModal.selectedCellList.forEach(cell => {
          setCellData(cell, sheetViewModal.countArrangeNameList, item)
        })
        sheetViewModal.copyCellList = []
      }
    } else {
      setCellData(sheetViewModal.selectedCell, sheetViewModal.countArrangeNameList, item)
    }
    const nextCell = sheetViewModal.getNextCell();
    sheetViewModal.selectedCell = nextCell
    sheetViewModal.selectedCellList = [nextCell];
  };

  return (
    <Contain>
      {props.dataSource.map((item, index) => (
        <div className="menu-box" key={index}>
          {['whyx','whhk'].includes(appStore.HOSPITAL_ID) ?
            <BoxInner color={item.nameColor} backgroundColor={item.backgroundColor} onClick={() => onClick(item)}>
              {item.name}
            </BoxInner> :
            <BoxInner color={item.nameColor} onClick={() => onClick(item)}>
              {item.name}
            </BoxInner>
          }

        </div>
      ))}
    </Contain>
  );
}

function MealCon(props: { dataSource: any[] }) {
  const Contain = styled.div`
    padding: 5px;
    .menu-box {
      width: 50%;
      float: left;
      padding: 5px;
    }
  `;

  const onClick = async (item: any) => {
    /** 套餐同步 */
    // 新医院搬武汉版本时不要搬过去，有问题
    if (['wh'].includes(appStore.HOSPITAL_ID)) {
      let res = await service.scheduleMealApiService.checkMeal(item.id)
    }
    if (sheetViewModal.selectedCell) {
      let list = sheetViewModal.getSelectCellList(true);
      // return false
      for (let i = 0; i < list.length; i++) {
        let weekNum = moment(list[i].workDate).isoWeekday();
        let mealObj = getMealData(weekNum, item);
        console.log(mealObj, weekNum, item)
        list[i]!.rangeName = mealObj.name;
        list[i]!.settingNightHour = mealObj.nightHour;
        list[i]!.settingMorningHour = mealObj.morningHour;
        list[i]!.nameColor = mealObj.nameColor;
        list[i]!.effectiveTime = mealObj.effectiveTime;
        list[i]!.effectiveTimeOld = mealObj.effectiveTime;
        list[i]!.shiftType = mealObj.shiftType;
        list[i]!.statusType = "";
        list[i]!.schAddOrSubs = [];
        list[i]!.backgroundColor = mealObj.backgroundColor;
        list[i]!.rangeScore = mealObj.rangeScore;
        list[i]!.coefficient = mealObj.coefficient;
        list[i]!.deductionDay = mealObj.deductionDay;
      }
    }
  };

  /** 格式化 */
  const getMealData = (weekNum: number, mealObj: any) => {
    let days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];
    let keys = ["Name", "NameColor", "EffectiveTime", "ShiftType", "BackgroundColor", "RangeScore", "Coefficient",'NightHour','MorningHour','DeductionDay'];
    let _keys = ["name", "nameColor", "effectiveTime", "shiftType", "backgroundColor", "rangeScore", "coefficient",'nightHour','morningHour','deductionDay'];
    let obj: any = {};

    for (let i = 0; i < keys.length; i++) {
      obj[_keys[i]] = mealObj[days[weekNum - 1] + keys[i]];
    }
    return obj;
  };

  return (
    <Contain>
      {props.dataSource.map((item, index) => (
        <div className="menu-box" key={index}>
          <BoxInner onClick={() => onClick(item)}>{item.name}</BoxInner>
        </div>
      ))}
    </Contain>
  );
}

const Wrapper = styled.div`
  margin-left: 20px;
  .ant-tabs-nav {
    width: 100%;
  }
  .ant-tabs-nav-container {
    height: 36px !important;
  }
  .ant-tabs-tab {
    width: 50%;
    text-align: center;
    height: 36px !important;
  }
`;
