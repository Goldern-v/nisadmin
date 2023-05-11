import LeftMenu from "src/components/LeftMenu";
import styled from "styled-components";
import React, { useState } from "react";
import { appStore } from "src/stores";
import { KeepAlive } from "src/vendors/keep-alive";
import { Icon, Spin } from "antd";

// 引入自动推送设置页面
export interface Props {
  leftMenuConfig: any[];
  /**菜单项目为hidden时是否匹配下一个项目 */
  stopActiveNext?: boolean,
  loading?: boolean,
  stopRedirect?: boolean,
  /**是否展示按钮 */
  showSwitch?: boolean
}

export default function LeftMenuPage(props: Props) {
  let { leftMenuConfig, loading, stopRedirect, showSwitch = false } = props;
  const [showLeft, setShowLeft] = useState(true)
  let currentRoutePath = appStore.location.pathname || "";
  let currentRoute = getTargetObj(leftMenuConfig, "path", currentRoutePath);
  // 筛选目标对象
  function getTargetObj(listDate: any, targetKey: string, targetName: string) {
    // debugger
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find(
          (item1: any) => item1[targetKey] === targetName
        );
      } else {
        return item[targetKey] === targetName;
      }
    });
    if (chooseRoute && chooseRoute.children) {
      chooseRoute = chooseRoute.children.find(
        (item1: any) => item1[targetKey] === targetName
      );
    }
    return chooseRoute;
  }
  if (!currentRoute) {
    if (!stopRedirect)
      appStore.history.replace(
        leftMenuConfig[0].children
          ? leftMenuConfig[0].children[0].path
          : leftMenuConfig[0].path
      );
  }
  // console.log(currentRoute, 'currentRoute')
  return (
    <Wrapper>
      <LeftMenuCon showLeft={showLeft}>
        {loading && (
          <Spin
            spinning={true}
            className="spinning-wrapper">
            <FullCon></FullCon>
          </Spin>
        )}
        {!loading && currentRoute && currentRoute.component && (
          <LeftMenu showLeft={showLeft} config={leftMenuConfig} stopActiveNext={!!props.stopActiveNext} />
        )}
        {showSwitch && <div className="btn" onClick={() => setShowLeft(!showLeft)}>
          <Icon type={showLeft ? 'right' : 'left'} style={{ lineHeight: '73px',fontSize: '12px'}} />
        </div>}
      </LeftMenuCon>
      <MainCon
        style={currentRoute && currentRoute.style ? currentRoute.style : {}}
      >
        {currentRoute &&
          currentRoute.component &&
          (currentRoute.keepAlive ? (
            <KeepAlive
              name={currentRoute.path}
              disabled={currentRoute.disabledKeepAlive}
            >
              <currentRoute.component
                getTitle={currentRoute && currentRoute.title}
                payload={currentRoute && currentRoute.payload}
              />
            </KeepAlive>
          ) : (
            <currentRoute.component
              getTitle={currentRoute && currentRoute.title}
              payload={currentRoute && currentRoute.payload}
            />
          ))}
      </MainCon>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  overflow: hidden;
  height: calc(100vh - 50px);
  display: flex;
  align-items: stretch;
  .spinning-wrapper{
    border-right: 1px solid #ddd;
    background: #eee;
  }
`;
export interface LeftMenuConIn {showLeft: boolean}
const LeftMenuCon = styled.div<LeftMenuConIn>`
  width: ${(p) => p.showLeft ? `200px`: 0};
  position: relative;
  .btn {
    position: absolute;
    top: 49%;
    left: 100%;
    width: 10px;
    height: 73px;
    background-color: #fff;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    box-shadow: 2px 1px 10px 1px #ccc;
    cursor: pointer;
  }
`;
const MainCon = styled.div`
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;

// const TopCon = styled.div`
//   height: 45px;
//   background: #f8f8f8;
//   box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
//   border-bottom: 1px solid #dbe0e4;
//   font-size: 13px;
//   position: relative;
//   font-size: 16px;
//   color: #333333;
//   padding: 0 20px;
//   display: flex;
//   align-items: center;
//   z-index: 1;
// `;

// const TableCon = styled.div`
//   flex: 1;
//   margin: 15px;
//   background: #fff;
//   border: 1px solid rgba(228, 228, 228, 1);
// `;

const FullCon = styled.div`
  width: 100%;
  height: 100%;
`
