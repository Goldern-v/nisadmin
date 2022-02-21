import React, { useState, useEffect, useRef } from "react";
import { ArrangeItem } from "../../types/Sheet";
/** 追加排班 */
import _ from "lodash";
import { cloneJson } from "src/utils/json/clone";
import { message } from "src/vendors/antd";
import { appStore } from "src/stores";
import { sheetViewModal } from "../../viewModal/SheetViewModal";
import { resetArrangeCount } from "../../page/EditArrangePage/components/FlightMenu";
import service from 'src/services/api'

export function getAddArrangeMenuList(
  list: ArrangeItem[],
  selectedCellObj: ArrangeItem
) {
  let obj = _.groupBy(list, "shiftType");
  let keys = Object.keys(obj);
  let result = [];
  for (let i = 0; i < keys.length; i++) {
    let itemObj: any = {
      icon: "",
      label: keys[i],
      type: "text",
      children: []
    };
    result.push(itemObj);
    for (let j = 0; j < obj[keys[i]].length; j++) {
      itemObj.children.push({
        icon: "",
        label: (
          <div style={{ color: obj[keys[i]][j].nameColor }}>
            {obj[keys[i]][j].name}
          </div>
        ),
        type: "text",
        dataSource: obj[keys[i]][j],
        async onClick(item: any) {
          if (appStore.HOSPITAL_ID == 'wh') {
            let res = await service.scheduleMealApiService.check(item.dataSource.id)
          }
          if (selectedCellObj!.rangeName) {
            selectedCellObj.settings = [
              {
                rangeName: item.dataSource.name,
                nameColor: item.dataSource.nameColor,
                effectiveTime: item.dataSource.effectiveTime,
                effectiveTimeOld: item.dataSource.effectiveTime,
                shiftType: item.dataSource.shiftType,
                backgroundColor: item.dataSource.backgroundColor
              }
            ];
            selectedCellObj!.effectiveTime =
              selectedCellObj!.effectiveTime + item.dataSource.effectiveTime;
            selectedCellObj!.effectiveTimeOld =
              Number(selectedCellObj!.effectiveTimeOld) +
              Number(item.dataSource.effectiveTime);
          } else {
            selectedCellObj!.rangeName = item.dataSource.name;
            selectedCellObj!.nameColor = item.dataSource.nameColor;
            selectedCellObj!.effectiveTime = item.dataSource.effectiveTime;
            selectedCellObj!.effectiveTimeOld = item.dataSource.effectiveTime;
            selectedCellObj!.shiftType = item.dataSource.shiftType;
            selectedCellObj!.backgroundColor = item.dataSource.backgroundColor
          }
        }
      });
    }
  }
  return result;
}

