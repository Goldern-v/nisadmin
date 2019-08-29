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
import { SymbolItem } from '../../types/Sheet'

export interface Props {
  contextMenu: ContextMenu
  editEffectiveTimeModal: any
  dataSource: any
  index: number
}

export default observer(function Cell(props: Props) {
  let { contextMenu, dataSource, index, editEffectiveTimeModal } = props
  let modalRef = useRef(editEffectiveTimeModal)
  let cellObj = index < dataSource.settingDtos.length ? dataSource.settingDtos[index] : null
  let cellConfig = sheetViewModal.analyseCell(cellObj)

  const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    sheetViewModal.selectedCell = cellObj
    let hasArrange = !!(sheetViewModal.selectedCell && sheetViewModal.selectedCell.rangeName)

    let { x, y, width, height } = (event as any).target.getBoundingClientRect()
    contextMenu.show(
      [
        {
          icon: '',
          label: '追加排班',
          type: 'text',
          children: [
            {
              label: '追加排班2',
              type: 'text',
              children: [
                {
                  label: '追加排班2',
                  type: 'text'
                },
                {
                  label: '追加排班2',
                  type: 'text'
                },
                {
                  label: '追加排班2',
                  type: 'text'
                },
                {
                  label: '追加排班2',
                  type: 'text'
                }
              ]
            },
            {
              label: '追加排班2',
              type: 'text',
              children: [
                {
                  label: '追加排班2',
                  type: 'text'
                }
              ]
            },
            {
              label: '追加排班2',
              type: 'text',
              children: [
                {
                  label: '追加排班2',
                  type: 'text'
                }
              ]
            }
          ]
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
          label: '休假计数',
          type: 'text',
          onClick: () => {}
        },
        {
          icon: '',
          label: '符号',
          type: 'text',
          disabled: !hasArrange,
          children: sheetViewModal.schSymbolList.map((item) => ({
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
          }))
        }
      ],
      {
        x: x + width,
        y: y + height / 2
      }
    )
    event.preventDefault()
  }

  const onClick = () => {
    sheetViewModal.selectedCell = cellObj
  }
  return (
    <Wrapper onContextMenu={onContextMenu} onClick={onClick} className={classNames(cellConfig)}>
      {formatCell(cellObj)}
    </Wrapper>
  )
})
function formatCell(cellObj: any) {
  const Con = styled.span<{ color: string }>`
    color: ${(p) => p.color};
  `
  if (cellObj) {
    return (
      <Con color={cellObj.nameColor}>
        {cellObj.addSymbols}
        {cellObj.rangeName}
      </Con>
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
  &.isSelected {
    background: #fff8b1;
  }
  &.isTwoDaysAgo {
    background: #f8f8f8;
  }
`
