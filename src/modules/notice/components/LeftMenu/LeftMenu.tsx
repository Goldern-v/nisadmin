import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button } from 'antd'
export interface Props extends RouteComponentProps {}

export default function LeftMenu() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  let menuItemList = [
    {
      icon: require('./images/收件箱.png'),
      text: '收件箱'
    },
    {
      icon: require('./images/发件箱.png'),
      text: '发件箱'
    },
    {
      icon: require('./images/草稿箱.png'),
      text: '草稿箱'
    },
    {
      icon: require('./images/收藏.png'),
      text: '我的收藏'
    }
  ]

  // type MenuItemList = typeof menuItemList
  return (
    <Wrapper>
      <Button type='primary' icon='form' style={{ width: 170, margin: '15px auto', display: 'block' }}>
        新建通知
      </Button>
      <Title>文件夹</Title>
      {menuItemList.map((item) => (
        <ItemBox>
          <img className='icon' src={item.icon} />
          <div className='text'>{item.text}</div>
        </ItemBox>
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 50px;
  bottom: 0px;
  width: 200px;
  background: #fafafa;
  border-right: 1px solid #dddddd;
`
const Title = styled.div`
  font-size: 13px;
  color: #333333;
  padding: 0px 16px 6px;
  font-weight: bold;
`

const ItemBox = styled.div`
  height: 37px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  font-size: 13px;
  color: #666;
  &.active,
  &:hover {
    background: rgba(238, 238, 238, 1);
  }
  &.active {
    font-weight: bold;
  }
  .icon {
    margin-right: 10px;
    width: 15px;
  }
`
