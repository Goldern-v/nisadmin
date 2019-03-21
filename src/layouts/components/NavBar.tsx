import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}

const navList = [
  {
    name: '首页',
    icon: '',
    path: '/home'
  },
  // {
  //   name: '审核管理',
  //   icon: '',
  //   path: ''
  // },
  {
    name: '护士排班',
    icon: '',
    path: '/scheduleHome'
  }
]
export default function NavBar (props: Props) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })

  const toNavLink = (path: string) => {
    return () => props.history.push(path)
  }
  let { location } = props
  return (
    <Wrapper>
      {navList.map((item) => (
        <NavItem onClick={toNavLink(item.path)} active={location.pathname === item.path} key={item.name}>
          {item.name}
        </NavItem>
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 60px;
  background: #fff;
`
const NavItem = styled.div<{ active: boolean }>`
  display: flex;
  padding: 0 15px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(p) => p.active && `background: ${p.theme.$mtc};`}
`
