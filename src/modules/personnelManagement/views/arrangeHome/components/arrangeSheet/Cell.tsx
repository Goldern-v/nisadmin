import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { ContextMenu } from '../../types/contextMenu'
import { observer } from 'src/vendors/mobx-react-lite'
import { sheetViewModal } from '../../viewModal/SheetViewModal'
import { dateDiff } from 'src/utils/date/dateDiff'
import monnet from 'src/vendors/moment'
import classNames from 'classnames'

export interface Props {
  contextMenu: ContextMenu
  dataSource: any
  index: number
}

export default observer(function Cell(props: Props) {
  let { contextMenu, dataSource, index } = props
  const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
          label: '增加工时',
          type: 'text',
          onClick: () => {}
        },
        {
          icon: '',
          label: '减少工时',
          type: 'text',
          onClick: () => {}
        },
        {
          icon: '',
          label: '休假计数',
          type: 'text',
          onClick: () => {}
        }
      ],
      {
        x: x + width,
        y: y + height / 2
      }
    )
    event.preventDefault()
  }

  let cellObj = index < dataSource.settingDtos.length ? dataSource.settingDtos[index] : null

  // console.log(cellObj.workDate, 'cellObj.workDate')
  let cellConfig = {
    isTwoDaysAgo: dateDiff(cellObj.workDate, monnet().format('YYYY-MM-DD')) > 2,
    isExpectedScheduling: false,
    isAddScheduling: false,
    isAddWordTime: false,
    isReduceWordTime: false,
    isSelected: sheetViewModal.selectedCell == cellObj
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
    return <Con color={cellObj.nameColor}>{cellObj.rangeName}</Con>
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
