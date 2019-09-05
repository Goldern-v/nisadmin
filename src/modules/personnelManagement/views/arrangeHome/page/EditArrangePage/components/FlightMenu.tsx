import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTabs from 'src/components/BaseTabs'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { sheetViewModal } from '../../../viewModal/SheetViewModal'
export interface Props {}

const BoxInner = styled.div<{ color?: string }>`
  height: 30px;
  padding: 5px;
  border: 1px solid #d9d9d9;
  color: ${(p) => p.color || '#666'};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  border-radius: 2px;
  &:hover {
    cursor: pointer;
    border-color: ${(p) => p.theme.$mtc};
  }
`

export default observer(function FlightMenu() {
  return (
    <Wrapper>
      <BaseTabs
        config={[
          {
            title: '可选班次',
            index: '0',
            component: <MenuCon dataSource={sheetViewModal.arrangeMenu} />
          },
          {
            title: '班次套餐',
            index: '1',
            component: <MealCon dataSource={sheetViewModal.arrangeMeal} />
          }
        ]}
      />
    </Wrapper>
  )
})
function MenuCon(props: { dataSource: any[] }) {
  const Contain = styled.div`
    padding: 5px;
    .menu-box {
      width: 50%;
      float: left;
      padding: 5px;
    }
  `
  const onClick = (item: any) => {
    if (sheetViewModal.selectedCell) {
      sheetViewModal.selectedCell!.rangeName = item.name
      sheetViewModal.selectedCell!.nameColor = item.nameColor
      sheetViewModal.selectedCell!.effectiveTime = item.effectiveTime
      sheetViewModal.selectedCell!.effectiveTimeOld = item.effectiveTime
      sheetViewModal.selectedCell!.shiftType = item.shiftType
      sheetViewModal.selectedCell!.settings = null
      sheetViewModal.selectedCell!.statusType = ''
      // sheetViewModal.selectedCell!.rangeNameCode = item.rangeNameCode
      sheetViewModal.selectedCell = sheetViewModal.getNextCell()
    }
  }
  return (
    <Contain>
      {props.dataSource.map((item, index) => (
        <div className='menu-box' key={index}>
          <BoxInner color={item.nameColor} onClick={() => onClick(item)}>
            {item.name}
          </BoxInner>
        </div>
      ))}
    </Contain>
  )
}

function MealCon(props: { dataSource: any[] }) {
  const Contain = styled.div`
    padding: 5px;
    .menu-box {
      width: 50%;
      float: left;
      padding: 5px;
    }
  `

  const onClick = (item: any) => {
    /** 套餐同步 */
    if (sheetViewModal.selectedCell) {
      let list = sheetViewModal.getSelectCellList(true)
      for (let i = 0; i < list.length; i++) {
        let weekNum = moment(list[i].workDate).isoWeekday()
        let mealObj = getMealData(weekNum, item)
        list[i]!.rangeName = mealObj.name
        list[i]!.nameColor = mealObj.nameColor
        list[i]!.effectiveTime = mealObj.effectiveTime
        list[i]!.effectiveTimeOld = mealObj.effectiveTime
        list[i]!.shiftType = mealObj.shiftType
        list[i]!.statusType = ''
      }
    }
  }
  /** 格式化 */
  const getMealData = (weekNum: number, mealObj: any) => {
    let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    let keys = ['Name', 'NameColor', 'EffectiveTime', 'ShiftType']
    let _keys = ['name', 'nameColor', 'effectiveTime', 'shiftType']
    let obj: any = {}

    for (let i = 0; i < keys.length; i++) {
      obj[_keys[i]] = mealObj[days[weekNum - 1] + keys[i]]
    }
    return obj
  }

  return (
    <Contain>
      {props.dataSource.map((item, index) => (
        <div className='menu-box' key={index}>
          <BoxInner onClick={() => onClick(item)}>{item.name}</BoxInner>
        </div>
      ))}
    </Contain>
  )
}

const Wrapper = styled.div`
  margin-left: 20px;
  .ant-tabs-nav {
    width: 100%;
  }
  .ant-tabs-tab {
    width: 50%;
    text-align: center;
  }
`
