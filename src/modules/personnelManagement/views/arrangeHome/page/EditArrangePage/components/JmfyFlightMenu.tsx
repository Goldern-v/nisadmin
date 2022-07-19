import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Select } from "antd";
import BaseTabs from "src/components/BaseTabs";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { sheetViewModal } from "../../../viewModal/SheetViewModal";
import { ArrangeItem } from "../../../types/Sheet";
import { cloneJson } from "src/utils/json/clone";
import { appStore } from "src/stores";
import service from "src/services/api";
import { ScrollBox } from "src/components/common";

const Option = Select.Option

export interface Props {
}

const BoxInner = styled.div<{ color?: string }>`
  height: 30px;
  padding: 5px;
  border: 1px solid #d9d9d9;
  color: ${p => p.color || "#666"};
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

export default observer(function JmfyFlightMenu() {

  return (
    <Wrapper>
      <BaseTabs
        config={[
          {
            title: "可选班次",
            index: "0",
            component: <FilterableMenuCon dataSource={sheetViewModal.arrangeMenu} />
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

function FilterableMenuCon(props: { dataSource: any[] }) {
  const [bigTypeList, setBigTypeList] = useState([])
  const [selectedBigType, setSelectedBigType] = useState('')

  const onClick = (item: any) => {
    setCellData(sheetViewModal.selectedCell, sheetViewModal.countArrangeNameList, item)

    const nextCell = sheetViewModal.getNextCell();
    sheetViewModal.selectedCell = nextCell
    sheetViewModal.selectedCellList = [nextCell]
  };

  useEffect(() => {
    service.commonApiService.dictInfo('sch_range_big_type')
      .then(res => {
        setBigTypeList(res.data || [])
      }, () => { })

  }, [])

  return (
    <FilterableContain>
      <div className="filter-wrapper">
        <Select
          allowClear
          value={selectedBigType}
          onChange={(newVal: string) =>
            setSelectedBigType(newVal || '')}>
          <Option value="">全部</Option>
          {bigTypeList.map((item: any, idx: number) => (
            <Option key={idx} value={item.name}>{item.code}</Option>
          ))}
        </Select>
      </div>
      <ListWrapper>
        {props.dataSource.filter((item) => {
          if (selectedBigType === '') return true

          if (selectedBigType.indexOf(item.shiftType) >= 0) return true

          return false
        }).map((item, index) => (
          <div
            className="menu-box"
            key={index}>
            <BoxInner
              color={item.nameColor}
              onClick={() => onClick(item)}>
              {item.name}
            </BoxInner>
          </div>
        ))}
      </ListWrapper>
    </FilterableContain>
  );
}

function MealCon(props: { dataSource: any[] }) {

  const onClick = (item: any) => {
    /** 套餐同步 */
    if (sheetViewModal.selectedCell) {
      let list = sheetViewModal.getSelectCellList(true);
      for (let i = 0; i < list.length; i++) {
        let weekNum = moment(list[i].workDate).isoWeekday();
        let mealObj = getMealData(weekNum, item);
        list[i]!.rangeName = mealObj.name;
        list[i]!.settingNightHour = mealObj.NightHour;
        list[i]!.settingMorningHour = mealObj.MorningHour;
        list[i]!.nameColor = mealObj.nameColor;
        list[i]!.effectiveTime = mealObj.effectiveTime;
        list[i]!.effectiveTimeOld = mealObj.effectiveTime;
        list[i]!.shiftType = mealObj.shiftType;
        list[i]!.statusType = "";
        list[i]!.schAddOrSubs = [];
        if (appStore.HOSPITAL_ID === 'jmfy') list[i]!.addSymbols = [{symbol: mealObj.symbolname, symbolColor: mealObj.symbolcolor}]
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
      "sunday",
      'mondaySymbolName',
      'tuesdaySymbolName',
      'wednesdaySymbolName',
      'thursdaySymbolName',
      'fridaySymbolName',
      'saturdaySymbolName',
      'sundaySymbolName',
      'mondaySymbolColor',
      'tuesdaySymbolColor',
      'wednesdaySymbolColor',
      'thursdaySymbolColor',
      'fridaySymbolColor',
      'saturdaySymbolColor',
      'sundaySymbolColor',

    ];
    let keys = ["Name", "NameColor", "EffectiveTime", "ShiftType", 'SymbolName', 'SymbolColor' ];
    let _keys = ["name", "nameColor", "effectiveTime", "shiftType", 'symbolname', 'symbolcolor'];
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



/**设置单元格排班信息 */
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
    // cell!.rangeNameCode = item.rangeNameCode

    /** 判断是否生成编号 */
    if (
      cell.rangeName &&
      cell.userId &&
      countArrangeNameList.includes(cell.rangeName)
    ) {
      resetArrangeCount(cell.userId, cell.rangeName)
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

const FilterableContain = styled.div`
  height: calc(100vh - 177px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .filter-wrapper{
    padding: 5px;
    border-bottom: 1px solid rgba(0,0,0,0.085);
    border-top: 1px solid rgba(0,0,0,0.085);
    .ant-select{
      width: 100%;
    }
  }
  .menu-box {
    width: 50%;
    float: left;
    padding: 5px;
  }
`;

// @ts-ignore
const ListWrapper = styled(ScrollBox)`
  flex: 1;
  overflow-y: auto;
`

const Contain = styled.div`
  padding: 5px;
  .menu-box {
    width: 50%;
    float: left;
    padding: 5px;
  }
`;
