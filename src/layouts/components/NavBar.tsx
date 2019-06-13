import styled from 'styled-components'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react-lite'
import { ReactComponent as SY } from '../images/首页.svg'
import { ReactComponent as SHGL } from '../images/审核管理.svg'
import { ReactComponent as HSPB } from '../images/护士排班.svg'
import { ReactComponent as HSDA } from '../images/护士档案.svg'
import { ReactComponent as BLSJ } from '../images/不良事件.svg'
import { ReactComponent as HLJX } from '../images/护理绩效.svg'
import { ReactComponent as PXKH } from '../images/培训考核.svg'
import { ReactComponent as MGZB } from '../images/敏感指标.svg'
import { ReactComponent as TJCX } from '../images/统计查询.svg'
import { ReactComponent as TZGG } from '../images/通知公告.svg'
import { ReactComponent as WLPT } from '../images/物流平台.svg'
import { ReactComponent as XTSZ } from '../images/系统设置.svg'

export interface Props extends RouteComponentProps { }

const navList = [
  {
    name: '首页',
    icon: <SY />,
    path: '/home'
  },
  {
    name: '审核管理',
    icon: <SHGL />,
    path: '/auditsManagement'
  },
  {
    name: '护士排班',
    icon: <HSPB />,
    path: '/scheduleHome'
  },
  {
    name: '护士档案',
    icon: <HSDA />,
    path: '/nurseFilesList'
  },
  // {
  //   name: '不良事件',
  //   icon: <BLSJ />,
  //   path: '/badEvents'
  // },
  // {
  //   name: '护理绩效',
  //   icon: <HLJX />,
  //   path: '/nursingPerformance'
  // },
  {
    name: '培训考核',
    icon: <PXKH />,
    path: '/test'
  },
  {
    name: '敏感指标',
    icon: <MGZB />,
    path: '/indicator'
  },
  {
    name: '统计查询',
    icon: <TJCX />,
    path: '/statistic'
  },
  // {
  //   name: '通知公告',
  //   icon: <TZGG />,
  //   path: '/notice'
  // },
  {
    name: '物流平台',
    icon: <WLPT />,
    path: '/Lms'
  }, {
    name: '护理制度',
    icon: <HSDA />,
    path: '/nursingRules'
  },
  {
    name: '系统设置',
    icon: <XTSZ />,
    path: '/setting'
  }
]

export default observer(function NavBar(props: Props) {
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
          {item.icon}
          {/* <ReactSVG src={item.icon} svgClassName='nav-icon' /> */}
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
  box-shadow: ${(p) => p.theme.$tabShadow};
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
  min-width: 45px;
  display: flex;
  padding: 0 20px 0 14px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
  position: relative;
  background: ${(p) => (p.active ? p.theme.$mtc : '#fff')};
  color: ${(p) => (p.active ? '#fff' : '#747474')};
  svg {
    width: 16px;
    height: 16px;
    /* margin-top: 6px; */
    margin-right: 2px;
    path {
      fill: ${(p) => (p.active ? '#fff' : '#747474')};
    }
    title {
      display: none;
    }
  }
`
