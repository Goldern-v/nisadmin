import windowHeight from 'src/hooks/windowHeight'
import windowWidth from 'src/hooks/windowWidth'
import styled from 'styled-components'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'
import { DragDropContext } from 'react-dnd'

import { components } from './diagTableUtils'

import HTML5Backend from 'react-dnd-html5-backend'
export interface Props extends TableProps<any> {
  // style?: any
  wrapperStyle?: any
  tableStyle?: any
  type?: any
  /** 空行数量，默认10 */
  spaceRowNumber?: any
  /**多余的高度 */
  surplusHeight?: number
  /** 多余的宽度 */
  surplusWidth?: number
  tip?: string
  moveRow?: (dragIndex: number, hoverIndex: number) => void
}

export default function BaseTable(props: Props) {
  let wih = windowHeight()
  let wiw = windowWidth()
  let tableRef: any = React.createRef()
  let option: any = Object.assign(
    {
      bordered: true,
      pagination: false,
      size: 'small'
    },
    props
  )
  if (props.surplusHeight) {
    option.scroll = { y: wih - props.surplusHeight }
  }
  if (props.surplusWidth) {
    option.scroll = option.scroll
      ? Object.assign(option.scroll, { x: wiw - props.surplusWidth })
      : { x: wiw - props.surplusWidth }
  }
  try {
    if (option.type.includes('spaceRow')) {
      /** 设置空行 */
      let spaceRowNumber = props.spaceRowNumber || 10
      console.log(option.dataSource.length, 'option.dataSource.lengthoption.dataSource.length')
      if (option.dataSource.length < spaceRowNumber) {
        while (option.dataSource.length < spaceRowNumber) {
          option.dataSource.push({ key: option.dataSource.length })
        }
      }
    }
    if (option.type.includes('diagRow')) {
      /** 拖拽 */
      option.components = components
      option.onRow = (record: any, index: any) => ({
        index,
        moveRow: option.moveRow
      })
    }
    // if (option.type.includes('fixedWidth')) {
    //   /** 设置宽度 */
    //   let totalWidth = option.columns.reduce((total: number, item: any) => total + (Number(item.width) || 0), 0)
    //   if (!option.style) option.style = {}
    //   option.style.width = totalWidth
    // }
  } catch (error) {}

  let doCols: any = option.columns.filter((item: any) => item.title == '操作' || item.title == '附件')

  if (!!doCols.length) {
    doCols.forEach((doCol: any) => {
      let callback = doCol.render
      doCol.render = (text: any, row: any, index: any) => {
        if (Object.keys(row).length <= 1) return <span />
        return callback && callback(text, row, index)
      }
    })
  }

  useLayoutEffect(() => {
    try {
      setTimeout(() => {
        if (option.tip && tableRef.current) {
          let tip = tableRef!.current!.querySelector('#tip')
          if (tip) {
            tip.innerHTML = option.tip
          } else {
            tip = document.createElement('div')
            tip.id = 'tip'
            tip.innerHTML = option.tip
            try {
              tableRef!.current!.querySelector('.ant-table-body').append(tip)
            } catch (error) {}
          }
        }
      }, 100)
    } catch (error) {}
    try {
      setTimeout(() => {
        if (tableRef.current) {
          let footer = tableRef!.current!.querySelector('.ant-table-footer')
          if (footer) {
            tableRef!.current!.querySelector('.ant-table-body').append(footer)
          }
        }
      }, 100)
    } catch (error) {}
  })

  let TableComponent = option.type && option.type.includes('diagRow') ? DragDropContext(HTML5Backend)(Table) : Table
  return (
    <Wrapper style={option.wrapperStyle || {}} ref={tableRef}>
      <TableComponent {...option} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 1);
  /* border: 1px solid rgba(219, 224, 228, 1); */
  /* padding: 20px 30px; */
  padding: 15px 15px;
  box-sizing: content-box;
  table {
    table-layout: fixed;
  }
  .ant-table-header-column {
    width: 100%;
    text-align: center;
  }
  .ant-table-wrapper {
    th {
      box-sizing: border-box;
      height: 30px !important;
      font-size: 14px !important;
      font-weight: bold;
      padding: 0 !important;
    }
    td {
      box-sizing: border-box;
      /* padding: 0 8px !important; */
      font-size: 13px !important;
      padding: 0 !important;
      /* font-weight: 600; */
      height: ${(p) => p.theme.$tableRowHeight} !important;
    }
    /* 补充th下降的高度 */
    .ant-table-align-center {
      /* padding: 8px 8px 14px 8px !important; */
    }
  }

  .ant-table-small > .ant-table-content > .ant-table-body {
    margin: 0 !important;
  }
  .ant-table-body {
    /* overflow: auto !important; */
    overflow-y: scroll !important;
    overflow-x: auto !important;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 2px;
    & tr :last-child {
      border-bottom: 0 !important;
    }
  }
  .ant-table-footer {
    border-bottom: 0 !important;
  }
  .ant-table-thead {
    background: rgba(242, 244, 245, 1);
  }
  /* tbody tr:nth-of-type(2n) {
    background: rgba(242, 244, 245, 1);
  } */

  .ant-table-placeholder {
    height: ${(p: any) => `calc(100vh - ${p.surplusHeight - 0}px)`};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eaeaea;
  }
  *::-webkit-scrollbar-track {
    /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
    border-radius: 50px;
    background-color: #eaeaea;
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 50px;
    /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
    background-color: #c2c2c2;
  }

  .ant-table-fixed-header .ant-table-scroll .ant-table-header {
    padding-bottom: 4px;
  }

  /* .container::-webkit-scrollbar {
      display: none;
  } */

  .ant-table-header {
    margin-bottom: -8px !important;
    *::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: rgb(242, 244, 245);
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(242, 244, 245);
      border-radius: 0;
      background-color: rgb(242, 244, 245);
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 0px;
      -webkit-box-shadow: inset 0 0 6px rgb(242, 244, 245);
      background-color: rgb(242, 244, 245);
    }
  }
  #tip {
    font-size: 12px;
    margin: 5px;
  }
  .ant-table-row {
    border-bottom: 1px solid #e8e8e8;
  }
  .ant-table-footer {
    padding: 10px;
  }

  /** 拖拽 */
  tr.drop-over-downward td {
    border-bottom: 2px dashed ${(p: any) => p.theme.$mtc};
  }

  tr.drop-over-upward td {
    border-top: 2px dashed ${(p: any) => p.theme.$mtc};
  }
`

const Tip = styled.div`
  font-size: 12px;
  margin: 5px 0 -5px;
`

export const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${(p) => p.theme.$mtc};
  span {
    cursor: pointer;
  }
`
