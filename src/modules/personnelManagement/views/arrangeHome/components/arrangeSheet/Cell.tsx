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
import { message, Popover } from 'src/vendors/antd'
import { cloneJson } from 'src/utils/json/clone'

export interface Props {
  contextMenu: ContextMenu
  editEffectiveTimeModal: any
  editVacationCountModal: any
  dataSource: any
  index: number
  isEdit: boolean
}

export default observer(function Cell(props: Props) {
  let { contextMenu, dataSource, index, editEffectiveTimeModal, editVacationCountModal, isEdit } = props

  const [hoverShow, setHoverShow] = useState(false)

  let cellObj = index < dataSource.settingDtos.length ? dataSource.settingDtos[index] : {}
  let cellConfig = sheetViewModal.analyseCell(cellObj)

  const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isEdit) return
    event.preventDefault()
    if (cellConfig.isTwoDaysAgo) return
    sheetViewModal.selectedCell = cellObj
    let hasArrange = !!(sheetViewModal.selectedCell && sheetViewModal.selectedCell.rangeName)

    let { x, y, width, height } = (event as any).target.getBoundingClientRect()
    contextMenu.show(
      [
        {
          icon: require('../../images/追加排班.png'),
          disabled: sheetViewModal.selectedCell.rangeName && sheetViewModal.selectedCell.settings,
          label: '追加排班',
          type: 'text',
          children: getAddArrangeMenuList(sheetViewModal.arrangeMenu, sheetViewModal.selectedCell)
        },
        {
          type: 'line'
        },
        {
          icon: require('../../images/修改工时.png'),
          label: '修改工时',
          type: 'text',
          onClick: () => {
            editEffectiveTimeModal.show({
              data: sheetViewModal.selectedCell,
              onOkCallBack(value: any) {
                sheetViewModal.selectedCell.effectiveTime = value.effectiveTime
                sheetViewModal.selectedCell.detail = value.detail
                // setCellConfig(sheetViewModal.analyseCell(cellObj))
              }
            })
          }
        },
        {
          icon: require('../../images/休假计数.png'),
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
          type: 'line'
        },
        {
          icon: require('../../images/符号.png'),
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
                sheetViewModal.selectedCell.addSymbols = [
                  {
                    symbol: item.dataSource.symbol,
                    detail: item.dataSource.detail
                  }
                ]
              }
            })),
            {
              type: 'line'
            },
            {
              icon: require('../../images/删除.png'),
              type: 'text',
              label: '清除符号',
              onClick: (item: any) => {
                sheetViewModal.selectedCell.addSymbols = null
              }
            }
          ]
        },
        {
          type: 'line'
        },
        {
          icon: require('../../images/复制行.png'),
          label: '复制行',
          type: 'text',
          onClick() {
            sheetViewModal.copyRow = sheetViewModal.getSelectCellList(true)
            message.success('复制成功')
          }
        },
        {
          icon: require('../../images/剪切行.png'),
          label: '剪切行',
          type: 'text',
          onClick() {
            let list = sheetViewModal.getSelectCellList(true)
            let copyRow = sheetViewModal.copyRow
            copyRowClick(list, copyRow, true)
          }
        },
        {
          icon: require('../../images/粘贴行.png'),
          label: '粘贴行',
          type: 'text',
          onClick() {
            let list = sheetViewModal.getSelectCellList(true)
            let copyRow = sheetViewModal.copyRow
            copyRowClick(list, copyRow, false)
          }
        },

        {
          type: 'line'
        },
        {
          icon: require('../../images/删除.png'),
          label: '清除格子',
          type: 'text',
          onClick() {
            cleanCell(sheetViewModal.selectedCell)
          }
        },
        {
          icon: require('../../images/删除.png'),
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
    if (!isEdit) return
    if (cellConfig.isTwoDaysAgo) return
    sheetViewModal.selectedCell = cellObj
  }
  const onVisibleChange = (visible: boolean) => {
    if (cellConfig.isAddWordTime || cellConfig.isReduceWordTime) {
      return setHoverShow(visible)
    } else {
      return setHoverShow(false)
    }
  }
  const content = (
    <div>
      <div>
        备注:
        {cellObj.detail && <span>{cellObj.detail}</span>}
        {!cellObj.detail && <span style={{ color: '#999' }}>无</span>}
      </div>
    </div>
  )
  return (
    <Popover
      content={content}
      title={
        (cellObj.effectiveTimeOld > cellObj.effectiveTime ? '减少' : '增加') +
        '了' +
        Math.abs(cellObj.effectiveTime - cellObj.effectiveTimeOld) +
        '工时'
      }
      trigger='hover'
      placement='rightTop'
      visible={hoverShow}
      onVisibleChange={onVisibleChange}
    >
      <Wrapper onContextMenu={onContextMenu} onClick={onClick} className={classNames(cellConfig)}>
        {cellConfig.isAddWordTime ? <div className='sj add' /> : ''}
        {cellConfig.isReduceWordTime ? <div className='sj reduce' /> : ''}
        {cellConfig.isExpectedScheduling ? (
          <img className='expect' src={require('../../images/期望排班.png')} alt='' />
        ) : (
          ''
        )}
        {formatCell(cellObj)}
        <span style={{ display: 'none' }}>{JSON.stringify(cellObj)}</span>
      </Wrapper>
    </Popover>
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
          <span style={{ color: '#333' }}>{cellObj.addSymbols && cellObj.addSymbols[0]!.symbol}</span>
          {cellObj.rangeName}
        </Con>
        {cellObj.settings && (
          <React.Fragment>
            <span>/</span>
            <Con color={cellObj.settings[0].nameColor}>
              {/* {cellObj.settings[0].addSymbols} */}
              {cellObj.settings[0].rangeName}
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
  margin: 0 -2px;
  position: relative;
  word-break: break-all;
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
