import LeftMenu from "src/components/LeftMenu";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "src/components/RouterView";
import QualityControlRecord from "./views/qualityControlRecord/QualityControlRecord";
import Analysis from "./views/analysisWhyx/Analysis";
import SummaryReport from "./views/summaryReport/SummaryReport";
import ProblemSummary from "./views/problemSummary/ProblemSummary";

import { Provider, KeepAlive } from "react-keep-alive";
export interface Props extends RouteComponentProps<{ name?: string }> {}

import { ReactComponent as EJZK } from "./images/icon/EJZK.svg";
import { ReactComponent as YDBG } from "./images/icon/YDBG2.svg";
import { ReactComponent as HZBG } from "./images/icon/HZBG.svg";
import { ReactComponent as WTBG } from "./images/icon/WTBG.svg";
import { appStore } from "src/stores";
import { qcOneTitle } from "./data/qcTitle";

export default function QcOneRouterHj(props: Props) {
  const route_analysis = {
    title: "一级质控月度报告",
    icon: <YDBG />,
    path: "/qcOneWhyx/analysis?level=1",
    component: Analysis,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
  };

  const route_summaryReport = {
    title: "一级质控汇总报告",
    icon: <HZBG />,
    path: "/qcOneWhyx/summaryReport?level=1",
    component: SummaryReport,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
  };
  const route_problemSummary = {
    title: "一级质控问题汇总",
    icon: <WTBG />,
    path: "/qcOneWhyx/problemSummary?level=1",
    component: ProblemSummary,
  };
  const LEFT_MENU_CONFIG: any = [
    {
      title: qcOneTitle.leftNavTitle,
      path: "/qcOneWhyx",
      icon: <EJZK />,
      component: { ...QualityControlRecord },
      keepAlive: true,
      disabledKeepAlive:
        (appStore.history && appStore.history.action) !== "POP",
    },
    route_analysis,
    route_summaryReport,
    route_problemSummary,
  ];
  useEffect(() => {}, [props.history.location.pathname]);
  let currentRoutePath = props.history.location.pathname || "";
  let currentRoute = getTargetObj(LEFT_MENU_CONFIG, "path", currentRoutePath);
  // 筛选目标对象
  function getTargetObj(listDate: any, targetKey: string, targetName: string) {
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find(
          (item1: any) => item1[targetKey].split("?")[0] === targetName
        );
      } else {
        return item[targetKey].split("?")[0] === targetName;
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
