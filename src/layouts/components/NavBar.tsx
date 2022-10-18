import React from 'react'
import service from 'src/services/api'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Place } from 'src/components/common'
import { appStore, authStore } from 'src/stores'
import { Dropdown, Menu, Tooltip } from 'src/vendors/antd'
import { ReactComponent as SYSC } from 'src/modules/UserManual/images/SYSC.svg'

import { navConfig, navConfigItem } from './navConfig_hj'
import { navConfig as navConfig_hjInterns } from './navConfig_hjInterns'
import { navConfig as navConfig_wh } from './navConfig_wh'
import { navConfig as navConfig_fssdy } from './navConfig_fssdy'
import { navConfig as navConfig_fssdySelf } from './navConfig_fssdySelf'
import { navConfig as navConfig_whSelf } from './navConfig_whSelf'
import { navConfig as navConfig_ys } from './navConfig_ys'
import { navConfig as navConfig_nys } from './navConfig_nys'
import { navConfig as navConfig_dzlc } from './navConfig_dzlc'
import { navConfig as navConfig_gzhd } from './navConfig_gzhd'
import { navConfig as navConfig_lcey } from './navConfig_lcey'
import { navConfig as navConfig_dghl } from './navConfig_dghl'
import { navConfig as navConfig_gzsrm } from './navConfig_gzsrm'
import { navConfig as navConfig_jmfy } from './navConfig_jmfy'
import { navConfig as navConfig_dgxg } from './navConfig_dgxg'
import { navConfig as navConfig_yczyy } from './navConfig_yczyy'
import { navConfig as navConfig_nfzxy } from './navConfig_nfzxy'
import { navConfig as navConfig_fqfybjy } from './navConfig_fqfybjy'
import { navConfig as navConfig_wjgdszd } from './navConfig_wjgdszd'
import { navConfig as navConfig_bhsrm } from './navConfig_bhsrm'
import { navConfig as navConfig_qzxyy } from './navConfig_qzxyy'
import { navConfig as navConfig_gxjb } from './navConfig_gxjb'
import { navConfig as navConfig_gxjbSelf } from './navConfig_gxjbSelf'
import { navConfig as navConfig_whyx } from './navConfig_whyx'
import { navConfig as navConfig_fsxt } from './navConfig_fsxt'
import { navConfig as navConfig_fsxtSelf } from './navConfig_fsxtSelf'
import { navConfig as navConfig_sdlj } from './navConfig_sdlj'
import { navConfig as navConfig_lyrm } from './navConfig_lyrm'
import { navConfig as navConfig_gdtj } from './navConfig_gdtj'
import { navConfig as navConfig_whfk } from './navConfig_whfk'
import { navConfig as navConfig_lyyz } from './navConfig_lyyz'
import { navConfig as navConfig_qhwy } from './navConfig_qhwy'
import { navConfig as navConfig_whsl } from './navConfig_whsl'
import { navConfig as navConfig_zzwy } from './navConfig_zzwy'
import { navConfig as navConfig_ytll } from './navConfig_ytll'
import { navConfig as navConfig_zhzxy } from './navConfig_zhzxy'
import { navConfig as navConfig_whhk } from './navConfig_whhk'
import { navConfig as navConfig_nfsd } from './navConfig_nfsd'

const toNavLink = (path: string | undefined) => {
  if (path) appStore.history.push(path);
  // return path ? () => appStore.history.push(path) : () => { };
};

export interface Props extends RouteComponentProps {}

