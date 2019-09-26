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
import { Place } from 'src/components/common'
import { authStore, appStore } from 'src/stores'
import service from 'src/services/api'
import { Menu, Dropdown } from 'src/vendors/antd'
import { navConfig, navConfigItem } from './navConfig_hj'
export interface Props extends RouteComponentProps {}

function MenuCon(props: { list: navConfigItem[] }) {
  let { list } = props
  const Wrapper = styled.div`
    min-width: 158px;
    padding: 8px 0;
    position: relative;
    top: -4px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    border: 1px solid rgba(203, 213, 221, 1);
    .ant-menu-vertical {
      border: 0;
    }
    .ant-menu-item {
      height: 35px !important;
      margin: 0 !important;
      display: flex;
      align-items: center;
      color: #333333 !important;
      font-size: 13px !important;
      white-space: nowrap;

      &:hover {
        font-weight: bold;
        background: #f8f8fa;
      }
      .icon {
        height: 14px;
        margin-right: 12px;
      }
    }
  `
  return (
    <Wrapper>
      <Menu>
        {list.map((item, index) => (
          <Menu.Item>
            <img src={require('../images/测试.png')} alt='' className='icon' />
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
    </Wrapper>
  )
}

export default observer(function NavBar(props: Props) {
  const toNavLink = (path: string | undefined) => {
    return path ? () => props.history.push(path) : () => {}
  }
  let { location } = props
  return (
    <Wrapper>
      <LogoCon>
        {appStore.HOSPITAL_ID == 'wh' ? (
          <React.Fragment>
            <img src={require('../images/武汉logo.png')} alt='' className='logo' style={{ height: 30 }} />
            <img src={require('../images/护理管理系统.png')} alt='' className='name' style={{ paddingRight: 30 }} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <img src={require('../images/logo-white.png')} alt='' className='logo' />
            <img src={require('../images/宸瑞护理管理系统.png')} alt='' className='name' />
          </React.Fragment>
        )}
      </LogoCon>
      {navConfig.map(
        (item, index: number) =>
          !item.hidden && (
            <Dropdown overlay={item.children ? <MenuCon list={item.children} /> : <div />} key={index}>
              <NavItem
                onClick={toNavLink(item.path)}
                active={
                  (item.path !== '' && (item.path && location.pathname.indexOf(item.path) !== -1)) ||
                  (item.children &&
                    item.children.some((item: any) => !!(item.path && location.pathname.indexOf(item.path) !== -1)))
                }
                key={item.name}
              >
                {/* {item.icon} */}
                {/* <ReactSVG src={item.icon} svgClassName='nav-icon' /> */}
                <div className='nav-name'>{item.name}</div>
              </NavItem>
            </Dropdown>
          )
      )}
      <Place />
      <RightCon>
        {authStore.user && authStore.user.nearImageUrl && (
          <img src={authStore.user.nearImageUrl} alt='' className='headImg' />
        )}
        <span className='name'>{authStore.user && authStore.user.empName}</span>
        <span className='line'>|</span>
        <span className='logout' onClick={service.authApiService.logout}>
          退出
        </span>
      </RightCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 50px;
  background: ${(p) => p.theme.$mtc};
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
const LogoCon = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo {
    height: 26px;
    margin-right: 10px;
  }
  .name {
    height: 16px;
  }
`

const NavItem = styled.div<{ active?: boolean }>`
  height: 50px;
  min-width: 40px;
  display: flex;
  padding: 0 12px 0 12px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
  position: relative;
  background: ${(p) => p.active && p.theme.$mcc};
  color: #fff;
  svg {
    width: 16px;
    height: 16px;
    /* margin-top: 6px; */
    margin-right: 2px;
    path {
      /* fill: ${(p) => (p.active ? '#fff' : '#747474')}; */
    }
    title {
      display: none;
    }
  }
`

const RightCon = styled.div`
  font-size: 13px;
  color: #fff;
  margin-right: 15px;
  span {
    height: 50px;
    line-height: 50px;
  }
  .line {
    padding: 0 8px;
  }
  .logout {
    width: 30px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
  .headImg {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }
`
