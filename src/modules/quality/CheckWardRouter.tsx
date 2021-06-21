import LeftMenu from "src/components/LeftMenu";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "src/components/RouterView";
import { Provider, KeepAlive } from "react-keep-alive";
export interface Props extends RouteComponentProps<{ name?: string }> { }

import { ReactComponent as CFJL } from "./images/icon/CFJL.svg";
import { ReactComponent as CFJHB } from "./images/icon/CFJHB.svg";
import { ReactComponent as CFJHBG } from "./images/icon/CFJHBG.svg";
import CheckWardReportList from "./views/checkWard/view/reportList/CheckWardReportList";
import RecordView from "./views/checkWard/view/record/RecordView";
import ScheduleView from "./views/checkWard/view/schedule/ScheduleView";
import CheckWardReportView from "./views/checkWard/view/report/CheckWardReportView";
import 月护长查房反馈表 from './views/特殊时段查房统计报告_jmfy/月护长查房反馈表/月护长查房反馈表'

import { appStore } from "src/stores";

const LEFT_MENU_CONFIG: any = appStore.hisMatch({
  map: {
    jmfy: [
      {
        title: "特殊时段查房统计报告",
        icon: <CFJHBG />,
        children: [
          {
            title: "月护长查房反馈表",
            path: "/checkWard/月护长查房反馈表",
            component: 月护长查房反馈表,
            keepAlive: true,
            disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
          },
        ]
      }
    ],
    default: [
      {
        title: "特殊时段查房记录",
        path: "/checkWard",
        icon: <CFJL />,
        component: RecordView,
        keepAlive: true,
        disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
      },
      {
        title: "特殊时段计划表",
        path: "/checkWard/schedule",
        icon: <CFJHB />,
        component: ScheduleView
      },
      // {
      //   title: '特殊时段查房统计报告',
      //   path: '/checkWard/checkWardReportView',
      //   icon: <CFJHBG />,
      //   component: CheckWardReportView
      // },
      {
        title: "特殊时段查房统计报告",
        path: "/checkWard/checkWardReportList",
        icon: <CFJHBG />,
        component: CheckWardReportList,
        keepAlive: true,
        disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
      }
    ]
  }
})

//CheckWardReportList

export default function CheckWardRouter(props: Props) {
  useEffect(() => { }, [props.history.location.pathname]);
  let currentRoutePath = props.history.location.pathname || "";
  let currentRoute = getTargetObj(LEFT_MENU_CONFIG, "path", currentRoutePath);
  // 筛选目标对象
  function getTargetObj(listDate: any, targetKey: string, targetName: string) {
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
