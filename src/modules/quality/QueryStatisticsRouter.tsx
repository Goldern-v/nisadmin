import LeftMenu from "src/components/LeftMenu";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "src/components/RouterView";
import QualityControlRecord from "./views/qualityControlRecord/QualityControlRecord";

import Analysis from "./views/analysis/Analysis";
import SummaryReport from "./views/summaryReport/SummaryReport";
import WorkSummaryReportList from "./views/workSummaryReportList/WorkSummaryReportList";
import ProblemSummary from "./views/problemSummary/ProblemSummary";
export interface Props extends RouteComponentProps<{ name?: string }> {}
import QueryStatistics from "./views/queryStatistics/QueryStatistics";
import WritingForm from "./views/writingForm/WritingForm";
import VTEForm from "./views/VTEForm/vteForm";
import ConsultationForm from "./views/consultationForm/ConsultationForm";
import NotVTEForm from "./views/VTEForm/notVteForm";
import { ReactComponent as JCTJ } from "./images/icon/JCTJ.svg";
import { ReactComponent as WJSX } from "./images/icon/WJSX.svg";
import { appStore } from "src/stores";

const LEFT_MENU_CONFIG: any = [
  {
    title: "检查表单统计表",
    path: "/queryStatistics",
    icon: <JCTJ />,
    component: QueryStatistics
  },
  {
    title: "文件书写统计表",
    path: "/queryStatistics/writingForm",
    icon: <WJSX />,
    component: WritingForm
  },
  appStore.HOSPITAL_ID === "gzhd" && 
  {
    title: "术科VTE质量单统计",
    path: "/queryStatistics/VTE",
    icon: <WJSX />,
    component: VTEForm
  },
  appStore.HOSPITAL_ID === "gzhd" && 
  {
    title: "非术科VTE质量单统计",
    path: "/queryStatistics/notVTE",
    icon: <WJSX />,
    component: NotVTEForm
  },
  appStore.HOSPITAL_ID === "gzhd" && 
  {
    title: "护理会诊统计",
    path: "/queryStatistics/Consultation",
    icon: <WJSX />,
    component: ConsultationForm
  },
].filter((item: any) => item)



export default function QueryStatisticsRouter(props: Props) {
  useEffect(() => {}, [props.history.location.pathname]);
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
        {currentRoute && currentRoute.component && (
          <currentRoute.component
            getTitle={currentRoute && currentRoute.title}
          />
        )}
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
