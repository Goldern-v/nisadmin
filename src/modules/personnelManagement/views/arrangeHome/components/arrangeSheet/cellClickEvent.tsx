import React, { useState, useEffect, useRef } from 'react'
import { ArrangeItem } from '../../types/Sheet'
/** 追加排班 */
import _ from 'lodash'
import { cloneJson } from 'src/utils/json/clone'
import { message } from 'src/vendors/antd'
export function getAddArrangeMenuList(list: ArrangeItem[], selectedCellObj: ArrangeItem) {
  let obj = _.groupBy(list, 'shiftType')
  let keys = Object.keys(obj)
  let result = []
  for (let i = 0; i < keys.length; i++) {
    let itemObj: any = {
      icon: '',
      label: keys[i],
      type: 'text',
      children: []
    }
    result.push(itemObj)
    for (let j = 0; j < obj[keys[i]].length; j++) {
      itemObj.children.push({
        icon: '',
        label: <div style={{ color: obj[keys[i]][j].nameColor }}>{obj[keys[i]][j].name}</div>,
        type: 'text',
        dataSource: obj[keys[i]][j],
        onClick(item: any) {
          if (selectedCellObj!.rangeName) {
            selectedCellObj.settings = [
              {
                rangeName: item.dataSource.name,
                nameColor: item.dataSource.nameColor,
                effectiveTime: item.dataSource.effectiveTime,
                effectiveTimeOld: item.dataSource.effectiveTime,
                shiftType: item.dataSource.shiftType
              }
            ]
            selectedCellObj!.effectiveTime = selectedCellObj!.effectiveTime + item.dataSource.effectiveTime
            selectedCellObj!.effectiveTimeOld = selectedCellObj!.effectiveTimeOld + item.dataSource.effectiveTime
          } else {
            selectedCellObj!.rangeName = item.dataSource.name
            selectedCellObj!.nameColor = item.dataSource.nameColor
            selectedCellObj!.effectiveTime = item.dataSource.effectiveTime
            selectedCellObj!.effectiveTimeOld = item.dataSource.effectiveTime
            selectedCellObj!.shiftType = item.dataSource.shiftType
          }
        }
      })
    }
  }
  return result
}

export function copyRowClick(list: any, copyRow: any, isClean: boolean) {
  if (list.length && copyRow.length) {
    for (let i = 0; i < list.length; i++) {
      list[i].rangeName = copyRow[i].rangeName
      list[i].nameColor = copyRow[i].nameColor
      list[i].effectiveTime = copyRow[i].effectiveTime
      list[i].effectiveTimeOld = copyRow[i].effectiveTimeOld
      list[i].shiftType = copyRow[i].shiftType
      list[i].settings = cloneJson(copyRow[i].settings)

      if (isClean) {
        /** 清空复制行 */
        copyRow[i].rangeName = ''
        copyRow[i].nameColor = ''
        copyRow[i].effectiveTime = null
        copyRow[i].effectiveTimeOld = null
        copyRow[i].shiftType = ''
        copyRow[i].settings = null
      }
    }
    if (isClean) {
      copyRow.splice(0, copyRow.splice.length)
    }
  } else {
    message.warning('请先复制行')
  }
}

export function cleanCell(cellObj: ArrangeItem) {
  cellObj.rangeName = ''
  cellObj.nameColor = ''
  cellObj.effectiveTime = null
  cellObj.effectiveTimeOld = null
  cellObj.shiftType = ''
  cellObj.settings = null
}

export function cleanCellList(cellList: ArrangeItem[]) {
  for (let i = 0; i < cellList.length; i++) {
    cleanCell(cellList[i])
  }
}