export function copyRowClick(list: any, copyRow: any, isClean: boolean) {
  if (list.length && copyRow.length) {
    for (let i = 0; i < list.length; i++) {
      if (!list[i] || !copyRow[i]) continue;
      list[i].rangeName = copyRow[i].rangeName;
      list[i].rangeNameCode = null;
      list[i].nameColor = copyRow[i].nameColor;
      list[i].effectiveTime = copyRow[i].effectiveTime;
      list[i].effectiveTimeOld = copyRow[i].effectiveTimeOld;
      list[i].shiftType = copyRow[i].shiftType;
      list[i].addSymbols = copyRow[i].addSymbols;
      list[i].settingNightHour = copyRow[i].settingNightHour;
      list[i].settings = cloneJson(copyRow[i].settings);
      list[i].backgroundColor = copyRow[i].backgroundColor;
      if (appStore.HOSPITAL_ID == "wh" || appStore.HOSPITAL_ID == 'gxjb') {
        list[i].schAddOrSubs = cloneJson(copyRow[i].schAddOrSubs);
      }
      if (['whyx'].includes(appStore.HOSPITAL_ID)) {
        list[i].coefficient = copyRow[i].coefficient;
      }
      if (isClean) {
        /** 清空复制行 */
        copyRow[i].rangeName = "";
        copyRow[i].rangeNameCode = null;
        copyRow[i].nameColor = "";
        copyRow[i].effectiveTime = null;
        copyRow[i].effectiveTimeOld = null;
        copyRow[i].settingNightHour = null;
        copyRow[i].shiftType = "";
        copyRow[i].settings = [];
        copyRow[i].addSymbols = [];
        copyRow[i].backgroundColor = "";


        if (appStore.HOSPITAL_ID == "wh" || appStore.HOSPITAL_ID == 'gxjb') {
          copyRow[i].schAddOrSubs = [];
        }
        if (['whyx'].includes(appStore.HOSPITAL_ID)) {
          copyRow[i].coefficient = 0;
        }
      } /** 序号同步 */
      /** 判断是否生成编号 */
      if (
        list[i].rangeName &&
        sheetViewModal.selectedCell.userId &&
        sheetViewModal.countArrangeNameList.includes(list[i].rangeName)
      ) {
        resetArrangeCount(
          sheetViewModal.selectedCell.userId,
          list[i].rangeName
        );
      }
    }
    if (isClean) {
      copyRow.splice(0, copyRow.length);
    }
  } else {
    message.warning("请先复制行");
  }
}
export function copyCellClick(cell: ArrangeItem, copyCell: any) {
  if (copyCell) {
    cell.rangeName = copyCell.rangeName;
    cell.rangeNameCode = null;
    cell.rangeNameCodeList = null;
    cell.nameColor = copyCell.nameColor;
    cell.effectiveTime = copyCell.effectiveTime;
    cell.effectiveTimeOld = copyCell.effectiveTimeOld;
    cell.shiftType = copyCell.shiftType;
    cell.addSymbols = copyCell.addSymbols;
    cell.settingNightHour = copyCell.settingNightHour;
    cell.settings = cloneJson(copyCell.settings);
    cell.schJiJias = cloneJson(copyCell.schJiJias);
    cell.schRemarks = cloneJson(copyCell.schRemarks);
    cell.backgroundColor = copyCell.backgroundColor;


    if (appStore.HOSPITAL_ID == "wh" || appStore.HOSPITAL_ID == 'gxjb') {
      cell.schAddOrSubs = cell.schAddOrSubs;
    }
    if (['whyx'].includes(appStore.HOSPITAL_ID)) {
      cell.coefficient = copyCell.coefficient;
    }

    /** 序号同步 */
    /** 判断是否生成编号 */
    if (
      cell.rangeName &&
      sheetViewModal.selectedCell.userId &&
      sheetViewModal.countArrangeNameList.includes(cell.rangeName)
    ) {
      resetArrangeCount(sheetViewModal.selectedCell.userId, cell.rangeName);
    }
    if (
      copyCell.rangeName &&
      sheetViewModal.selectedCell.userId &&
      sheetViewModal.countArrangeNameList.includes(copyCell.rangeName)
    ) {
      resetArrangeCount(sheetViewModal.selectedCell.userId, copyCell.rangeName);
    }
  } else {
    message.warning("请先复制格");
  }
}

export function cleanCell(cellObj: ArrangeItem) {
  cellObj.rangeName = "";
  cellObj.rangeNameCode = null;
  cellObj.nameColor = "";
  cellObj.effectiveTime = null;
  cellObj.effectiveTimeOld = null;
  cellObj.settingNightHour = null;
  cellObj.shiftType = "";
  cellObj.settings = [];
  cellObj.addSymbols = [];
  cellObj.statusType = "0";
  cellObj.schRemarks = [];
  cellObj.schJiJias = [];
  cellObj.backgroundColor = ""
  if (appStore.HOSPITAL_ID == "wh" || appStore.HOSPITAL_ID == 'gxjb') {
    cellObj.schAddOrSubs = [];
    cellObj.settingMorningHour = 0;
    cellObj.settingNightHour = 0;
    cellObj.rangeNameCodeList = null;
  }
  if (['whyx'].includes(appStore.HOSPITAL_ID)) {
    cellObj.coefficient = 0;
  }

}

export function cleanCellList(cellList: ArrangeItem[]) {
  for (let i = 0; i < cellList.length; i++) {
    cleanCell(cellList[i]);
  }
}
