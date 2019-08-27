import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { ContextMenu } from '../../types/contextMenu'

export interface Props {
  contextMenu: ContextMenu
  dataSource: any
  index: number
}

export default function Cell(props: Props) {
  let { contextMenu, dataSource, index } = props
  const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let { x, y, width, height } = (event as any).target.getBoundingClientRect()
    contextMenu.show(
      [
        {
          icon: '',
          label: '追加排班',
          type: 'text',
          onClick: () => {
            alert(123)
          }
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

  return <Wrapper onContextMenu={onContextMenu}>{formatCell(dataSource, index)}</Wrapper>
}

function formatCell(dataSource: any, index: number) {
  if (dataSource.list[index]) {
    if (dataSource.list[index].length == 1) {
      return dataSource.list[index][0].name
    } else if (dataSource.list.length == 2) {
      return dataSource.list[index][0].name + '/' + dataSource.list[index][1].name
    }
  }
  return ''
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
