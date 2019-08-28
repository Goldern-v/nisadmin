import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { ContextMenu } from '../../types/contextMenu'
import { observer } from 'src/vendors/mobx-react-lite'

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

  let cellConfig = {
    isTwoDaysAgo: false,
    isExpectedScheduling: false,
    isAddScheduling: false,
    isAddWordTime: false,
    isReduceWordTime: false
  }

  return <Wrapper onContextMenu={onContextMenu}>{formatCell(dataSource, index)}</Wrapper>
})
function formatCell(dataSource: any, index: number) {
  let td = dataSource.settingDtos[index]
  if (td) {
    return td.rangeName
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
