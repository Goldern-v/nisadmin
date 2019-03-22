import styled from 'styled-components'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import ReactSVG from 'react-svg'
import store from '@/stores'
import { observer } from 'mobx-react-lite'
export interface Props extends RouteComponentProps {}

const navList = [
  {
    name: '首页',
    icon: require('../images/首页.svg'),
    path: '/home'
  },
  {
    name: '审核管理',
    icon: require('../images/审核管理.svg'),
    path: ''
  },
  {
    name: '护士排班',
    icon: require('../images/护士排班.svg'),
    path: '/scheduleHome'
  },
  {
    name: '护士档案',
    icon: require('../images/护士档案.svg'),
    path: ''
  },
  {
    name: '不良事件',
    icon: require('../images/不良事件.svg'),
    path: ''
  },
  {
    name: '培训考核',
    icon: require('../images/培训考核.svg'),
    path: ''
  },
  {
    name: '敏感指标',
    icon: require('../images/敏感指标.svg'),
    path: ''
  },
  {
    name: '统计查询',
    icon: require('../images/统计查询.svg'),
    path: ''
  },
  {
    name: '通知公告',
    icon: require('../images/通知公告.svg'),
    path: ''
  },
  {
    name: '系统设置',
    icon: require('../images/系统设置.svg'),
    path: ''
  }
]

export default observer(function NavBar (props: Props) {
  const isExpand = store.appStore.isExpand
  const setExpand = store.appStore.setExpand
  const toNavLink = (path: string) => {
    return () => props.history.push(path)
  }
  let { location } = props
  return (
    <Wrapper>
      {navList.map((item) => (
        <NavItem onClick={toNavLink(item.path)} active={location.pathname === item.path} key={item.name}>
          <ReactSVG src={item.icon} svgClassName='nav-icon' />
          <div className='nav-name'>{item.name}</div>
          <div className='active-line' />
        </NavItem>
      ))}
      {isExpand === '1' ? (
        <NavItem style={{ width: '60px', borderRight: 0, flex: 0 }} onClick={() => setExpand('0')}>
          <ReactSVG src={require('../images/收起.svg')} svgClassName='nav-icon' />
          <div className='nav-name'>收起</div>
        </NavItem>
      ) : (
        <NavItem style={{ width: '60px', borderRight: 0, flex: 0 }} onClick={() => setExpand('1')}>
          <ReactSVG src={require('../images/展开.svg')} svgClassName='nav-icon' />
          <div className='nav-name'>展开</div>
        </NavItem>
      )}
    </Wrapper>
  )
})
const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 64px;
  background: #fff;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
`
const NavItem = styled.div<{ active?: boolean }>`
  width: 0;
  flex: 1;
  display: flex;
  padding: 0 15px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  border-right: 1px solid #f2f2f2;
  font-size: 13px;
  position: relative;
  color: ${(p) => (p.active ? p.theme.$mtc : '#747474')};
  .nav-icon {
    width: 26px;
    height: 26px;
    path {
      fill: ${(p) => (p.active ? p.theme.$mtc : '#747474')};
    }
    title {
      display: none;
    }
  }
  .nav-name {
    margin-top: -3px;
  }
  .active-line {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background: ${(p) => p.theme.$mtc};
    width: ${(p) => (p.active ? '48px' : 0)};
    margin: auto;
    transition: width 0.5s;
  }
  &:hover {
    .active-line {
      width: 48px;
    }
  }
`
