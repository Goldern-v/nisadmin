import LeftMenu from "src/components/LeftMenu";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "src/components/RouterView";

import { Provider, KeepAlive } from "react-keep-alive";
import { ReactComponent as CFJL } from "./images/icon/CFJL.svg";
import { ReactComponent as CFJHB } from "./images/icon/CFJHB.svg";
import { ReactComponent as CFJHBG } from "./images/icon/CFJHBG.svg";
import { ReactComponent as JCTJ } from "./images/icon/JCTJ.svg";
import { ReactComponent as WJSX } from "./images/icon/WJSX.svg";

export interface Props extends RouteComponentProps<{ name?: string }> { }

import { ReactComponent as SJZK } from "./images/icon/SJZK.svg";
import { ReactComponent as YDBG } from "./images/icon/YDBG.svg";
import { ReactComponent as HZBG } from "./images/icon/HZBG.svg";
import { ReactComponent as WTBG } from "./images/icon/WTBG.svg";
import { appStore } from "src/stores";
import BadEventsNewList from './BadEventsNewList'

export default function BadEventsRouters(props: Props) {
  useEffect(() => { }, [props.history.location.pathname]);

  const LEFT_MENU_CONFIG: any = [
    {
      title: " 不良事件查询",
      // icon: <SJZK />,
      path: "/home",
      component: BadEventsNewList,
      // keepAlive: true,
      // disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
    }
  ];
  let currentRoutePath = props.history.location.pathname || "";
  let currentRoute = getTargetObj(LEFT_MENU_CONFIG, "path", currentRoutePath);
  // 筛选目标对象
  function getTargetObj(listDate: any, targetKey: string, targetName: string) {
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find(
          (item1: any) => item1[targetKey].split('?')[0] === targetName
        );
      } else {
        return item[targetKey].split('?')[0] === targetName;
      }
    });
    if (chooseRoute && chooseRoute.children) {
      chooseRoute = chooseRoute.children.find(
        (item1: any) => item1[targetKey] === targetName
      );
    }
    return chooseRoute;
  }

  return (
    <Wrapper>
      <LeftMenuCon>
        <LeftMenu config={LEFT_MENU_CONFIG} />
      </LeftMenuCon>
      <MainCon>
        {currentRoute &&
          currentRoute.component &&
          (currentRoute.keepAlive ? (
            <KeepAlive
              name={currentRoute.path}
              disabled={currentRoute.disabledKeepAlive}
            >
              <currentRoute.component
                getTitle={currentRoute && currentRoute.title}
              />
            </KeepAlive>
          ) : (
              <currentRoute.component
                getTitle={currentRoute && currentRoute.title}
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
`;

const LeftMenuCon = styled.div`
  width: 200px;
`;
const MainCon = styled.div`
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;
