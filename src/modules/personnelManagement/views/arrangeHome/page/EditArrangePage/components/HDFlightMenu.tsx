import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import BaseTabs from "src/components/BaseTabs";
import { observer } from "mobx-react-lite";
import { sheetViewModal } from "../../../viewModal/SheetViewModal";
import { ArrangeItem } from "../../../types/Sheet";
export interface Props { }

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

export default observer(function HDFlightMenu() {
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
            component: <MealCon dataSource={sheetViewModal.hdArrangeMeal} />
          }
        ]}
      />
    </Wrapper>
  );
});

/** 可选班次 */
function MenuCon(props: { dataSource: any[] }) {
  const Contain = styled.div`
    padding: 5px;
    .menu-box {
      width: 50%;
      float: left;
      padding: 5px;
    }
  `;
  const onClick = (item: any) => {
    let _rangeName: any =
      sheetViewModal.selectedCell && sheetViewModal.selectedCell!.rangeName;
    if (sheetViewModal.selectedCell) {
      sheetViewModal.selectedCell!.rangeName = item.name;
      sheetViewModal.selectedCell!.settingNightHour = item.settingNightHour;
      sheetViewModal.selectedCell!.settingMorningHour = item.settingMorningHour;
      sheetViewModal.selectedCell!.rangeNameCode = null;
      sheetViewModal.selectedCell!.nameColor = item.nameColor;
      sheetViewModal.selectedCell!.effectiveTime = item.effectiveTime;
      sheetViewModal.selectedCell!.effectiveTimeOld = item.effectiveTime;
      sheetViewModal.selectedCell!.shiftType = item.shiftType;
      sheetViewModal.selectedCell!.settings = null;
      sheetViewModal.selectedCell!.statusType = "";
      sheetViewModal.selectedCell!.schAddOrSubs = [];
      /** 判断是否生成编号 */
      if (
        sheetViewModal.selectedCell.rangeName &&
        sheetViewModal.selectedCell.userId &&
        sheetViewModal.countArrangeNameList.includes(
          sheetViewModal.selectedCell.rangeName
        )
      ) {
        resetArrangeCount(
          sheetViewModal.selectedCell.userId,
          sheetViewModal.selectedCell.rangeName
        );
      }
      if (
        _rangeName &&
        sheetViewModal.selectedCell.userId &&
        sheetViewModal.countArrangeNameList.includes(_rangeName)
      ) {
        resetArrangeCount(sheetViewModal.selectedCell.userId, _rangeName);
      }
      sheetViewModal.selectedCell = sheetViewModal.getNextCell();
    }
  };

  return (
    <Contain>
      {props.dataSource.map((item, index) => (
        <div className="menu-box" key={index}>
          <BoxInner color={item.nameColor} onClick={() => onClick(item)}>
            {item.name}
          </BoxInner>
        </div>
      ))}
    </Contain>
  );
}

/** 可选套餐 */
function MealCon(props: { dataSource: any[] }) {
  const [loopSwitch, setLoopSwitch] = useState(true) //是否循环按钮(true循环 false不循环 默认循环)
  const Contain = styled.div`
    padding: 5px;
    .loopSwitch {
      line-height: 50px;
      padding: 0 10px;
      box-sizing: border-box;
      span {
        display: inline-block;
        margin-right: 10px;
        font-size: 13px;
      }
    }
    .menu-box {
      width: 50%;
      float: left;
      padding: 5px;
    }
  `;

  /** 套餐同步 */
  const onClick = (item: any) => {
    if (sheetViewModal.selectedCell) {
      let classesList: any = item?.schMealDetailHds || []; // 班次内容
      let list = sheetViewModal.getSelectCellList(true); // 点击当行整行所有数据
      const index = list.findIndex(
        (p: any) => p.workDate === sheetViewModal.selectedCell.workDate
      );// 选择填入班次信息日期的起始下标
      /** 不循环班次套餐 */
      if (!loopSwitch) {
        for (let i = 0; i < item.schMealDetailHds.length; i++) {
          saveData(list, index + i, classesList, i)
        }
        /** 循环班次套餐 */
      } else {
        let loopNum = list.length - index; // 遍历次数
        for (let i = 0; i < loopNum; i++) {
          let parseIntNum: number = (index + i) % classesList.length;
          saveData(list, index + i, classesList, parseIntNum)
        }
      }
    }
  };

  /** 班次谈参数据自动填入 */
  const saveData = (list: any, listIndex: number, data: any, dataIndex: number) => {
    list[listIndex].rangeName = data[dataIndex]?.name;
    list[listIndex].settingNightHour = data[dataIndex]?.NightHour;
    list[listIndex].settingMorningHour = data[dataIndex]?.MorningHour;
    list[listIndex].nameColor = data[dataIndex]?.nameColor;
    list[listIndex].effectiveTime = data[dataIndex]?.effectiveTime;
    list[listIndex].effectiveTimeOld = data[dataIndex]?.effectiveTime;
    list[listIndex].shiftType = data[dataIndex]?.shiftType;
    list[listIndex].statusType = "";
    list[listIndex].schAddOrSubs = [];
  }

  return (
    <Contain>
      <div className='loopSwitch'>
        <span>循环班次</span>
        <Switch
          onChange={(check: any) => setLoopSwitch(check)}
          checked={loopSwitch}
        />
      </div>
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
