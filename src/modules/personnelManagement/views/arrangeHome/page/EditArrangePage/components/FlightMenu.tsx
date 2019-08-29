import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTabs from 'src/components/BaseTabs'
import { observer } from 'mobx-react-lite'
import { sheetViewModal } from '../../../viewModal/SheetViewModal'
export interface Props {}

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
  const BoxInner = styled.div<{ color: string }>`
    height: 30px;
    padding: 5px;
    border: 1px solid #d9d9d9;
    color: ${(p) => p.color};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    border-radius: 2px;
  `
  const onClick = (item: any) => {
    if (sheetViewModal.selectedCell) {
      sheetViewModal.selectedCell!.rangeName = item.name
      sheetViewModal.selectedCell!.nameColor = item.nameColor
      sheetViewModal.selectedCell!.effectiveTime = item.effectiveTime
      sheetViewModal.selectedCell!.effectiveTimeOld = item.effectiveTime
      sheetViewModal.selectedCell!.rangeNameCode = item.rangeNameCode
      sheetViewModal.selectedCell!.shiftType = item.shiftType
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
  const BoxInner = styled.div`
    height: 30px;
    padding: 5px;
    border: 1px solid #d9d9d9;
    color: ${(p) => p.color};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    border-radius: 2px;
  `
  const onClick = (item: any) => {
    if (sheetViewModal.selectedCell) {
    }
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
  }
`
