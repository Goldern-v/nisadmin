import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
import { ContextMenu } from '../../types/contextMenu'
import { observer, toJS } from 'src/vendors/mobx-react-lite'
import { sheetViewModal } from '../../viewModal/SheetViewModal'
import { dateDiff } from 'src/utils/date/dateDiff'
import monnet from 'src/vendors/moment'
import classNames from 'classnames'
import { type } from 'os'
import { SymbolItem, ArrangeItem } from '../../types/Sheet'
import { getAddArrangeMenuList, copyRowClick, cleanCell, cleanCellList } from './cellClickEvent'
import { message } from 'src/vendors/antd'
import { cloneJson } from 'src/utils/json/clone'

export interface Props {
  contextMenu: ContextMenu
  editEffectiveTimeModal: any
  editVacationCountModal: any
  dataSource: any
  index: number
}

export default observer(function Cell(props: Props) {
  let { contextMenu, dataSource, index, editEffectiveTimeModal, editVacationCountModal } = props
  let cellObj = index < dataSource.settingDtos.length ? dataSource.settingDtos[index] : null
  let cellConfig = sheetViewModal.analyseCell(cellObj)

  const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    if (cellConfig.isTwoDaysAgo) return
    sheetViewModal.selectedCell = cellObj
    let hasArrange = !!(sheetViewModal.selectedCell && sheetViewModal.selectedCell.rangeName)

    let { x, y, width, height } = (event as any).target.getBoundingClientRect()
    contextMenu.show(
      [
        {
          icon: '',
          disabled: sheetViewModal.selectedCell.rangeName && sheetViewModal.selectedCell.settings,
          label: '追加排班',
          type: 'text',
          children: getAddArrangeMenuList(sheetViewModal.arrangeMenu, sheetViewModal.selectedCell)
        },
        {
          type: 'line'
        },
        {
          icon: '',
          label: '修改工时',
          type: 'text',
          onClick: () => {
            editEffectiveTimeModal.show({
              data: sheetViewModal.selectedCell,
              onOkCallBack(value: any) {
                sheetViewModal.selectedCell.effectiveTime = value.effectiveTime
                sheetViewModal.selectedCell.detail = value.detail
              }
            })
          }
        },
        {
          icon: '',
          disabled: sheetViewModal.selectedCell.shiftType != '休假',
          label: '休假计数',
          type: 'text',
          onClick: () => {
            editVacationCountModal.show({
              data: sheetViewModal.selectedCell,
              onOkCallBack(num: any) {
                // debugger
                let list = sheetViewModal.getSelectCellList(true)
                let index = list.indexOf(sheetViewModal.selectedCell)
                // debugger
                if (index > -1) {
                  for (let i = Math.min(list.length - index, num) - 1; i >= index; i--) {
                    list[i].rangeName =
                      (sheetViewModal.selectedCell.rangeName || '').replace(/\d+/g, '') + (i - index + 1).toString()
                    list[i].nameColor = sheetViewModal.selectedCell.nameColor
                    list[i].effectiveTime = sheetViewModal.selectedCell.effectiveTime
                    list[i].effectiveTimeOld = sheetViewModal.selectedCell.effectiveTimeOld
                    list[i].shiftType = sheetViewModal.selectedCell.shiftType
                    list[i].settings = null
                  }
                }
                sheetViewModal.selectedCell
              }
            })
          }
        },
        {
          icon: '',
          label: '符号',
          type: 'text',
          disabled: !hasArrange,
          children: [
            ...sheetViewModal.schSymbolList.map((item) => ({
              type: 'text',
              dataSource: item,
              label: (
                <div className='symbol-con'>
                  <div className='symbol-icon'>{item.symbol}</div>
                  <div className='symbol-aside'>{item.detail}</div>
                </div>
              ),
              onClick: (item: any) => {
                sheetViewModal.selectedCell.addSymbols = item.dataSource.symbol
              }
            })),
            {
              type: 'text',
              label: '清除符号',
              onClick: (item: any) => {
                sheetViewModal.selectedCell.addSymbols = ''
              }
            }
          ]
        },
        {
          icon: '',
          label: '复制行',
          type: 'text',
          onClick() {
            sheetViewModal.copyRow = sheetViewModal.getSelectCellList(true)
            message.success('复制成功')
          }
        },
        {
          icon: '',
          label: '剪切行',
          type: 'text',
          onClick() {
            let list = sheetViewModal.getSelectCellList(true)
            let copyRow = sheetViewModal.copyRow
            copyRowClick(list, copyRow, true)
          }
        },
        {
          icon: '',
          label: '黏贴行',
          type: 'text',
          onClick() {
            let list = sheetViewModal.getSelectCellList(true)
            let copyRow = sheetViewModal.copyRow
            copyRowClick(list, copyRow, false)
          }
        },
        {
          icon: '',
          label: '清除格子',
          type: 'text',
          onClick() {
            cleanCell(sheetViewModal.selectedCell)
          }
        },
        {
          icon: '',
          label: '清除行',
          type: 'text',
          onClick() {
            let list = sheetViewModal.getSelectCellList(true)
            cleanCellList(list)
          }
        }
      ],
      {
        x: x + width,
        y: y + height / 2
      }
    )
  }

  const onClick = () => {
    if (cellConfig.isTwoDaysAgo) return
    sheetViewModal.selectedCell = cellObj
  }
  return (
    <Wrapper onContextMenu={onContextMenu} onClick={onClick} className={classNames(cellConfig)}>
      {cellConfig.isAddWordTime && <div className='sj add' />}
      {cellConfig.isReduceWordTime && <div className='sj reduce' />}
      {cellConfig.isExpectedScheduling && <img className='expect' src={require('../../images/期望排班.png')} alt='' />}

      {formatCell(cellObj)}
    </Wrapper>
  )
})
function formatCell(cellObj: ArrangeItem) {
  const Con = styled.span<{ color: string | undefined }>`
    color: ${(p) => p.color};
  `
  if (cellObj) {
    return (
      <React.Fragment>
        <Con color={cellObj.nameColor}>
          {cellObj.addSymbols}
          {cellObj.rangeName}
        </Con>
        {cellObj.settings && (
          <React.Fragment>
            <span>/</span>
            <Con color={cellObj.settings.nameColor}>
              {cellObj.settings.addSymbols}
              {cellObj.settings.rangeName}
            </Con>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
  return ''
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 -8px;
  position: relative;
  &.isSelected {
    background: #fff8b1;
  }
  &.isTwoDaysAgo {
    background: #f8f8f8;
  }
  .sj {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-width: 10px 10px 0 0;
    border-style: solid;
    border-color: transparent transparent;
    &.add {
      border-color: #e55b00 transparent !important;
    }
    &.reduce {
      border-color: #53c5ac transparent !important;
    }
  }
  .expect {
    position: absolute;
    top: 1px;
    left: 1px;
    height: 10px;
    width: 10px;
  }
`
