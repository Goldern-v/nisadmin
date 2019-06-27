import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Menu, Icon } from 'antd'
import { appStore } from 'src/stores'
import { toJS } from 'mobx'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
export interface Props {
  config: any
  menuTitle: string
}

export default function LeftMenu(props: Props) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  const handleSelect = (e: any) => {
    appStore.history.push(e.key)
    console.log('click ', e)
  }
  const renderMenu = (list: any) => {
    return list.filter((item: any) => {
      return !item.hide
    }).map((item: any, index: number) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            key={item.title}
            title={
              <span>
                {/* {item.icon && <Icon type='mail' />} */}
                {item.icon && <MenuIcon src={item.icon} />}
                <span>{item.title}</span>
              </span>
            }
          >
            {renderMenu(item.children)}
          </SubMenu>
        )
      } else {
        return <Menu.Item key={item.path}>{item.title}</Menu.Item>
      }
    })
  }

  const getOpenKeyByPath: any = (list: any[], path: string, parentKeys: string[]) => {
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      if (item.children && item.children.length > 0) {
        let parentKeysClone = [...parentKeys]
        parentKeysClone.push(item.title)
        let currentPath = getOpenKeyByPath(item.children, path, parentKeysClone)
        if (currentPath) return currentPath
      } else {
        if (item.path === path) {
          if(item.hide){
            for(let j = i;j<list.length; j++){
              if(!list[j].hide)return [parentKeys, [list[j].path]]
            }
          }else{
            return [parentKeys, [item.path]]
          }
        }
      }
    }
  }

  let path = appStore.match.url
  let [defaultOpenKeys, defaultSelectedKeys] = getOpenKeyByPath(props.config, path, []) || [[], []]

  return (
    <Wrapper>
      {props.menuTitle && <Title>{props.menuTitle}</Title>}
      <Menu
        onSelect={handleSelect}
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        mode='inline'
        inlineIndent={10}
      >
        {renderMenu(props.config)}
      </Menu>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* height: 100%; */
  height: calc(100vh - 94px);
  padding: 10px 0;
  overflow: auto;
  background: ${(p) => p.theme.$mtc};
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
  .ant-menu-submenu-title,
  .ant-menu-item {
    height: 38px !important;
    line-height: 38px !important;
    margin: 0 !important;
    font-size: 12px !important;
    color: #bddbd0 !important;
    width: 100% !important;
    &:hover {
      color: #fff !important;
    }
    &:active {
      background: transparent !important;
    }
    &.ant-menu-item-selected {
      background: transparent !important;
      color: #fff !important;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 3px;
        height: 17px;
        background: #f6c235;
        top: 0;
        bottom: 0;
        margin: auto 0;
        left: 0;
      }
    }
  }
  .ant-menu-submenu-arrow::after,
  .ant-menu-submenu-arrow::before {
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)) !important;
  }
  .ant-menu-item::after {
    display: none !important;
  }
  .ant-menu-root {
    background: transparent;
    border: 0 !important;
    overflow: hidden !important;
    padding-left: 1px !important;
    > .ant-menu-submenu .ant-menu-submenu-title,
    > .ant-menu-item {
      color: #fff !important;
    }
  }
  .ant-menu-inline {
    width: auto !important;
  }
  ul.ant-menu-sub {
    background: #328b6a !important;
    border-radius: 3px !important;
    margin: 0 10px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    border: 0 !important;
  }
`

const Title = styled.div`
  font-size: 12px;
  color: #fff;
  padding: 10px 10px 0;
`

const MenuIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-left: -4px;
`
