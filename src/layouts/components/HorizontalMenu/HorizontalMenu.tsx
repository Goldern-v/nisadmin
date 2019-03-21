import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Menu, Icon } from 'antd'

const SubMenu = Menu.SubMenu
export interface Props {
  data: any[]
}

const test = [
  {
    name: '排班统计',
    path: ''
  },
  {
    name: '排班护士表',
    path: '',
    childrens: [
      {
        name: '护士排班统计(按班次)',
        path: ''
      },
      {
        name: '护士白班统计(按月份)',
        path: ''
      },
      {
        name: '护士夜班统计(按月份)',
        path: ''
      },
      {
        name: '护士休假统计（按月份）',
        path: ''
      }
    ]
  }
]

export default function HorizontalMenu (props: Props) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  const handleClick = (e: any) => {
    console.log('click ', e)
  }
  return (
    <Wrapper>
      <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
      >
        {test.map((item, index) =>
          item.childrens ? (
            <SubMenu
              key={index}
              title={
                <span>
                  <Icon type='setting' />
                  <span>{item.name}</span>
                </span>
              }
            >
              {item.childrens.map((childrenItem, childrenIndex) => (
                <Menu.Item key={childrenIndex}>{childrenItem.name}</Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key=''>item.name</Menu.Item>
          )
        )}
      </Menu>
    </Wrapper>
  )
}
const Wrapper = styled.div``
