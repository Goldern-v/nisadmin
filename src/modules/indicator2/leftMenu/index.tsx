import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Menu} from "antd";
import {observer} from "mobx-react-lite";
import {appStore} from "src/stores";

const SubMenu = Menu.SubMenu;

export interface Props {
  config: any;
  menuTitle?: string;
  /**菜单项目为hidden时是否匹配下一个项目 */
  stopActiveNext?: boolean;
}

// 点击节点参数
export interface ClickParams {
  key: string,
  keyPath: string[],
  item: any,
  domEvent: any,
}

export interface MenuConfig {
  title: string,
  children?: MenuConfig[]
}

export default observer(function LeftMenu(props: Props) {
  const [openKeys, setOpenKeys]: any = useState([]);

  // 通过 key 找到该 key 的路径
  const getPathByKey = (key?: string): string[] => {
    if (!key) {
      const path = appStore.location.pathname
      key = path.split('/').pop() || ''
    }
    const keys = key.split('_')
    // @ts-ignore
    return keys.reduce((pre: string[], cur) => {
      pre.length > 0 ? pre.push(pre[pre.length - 1] + '_' + cur) : pre.push(cur)
      return pre
    }, [])
  }

  useEffect(() => {
    // 设置默认打开的项
    setOpenKeys(getPathByKey());
  }, []);


  //判断是否隐藏 兼容Function类型
  const isHide = (hide: any): boolean => {
    if (typeof hide === "boolean") return hide;
    if (Object.prototype.toString.call(hide) === "[object Function]") {
      return !!hide();
    }
    return !!hide;
  };

  // 渲染目录节点
  const renderMenu = (list: any, parent = '') => {
    return list
      .filter((item: any) => {
        return !isHide(item.hide);
      })
      .map((item: any, index: number) => {
        if (item.children && item.children.length > 0) {
          return (
            <SubMenu
              key={`${parent}${item.title}`}
              title={
                <span>
                  {item.icon && <MenuIcon>{item.icon}</MenuIcon>}
                  <span>{item.title}</span>
                </span>
              }
            >
              {renderMenu(item.children, `${parent}${item.title}_`)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item
              key={`${parent}${item.title}`}
            >
              <span>
                {item.icon && <MenuIcon>{item.icon}</MenuIcon>}
                <span>{item.title}</span>
                {/* 选中时的箭头 */}
                <span className="selected-arrow">
                  <img src={require("src/components/images/菜单选中右箭头.png")} alt=""/>
                </span>
              </span>
            </Menu.Item>
          );
        }
      });
  };

  // 点击节点
  const handleItemClick: any = (params: ClickParams) => {
    const path = params.key
    appStore.history.push(path);
  }

  // 展开节点
  const onOpenChange = (keys: string[]) => {
    let keyArr = keys
    if (openKeys.length < keys.length) { // 打开
      const latestOpenKey = keys.find((key: string) => !openKeys.includes(key)) || keys[keys.length - 1]
      keyArr = getPathByKey(latestOpenKey)
    } else if (openKeys.length > keys.length) { // 关闭

    }
    setOpenKeys(keyArr);
  };

  return (
    <Wrapper id="left-menu-con">
      <Menu
        mode="inline"
        inlineIndent={12}
        onClick={handleItemClick}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={getPathByKey()}
      >
        {renderMenu(props.config)}
      </Menu>
    </Wrapper>
  );
});

const menu_bg_color = "#F2F2F2"; // 背景色
const item_bg_color = "#F9F9F9"; // item背景色
const normal_text_size = "13px"; // 正常文字大小
const normal_text_color = "#666666"; // 正常文字颜色
const active_text_color = "#00A680"; // 激活文字颜色
const sub_ul_bg = "#fff"; // 二级菜单背景颜色
const hover_li_bg = "#fff"; // 划过item背景颜色
const menu_li_bottom_line = "1px solid #E5E5E5"; // 划过item背景颜色
const sub_li_bottom_line = "1px dashed #E5E5E5"; // 划过item背景颜色
const Wrapper = styled.div`
  &#left-menu-con {
    * {
      font-size: ${normal_text_size};
    }
    /* height: 100%; */
    position: fixed;
    left: 0;
    top: 50px;
    bottom: 0;
    overflow: auto;
    background: ${menu_bg_color};
    width: 200px;
    border-right: 1px solid #cccccc;
    .ant-menu-inline {
      /* width: calc(100% + 0px); */
      /* margin-right: -1px; */
      border-right: 0;
    }
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.2);
    }
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      border-radius: 5px;
      background-color: #ffffff;
    }
    .ant-menu-item,
    .ant-menu-submenu-title {
      height: 40px;
      line-height: 40px;
      margin: 0;
      color: ${normal_text_color};
      width: 100%;
      border-bottom: ${menu_li_bottom_line};
      position: relative;
      background: ${item_bg_color};
      &:after {
        display: none;
      }
      &:hover {
        background: ${hover_li_bg};
        &:after {
          transform: none;
          opacity: 1;
          display: block;
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: auto;
          width: 3px;
          background: ${active_text_color};
          right: auto;
        }
      }
      &.ant-menu-item-selected.ant-menu-item-selected {
        background: ${hover_li_bg};
        color: ${active_text_color};
        font-weight: bold;
        position: relative;
        &::after {
          content: "";
          display: block;
          position: absolute;
          width: 2px;
          background: ${active_text_color};
          top: 0;
          bottom: 0;
          right: -1px;
          left: auto;
          z-index: 3;
        }
        &::before {
          content: "";
          position: absolute;
          display: block;
          background: ${active_text_color};
          top: 0;
          bottom: 0;
          right: 0;
          left: auto;
          width: 0;
          height: 0;
          border-top: 8px solid #fff;
          border-bottom: 8px solid #fff;
          border-left: 0 solid transparent;
          border-right: 8px solid ${active_text_color};
          margin: auto 0;
        }
        path {
          fill: ${active_text_color};
        }
      }
    }

    .ant-menu-submenu-open {
      background: ${sub_ul_bg};
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 2px;
        background: ${active_text_color};
        top: 0;
        bottom: 0;
        right: 0px;
        left: auto;
        z-index: 3;
      }

      &::before {
        content: "";
        position: absolute;
        top: 40px;
        bottom: 0;
        left: 21px;
        border-left: 1px dotted ${active_text_color};
        z-index: 2;
      }

      .ant-menu-submenu-title,
      .ant-menu-item {
        background: ${sub_ul_bg};
      }
      .ant-menu-item {
        border-bottom: ${sub_li_bottom_line};
        padding-left: 36px !important;
        &::after {
          display: none;
        }
        &:hover {
          color: ${active_text_color};
          font-weight: bold;
        }
        &::before {
          content: "";
          position: absolute;
          top: 0px;
          bottom: 0;
          left: 21px;
          width: 8px;
          height: 0;
          margin: auto 0;
          border-top: 1px dotted ${active_text_color};
          z-index: 2;
        }
      }
    }
    .ant-menu-submenu-selected {
      &>.ant-menu-submenu-title {
        fill: ${active_text_color};
        color: ${active_text_color};
        font-weight: bold;
      }
      .ant-menu-item-selected {
        font-weight: bold;
        .selected-arrow {
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          color: ${active_text_color};
          margin: auto 0;
          left: 16px;
          background: #fff;
          z-index: 2;
          height: 12px;
        }
      }
    }
  }
  .selected-arrow {
    display: none;
    img {
      height: 12px;
      display: block;
    }
  }
`;

const MenuIcon = styled.span`
  svg {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    position: relative;
    top: 4px;
    path {
      fill: ${normal_text_color};
    }
  }
`;

