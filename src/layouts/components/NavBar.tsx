import styled from "styled-components";
import React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react-lite";
import { Place } from "src/components/common";
import { authStore, appStore } from "src/stores";
import service from "src/services/api";
import { Menu, Dropdown, Tooltip } from "src/vendors/antd";
import { navConfig, navConfigItem } from "./navConfig_hj";
import { navConfig as navConfig_wh } from "./navConfig_wh";
import { navConfig as navConfig_whSelf } from "./navConfig_whSelf";
import { navConfig as navConfig_ys } from "./navConfig_ys";
import { ReactComponent as SYSC } from "src/modules/UserManual/images/SYSC.svg";

const toNavLink = (path: string | undefined) => {
  return path ? () => appStore.history.push(path) : () => {};
};

export interface Props extends RouteComponentProps {}

const MenuCon = observer(function(props: {
  list: navConfigItem[];
  style?: React.CSSProperties | undefined;
}) {
  let { list, style } = props;
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

      &:hover,
      &.active {
        font-weight: bold;
        background: #f8f8fa;
      }
      .icon {
        height: 14px;
        margin-right: 12px;
      }
    }
  `;
  return (
    <Wrapper style={style || {}}>
      <Menu>
        {list.map((item, index) => (
          <Menu.Item
            style={item.hidden ? { display: "none" } : {}}
            key={index}
            onClick={toNavLink(item.path)}
            className={
              appStore.location.pathname.indexOf(item.path || "") > -1
                ? "active"
                : ""
            }
          >
            <img src={item.icon} alt="" className="icon" />
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
    </Wrapper>
  );
});

export default observer(function NavBar(props: any) {
  const realNavConfig =
    appStore.HOSPITAL_ID == "wh"
      ? authStore.isRoleManage
        ? navConfig_wh
        : navConfig_whSelf
      : appStore.HOSPITAL_ID == "ys"
      ? navConfig_ys
      : navConfig;

  let location = appStore.location;
  return (
    <Wrapper style={props.style || {}}>
      <LogoCon>
        {appStore.HOSPITAL_ID == "wh" ? (
          <React.Fragment>
            <img
              src={require("../images/武汉logo.png")}
              alt=""
              className="logo"
              style={{ height: 30 }}
            />
            <img
              src={require("../images/护理管理系统.png")}
              alt=""
              className="name"
              style={{ paddingRight: 30 }}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <img
              src={require("../images/logo-white.png")}
              alt=""
              className="logo"
            />
            <img
              src={require("../images/宸瑞护理管理系统.png")}
              alt=""
              className="name"
            />
          </React.Fragment>
        )}
      </LogoCon>
      {realNavConfig.map(
        (item, index: number) =>
          !item.hidden && (
            <Dropdown
              overlay={
                item.children ? (
                  <MenuCon list={item.children} style={item.menuStyle} />
                ) : (
                  <div />
                )
              }
              key={index}
            >
              <NavItem
                onClick={toNavLink(item.path)}
                active={
                  (item.path !== "" &&
                    (item.path &&
                      location &&
                      location.pathname.indexOf(item.path) !== -1)) ||
                  (item.children &&
                    item.children.some(
                      (item: any) =>
                        !!(
                          item.path &&
                          location &&
                          location.pathname.indexOf(item.path) !== -1
                        )
                    ))
                }
                key={item.name}
              >
                {/* {item.icon} */}
                {/* <ReactSVG src={item.icon} svgClassName='nav-icon' /> */}
                <div className="nav-name">{item.name}</div>
              </NavItem>
            </Dropdown>
          )
      )}
      <Place />
      <RightCon>
        {appStore.isDev && (
          <UserManual
            onClick={() => {
              appStore.history.push("/UserManual/Guidance");
            }}
          >
            <Tooltip placement="top" title="平台使用手册">
              <SYSC />
            </Tooltip>
          </UserManual>
        )}
        {appStore.isDev && (
          <Tooltip placement="top" title="平台使用手册目录设置">
            <span
              className="setting"
              onClick={() => {
                appStore.history.push("/SetUserManual");
              }}
            >
              设置
            </span>
          </Tooltip>
        )}
        {authStore.user && authStore.user.nearImageUrl && (
          <img src={authStore.user.nearImageUrl} alt="" className="headImg" />
        )}
        <span className="name">{authStore.user && authStore.user.empName}</span>
        <span className="line">|</span>
        <span className="logout" onClick={service.authApiService.logout}>
          退出
        </span>
      </RightCon>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 50px;
  background: ${p => p.theme.$mtc};
  position: relative;
  padding-bottom: 2px;
  z-index: 2;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -1px;
    height: 2px;
    background: #fff;
  }
  .setting {
    cursor: pointer;
    margin-right: 5px;
  }
`;
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
`;

const NavItem = styled.div<{ active?: boolean }>`
  height: 50px;
  min-width: 40px;
  display: flex;
  padding: 0 10px 0 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
  position: relative;
  background: ${p => p.active && p.theme.$mcc};
  color: #fff;
  svg {
    width: 16px;
    height: 16px;
    /* margin-top: 6px; */
    margin-right: 2px;
    path {
      /* fill: ${p => (p.active ? "#fff" : "#747474")}; */
    }
    title {
      display: none;
    }
  }
`;

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
`;
const UserManual = styled.span`
  cursor: pointer;
  align-items: center;
  position: relative;
  svg {
    width: 22px;
    height: 15px;
    position: absolute;
    bottom: -2px;
    left: -25px;
  }
`;
