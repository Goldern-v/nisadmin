import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores'
import qs from 'qs'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import emitter from 'src/libs/ev'
import { getTitle } from '../config/title'
import { isSelf } from '../views/BaseInfo'
import { Icon, Menu } from "antd";
const SubMenu = Menu.SubMenu;

interface RouteType {
  children?: any
  type: string
  component: any
  name: string
}

export interface Props {
  routeList: RouteType[]
}

const BG = require('../../../images/侧边背景.png')

export default function LeftMenu(props: Props) {
  let history = appStore.history
  let {
    path,
    params: { type }
  } = appStore.match

  let [listInfo, setListInfo] = useState([])
  const [openKeys, setOpenKeys]: any = useState("");
  const [openSubMenukeys, setOpenSubMenukeys]: any = useState('');
  const [defaultOpenKeys, setDefaultOpenKeys]: any = useState('')

  const onLoad = () => {
    let fun = isSelf() ? nurseFilesService.findByEmpNoSelf : nurseFilesService.findByEmpNo
    fun.call(nurseFilesService, appStore.queryObj.empNo).then((res) => {
      setListInfo(res.data)
      let badgeTotal: number = res.data.reduce((total: number, item: any) => {
        return total + item.statusColorNum
      }, 0)
      nurseFileDetailViewModal.badgeTotal = badgeTotal
    })
  }

  const renderMenu = (list: any) => {
    return list
      .map((item: any, index: number) => {
        if (item.children && item.children.length > 0) {
          return (
            <SubMenu
              key={item.type}
              title={item.name}
            >
              {renderMenu(item.children)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={item.type}>
              <span>
                {item.name}
                <span className="selected-arrow">
                  {/* <img src={require("../../../images/菜单选中右箭头.png")} alt="" /> */}
                </span>
              </span>
            </Menu.Item>
          );
        }
      });
  };
  const handleSelect = (item: any) => {
    setOpenKeys(item.key)
    history.push((isSelf() ? '/selfNurseFile/' : '/nurseFileDetail/') + item.key + `?${appStore.query}`)
  }

  const onOpenChange = (openKeys: any) => {
    setOpenSubMenukeys([openKeys[openKeys.length - 1]]);
  };

  function GetUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf("?") != -1) {
      relUrl = relUrl.split("?")[0];
    }
    return relUrl;
  }
  const filterSelectUrl = (arr: any[], typeUrl: any) => {
    let newArr: any = []
    arr.forEach(item => {
      if (item.children && item.children.length > 0) {
        // filterSelectUrl(item.children, typeUrl)
        item.children.forEach((i: { type: any }) => {
          // console.log(i.type === typeUrl)
          if (i.type === typeUrl) newArr.push(i)
        })
      }
    })
    return newArr
  }

  useEffect(() => {
    var url = GetUrlRelativePath().split(isSelf() ? '/selfNurseFile/' : '/nurseFileDetail/')[1];
    setOpenKeys(url)
    setDefaultOpenKeys(filterSelectUrl(props.routeList, url)[0].parentType)
    emitter.addListener('refreshNurseFileDeatilLeftMenu', onLoad)
    onLoad()
    return () => {
      emitter.removeAllListeners('refreshNurseFileDeatilLeftMenu')
    }
  }, [])
  return (
    <Wrapper>
      {/* {props.routeList.map((item: RouteType) => {
        let isActive: string = type === item.type ? 'active' : ''
        let itemInfo: any = listInfo.find((info: any) => info.name === getTitle(item.name))
        let isBadge: any = itemInfo && itemInfo.statusColor === '1'
        return (
          <Li
            className={isActive}
            key={item.name}
            onClick={() => {
              history.push((isSelf() ? '/selfNurseFile/' : '/nurseFileDetail/') + item.type + `?${appStore.query}`)
              // emitter.emit('护士档案左侧信息', item.name)
              // console.log('点击了')
            }}
          >
            {item.name}
            {isBadge && <Badge />}
          </Li>
        )
      })} */}
      <Menu
        className='left-menu'
        onSelect={handleSelect}
        selectedKeys={[openKeys]}
        openKeys={openSubMenukeys ? openSubMenukeys : [defaultOpenKeys]}
        onOpenChange={onOpenChange}
        mode="inline"
        inlineIndent={12}
      >
        {renderMenu(props.routeList)}
      </Menu>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  // height: 100%;
  // background: url(${BG});
  // background-size: 100% auto;
  background-repeat: no-repeat;
  .left-menu {
    background-color: transparent;
    
    background-image: linear-gradient(#fff, #e1ebe7, #d7f2eb, #e1ebe7, #fff);
    li{
      margin: 0;
    }
    
    .ant-menu-submenu-open .ant-menu{
      background-image: linear-gradient(#e1ebe7, #ddeee9);
      // background: rgba(248,248,248,1)
    }
  }
  .left-menu.ant-menu-inline .ant-menu-item:not(:last-child) {
    margin-bottom: 0px !important;
  }
`
const Li = styled.div`
  height: 32px;
  border-bottom: 1px solid #e5e5e5;
  line-height: 30px;
  padding: 0 16px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  position: relative;
  &:hover,
  &.active {
    color: #fff;
    background: ${(p) => p.theme.$mtc};
  }
`
const Badge = styled.div`
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ff3b30;
  left: 4px;
  top: 4px;
`
