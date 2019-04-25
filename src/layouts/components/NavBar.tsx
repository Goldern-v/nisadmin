import styled from 'styled-components'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import ReactSVG from 'react-svg'
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
    path: '/nurseFilesList'
  },
  {
    name: '不良事件',
    icon: require('../images/不良事件.svg'),
    path: '/badEvents'
  },
  {
    name: '培训考核',
    icon: require('../images/培训考核.svg'),
    path: ''
  },
  {
    name: '敏感指标',
    icon: require('../images/敏感指标.svg'),
    path: '/indicator'
  },
  {
    name: '统计查询',
    icon: require('../images/统计查询.svg'),
    path: '/statistic'
  },
  {
    name: '通知公告',
    icon: require('../images/通知公告.svg'),
    path: ''
  },
  {
    name: '系统设置',
    icon: require('../images/系统设置.svg'),
    path: '/setting'
  }
]

export default observer(function NavBar (props: Props) {
  const toNavLink = (path: string) => {
    return () => props.history.push(path)
  }
  let { location } = props
  return (
    <Wrapper>
      {navList.map((item) => (
        <NavItem
          onClick={toNavLink(item.path)}
          active={item.path !== '' && location.pathname.indexOf(item.path) !== -1}
          key={item.name}
        >
          <ReactSVG src={item.icon} svgClassName='nav-icon' />
          <div className='nav-name'>{item.name}</div>
        </NavItem>
      ))}
    </Wrapper>
  )
})
const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 40px;
  background: #fff;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  /* margin-bottom: 10px; */
  position: relative;
  padding-bottom: 2px;
  z-index: 2;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: -1px;
    height: 2px;
    background: #fff;
  }
`
const NavItem = styled.div<{ active?: boolean }>`
  min-width: 50px;
  display: flex;
  padding: 0 22px 0 16px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
  position: relative;
  background: ${(p) => (p.active ? p.theme.$mtc : '#fff')};
  color: ${(p) => (p.active ? '#fff' : '#747474')};
  .nav-icon {
    width: 16px;
    height: 16px;
    margin-top: 6px;
    margin-right: 2px;
    path {
      fill: ${(p) => (p.active ? '#fff' : '#747474')};
    }
    title {
      display: none;
    }
  }
`