const itemHidden = (hidden?: any,item?:any) => {
  // console.log(item)
  if(appStore.HOSPITAL_ID == "fsxt" && item?.path.indexOf('specialNurseRouter')>-1){
    // 是否有专科护理质量--佛山杏坛
    return !authStore.isSpecialMenu
  }
  if (!hidden) return false;
  if (Object.prototype.toString.call(hidden) == "[object Function]") {
    return !!hidden();
  } else {
    return true;
  }
};

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
            style={itemHidden(item.hidden,item) ? { display: "none" } : {}}
            key={index}
            onClick={() => {
              toNavLink(item.path);
              item.onClick && item.onClick();
            }}
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
  const realNavConfig = (() => {
    if (authStore.isOnlyInternsManage) {
      return navConfig_hjInterns(appStore, authStore);
    }
    if (appStore.HOSPITAL_ID == "wh") {
      if (authStore.isRoleManage) return navConfig_wh;
      else return navConfig_whSelf;
    } else if (appStore.HOSPITAL_ID == "ys") {
      return navConfig_ys;
    } else if (appStore.HOSPITAL_ID == "nys") {
      return navConfig_nys;
    } else if (appStore.HOSPITAL_ID == "dzlc") {
      return navConfig_dzlc;
    } else if (appStore.HOSPITAL_ID == "gzhd") {
      return navConfig_gzhd;
    } else if (appStore.HOSPITAL_ID == "lcey") {
      return navConfig_lcey;
    } else if (appStore.HOSPITAL_ID == "gzsrm") {
      return navConfig_gzsrm;
    } else if (appStore.HOSPITAL_ID == "jmfy") {
      return navConfig_jmfy;
    } else if (appStore.HOSPITAL_ID == "dghl") {
      return navConfig_dghl;
    } else if (appStore.HOSPITAL_ID == "dgxg") {
      return navConfig_dgxg;
    } else if (appStore.HOSPITAL_ID == "yczyy") {
      return navConfig_yczyy;
    } else if (appStore.HOSPITAL_ID == "nfzxy") {
      return navConfig_nfzxy;
    } else if (appStore.HOSPITAL_ID == "fqfybjy") {
      return navConfig_fqfybjy;
    } else if (appStore.HOSPITAL_ID == "wjgdszd") {
      return navConfig_wjgdszd(appStore, authStore);
    } else if (appStore.HOSPITAL_ID == "bhsrm") {
      return navConfig_bhsrm;
    } else if (appStore.HOSPITAL_ID == "qzxyy") {
      return navConfig_qzxyy;
    } else if (appStore.HOSPITAL_ID == "fssdy") {
      // return navConfig_fssdy
      if (authStore.isRoleManage) return navConfig_fssdy;
      else return navConfig_fssdySelf;
    } else if (appStore.HOSPITAL_ID == "gxjb") {
      // return navConfig_gxjb
      if (authStore.isRoleManage) return navConfig_gxjb;
      else return navConfig_gxjbSelf;
    } else if (appStore.HOSPITAL_ID == "fsxt") {
      // return navConfig_fssdy
      if (authStore.isRoleManage) return navConfig_fsxt;
      else return navConfig_fsxtSelf;
    } else if (appStore.HOSPITAL_ID == "whyx") {
      return navConfig_whyx(appStore, authStore);
    } else if (appStore.HOSPITAL_ID == "sdlj") {
      return navConfig_sdlj(appStore, authStore);
      //return navConfig_sdljSelf
    } else if (appStore.HOSPITAL_ID == "lyrm") {
      return navConfig_lyrm(appStore, authStore)
      //return navConfig_sdljSelf
    } else if (appStore.HOSPITAL_ID == 'gdtj') {
      return navConfig_gdtj(appStore, authStore)
    } else if (appStore.HOSPITAL_ID == 'whfk') {
      return navConfig_whfk(appStore, authStore)
    } else if (appStore.HOSPITAL_ID == 'lyyz') {
      return navConfig_lyyz(appStore, authStore)
    } else if (appStore.HOSPITAL_ID == 'qhwy') {
      return navConfig_qhwy(appStore, authStore)
    } else if (appStore.HOSPITAL_ID == 'whsl') {
      return navConfig_whsl(appStore, authStore)
    } else if (appStore.HOSPITAL_ID == 'zzwy') {
      return navConfig_zzwy(appStore, authStore)
    } else if (appStore.HOSPITAL_ID == 'ytll') {
      return navConfig_ytll
    } else if (appStore.HOSPITAL_ID == 'zhzxy') {
      return navConfig_zhzxy(appStore, authStore)
    } else if (appStore.HOSPITAL_ID == 'whhk') {
      return navConfig_whhk(appStore, authStore)
    } else if (appStore.HOSPITAL_ID == 'nfsd') {
      return navConfig_nfsd(appStore, authStore)
    }
    return navConfig;
  })();

  let location = appStore.location;

  const LogoView = () => {
    let view = (
      <React.Fragment>
        <img
          src={require("../images/logo-white.png")}
          alt=""
          className="logo"
        />
        <img
          src={require("../images/护理管理系统.png")}
          alt=""
          className="name"
        />
      </React.Fragment>
    );
    // console.log(appStore.HOSPITAL_ID, 'appStore.HOSPITAL_ID')
    if (!process.env.REACT_APP_BLANK_DEMO)
      switch (appStore.HOSPITAL_ID) {
        case "wh":
          view = (
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
          );
          break;
        case "hj":
          view = (
            <React.Fragment>
              <img
                src={require("../images/厚街logo.png")}
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
          );
          break;
        case "nfzxy":
          view = (
            <React.Fragment>
              <img
                src={require("../images/南方中西医logo.png")}
                alt=""
                className="logo"
                style={{ height: 30 }}
              />
              {/* <img
                src={require("../images/护理管理系统.png")}
                alt=""
                className="name"
                style={{ paddingRight: 30 }}
              /> */}
              <div className="nameTitle">
                {appStore.hospitalOtherName}护理管理系统
              </div>
            </React.Fragment>
          );
          break;
        case "gzsrm":
          view = (
            <React.Fragment>
              <img
                src={require("../images/贵州省人民医院.png")}
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
          );
          break;
        case "lcey":
          view = (
            <React.Fragment>
              <img
                // src={require("../images/lcey_logo.jpg")}
                src={require("../images/liaocheng_logo.png")}
                alt=""
                className="logo"
                style={{ height: 30 }}
              />
              {/*<img*/}
              {/*  src={require("../images/护理管理系统.png")}*/}
              {/*  alt=""*/}
              {/*  className="name"*/}
              {/*  style={{ paddingRight: 30 }}*/}
              {/*/>*/}
            </React.Fragment>
          );
          break;
        case "gzhd":
          view = (
            <React.Fragment>
              <img
                src={require("../../assets/images/gzhdLogo.png")}
                alt=""
                className="logo"
                style={{ height: 30 }}
              />
              {/* <img
                src={require("../images/护理管理系统.png")}
                alt=""
                className="name"
                style={{ paddingRight: 30 }}
              /> */}
              <div className="nameTitle">
                {appStore.hospitalOtherName}护理管理系统
              </div>
            </React.Fragment>
          );
          break;
        case "whsl":
          view = (
            <React.Fragment>
              <img
                src={require("../../assets/images/whsl_logo.png")}
                alt=""
                className="logo"
                style={{ height: 38 }}
              />
            </React.Fragment>
          );
          break;
      }

    if (appStore.onlyBadEvent)
      view = (
        <React.Fragment>
          <img
            src={require("../images/BadEventLogo.svg")}
            alt=""
            className="logo"
            style={{ height: 30, paddingLeft: 30 }}
          />
          <img
            src={require("../images/BadEventLogoText.svg")}
            alt=""
            className="name"
            style={{ paddingRight: 30 }}
          />
        </React.Fragment>
      );

    return <LogoCon>{view}</LogoCon>;
  };

  return (
    <Wrapper style={props.style || {}}>
      {LogoView()}
      {realNavConfig.map(
        (item, index: number) =>
          !itemHidden(item.hidden) && (
            <Dropdown
              overlay={
                item.children ? (
                  <MenuCon list={item.children} style={item.menuStyle}/>
                ) : (
                  <div />
                )
              }
              key={index}
            >
              <NavItem
                onClick={() => {
                  toNavLink(item.path);
                  item.onClick && item.onClick();
                }}
                active={
                  (item.path !== "" &&
                    (item.path &&
                      location &&
                      location.pathname.indexOf(item.path) === 0)) ||
                  (item.children &&
                    item.children.some(
                      (item: any) =>
                        !!(
                          item.path &&
                          location &&
                          location.pathname.indexOf(item.path) === 0
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
        {!appStore.onlyBadEvent && (
          <UserManual
            onClick={() => {
              appStore.history.push("/UserManual");
            }}
          >
            <Tooltip placement="top" title="平台使用手册">
              <SYSC />
            </Tooltip>
          </UserManual>
        )}
        {authStore.user && authStore.user.nearImageUrl && (
          <img src={authStore.user.nearImageUrl} alt="" className="headImg" />
        )}
        <span className="name">{authStore.user && authStore.user.empName}</span>
        <span className="line">|</span>
        <span
          className="logout"
          onClick={() => service.authApiService.logout()}
        >
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
  background: ${(p) => p.theme.$mtc};
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
  margin-left: 6px;
  .logo {
    height: 26px;
    margin-right: 10px;
  }
  .name {
    height: 16px;
  }
  .nameTitle {
    font-weight: bold;
    font-size: 14px;
    color: #fff;
    margin-right: 4px;
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
  background: ${(p) => p.active && p.theme.$mcc};
  color: #fff;
  @media (max-width: 1440px) {
    padding: 0 5px 0 5px;
  }
  @media (max-width: 1280px) {
    padding: 0 3px 0 3px;
    letter-spacing: -1px;
  }
  svg {
    width: 16px;
    height: 16px;
    /* margin-top: 6px; */
    margin-right: 2px;
    path {
      /* fill: ${(p) => (p.active ? "#fff" : "#747474")}; */
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
  min-width: 132px;
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
    bottom: -3px;
    left: -35px;
  }
`;
