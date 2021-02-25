import LeftMenu from "src/components/LeftMenu";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "src/components/RouterView";

import { Provider, KeepAlive } from "react-keep-alive";
// import { ReactComponent as CFJL } from "./images/icon/CFJL.svg";

export interface Props extends RouteComponentProps<{ name?: string }> { }

import { appStore, authStore } from "src/stores";
import BadEventsNewList from './BadEventsNewList'
import BadEventsNewList_nys from './BadEventsNewList_nys'
import BadEventsNewList_gzsrm from './BadEventsNewList_gzsrm'
import 不良事件发生率 from './views/不良事件发生率'
import 不良事件统计 from './views/不良事件统计'
import BadEventReportList from './views/BadEventReportList/BadEventReportList'

export default function BadEventsRouters(props: Props) {
  useEffect(() => { }, [props.history.location.pathname]);

  let LEFT_MENU_CONFIG: any[] = [
    ...appStore.hisMatch({
      map: {
        'nys': [
          {
            title: " 不良事件查询",
            // icon: <SJZK />,
            path: "/home",
            component: BadEventsNewList_nys,
            keepAlive: true,
            disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
          },
        ],
        'gzsrm': [
          {
            title: " 不良事件查询",
            // icon: <SJZK />,
            path: "/home",
            component: BadEventsNewList_gzsrm,
            keepAlive: true,
            disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
          },
        ],
        other: [
          {
            title: " 不良事件查询",
            // icon: <SJZK />,
            path: "/home",
            component: BadEventsNewList,
            keepAlive: true,
            disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
          },
        ]
      }
    }),
    {
      title: '不良事件统计',
      path: '/home/不良事件统计',
      component: 不良事件统计,
    },
    {
      title: '不良事件发生率',
      path: '/home/不良事件发生率',
      component: 不良事件发生率,
    },
    ...appStore.hisMatch({
      map: {
        hj: [
          {
            title: '不良事件分析报告',
            path: '/home/不良事件分析报告',
            component: BadEventReportList,
            // hide: appStore.isDev ? false : true,
            keepAlive: true,
            disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
          }
        ],
        other: []
      }
    })
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
