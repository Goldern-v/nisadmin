import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import React, { useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import { KeepAlive } from 'react-keep-alive'
import { appStore, authStore } from 'src/stores'
import { observer } from 'src/vendors/mobx-react-lite'

import AdministrativeWard from './views/administrativeWard'
import Analysis from './views/analysisWhyx/Analysis'
// import ProblemSummary from './views/problemSummary/ProblemSummary'
import QualityControlKey from './views/qualityControlKey/QualityControlKey'
import QualityControlRecord from './views/qualityControlRecord/QualityControlRecord'
import SafetyChecklist from './views/safetyChecklist'
// import SummaryReport from './views/summaryReport/SummaryReport'
import WorkSummaryReportList from './views/workSummaryReportList/WorkSummaryReportList'
import { ReactComponent as HZBG } from './images/icon/HZBG.svg'
import { ReactComponent as EJZK } from './images/icon/EJZK.svg'
import { ReactComponent as YDBG } from './images/icon/YDBG2.svg'
// import { ReactComponent as WTBG } from './images/icon/WTBG.svg'
import { ReactComponent as JCTJ } from './images/icon/JCTJ.svg'

import 护理质量巡查情况汇总表 from "./views/qcFormHj/护理质量巡查情况汇总表";
import 防疫专项检查片区汇总 from "./views/防疫专项检查片区汇总列表/防疫专项检查片区汇总列表";
import 防疫专项检查汇总 from "./views/防疫专项检查汇总列表/防疫专项检查汇总列表";

export interface Props extends RouteComponentProps<{ name?: string }> {}

import 护理质量检查小结 from "./views/qcFormHj/护理质量检查小结";
import Gzsrm_护理质量检查小结 from "./views/qcFormGzsrm/护理质量检查小结";
import 质控表单汇总 from "./views/qcDghl/质控表单汇总";
import 二级质控问题原因措施汇总 from "./views/qcFormGzsrm/二级质控问题原因措施汇总";
import 福清二级质控问题原因措施汇总 from "./views/qcFormFqfybjy/二级质控问题原因措施汇总";
// import Analysis from "./views/analysis/Analysis";
export default observer(function QcTwoRouter(props: Props) {
  const route_质控表单汇总 = {
    title: "单个质控表单汇总",
    icon: <HZBG />,
    path: "/qcTwo/质控表单汇总?qcLevel=2",
    component: 质控表单汇总,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
  };
  const route_二级质控问题原因措施汇总 = {
    // title: "二级质控问题原因措施汇总",
    // path: "/qcTwo/二级质控问题原因措施汇总?qcLevel=2",
    title: "专科护理质量评价",
    path: "/qcTwo/专科护理质量评价?qcLevel=2",
    icon: <JCTJ />,
    component: 二级质控问题原因措施汇总,
  };
  const route_福清二级质控问题原因措施汇总 = {
    title: "二级质控问题原因措施汇总",
    path: "/qcTwo/二级质控问题原因措施汇总?qcLevel=2",
    icon: <JCTJ />,
    component: 福清二级质控问题原因措施汇总,
  };
  const route_QualityControlKey = {
    title: "片区质控重点",
    path: "/qcTwo/qualityControlKey?qcLevel=2",
    icon: <JCTJ />,
    hide: !(
      authStore.isDepartment ||
      authStore.isSupervisorNurse ||
      authStore.isRoleManage
    ),
    component: QualityControlKey,
  };
  // 行政查房
  const route_administrativeWard = {
    title: "行政查房",
    path: "/qcTwo/administrativeWard",
    icon: <EJZK />,
    component: AdministrativeWard,
    keepAlive: true,
    disabledKeepAlive:
      (appStore.history && appStore.history.action) !== "POP",
  };
  // 行政查房
  const route_safetyChecklist = {
    title: "安全检查表",
    path: "/qcTwo/safetyChecklist",
    icon: <EJZK />,
    component: SafetyChecklist,
    keepAlive: true,
    disabledKeepAlive:
      (appStore.history && appStore.history.action) !== "POP",
  };
  const route_analysis = {
    title: "二级质控月度报告",
    icon: <YDBG />,
    path: "/qcTwo/analysis?level=2",
    component:Analysis,
    hide: !authStore.level2Watch,
    disabledKeepAlive: true,
  };

  // const route_summaryReport = {
  //   title: "二级质控汇总报告",
  //   icon: <HZBG />,
  //   path: "/qcTwo/summaryReport?level=2",
  //   component: SummaryReport,
  //   keepAlive: true,
  //   disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
  // };
  // const route_problemSummary = {
  //   title: "二级质控问题汇总",
  //   icon: <WTBG />,
  //   path: "/qcTwo/problemSummary?level=2",
  //   component: ProblemSummary,
  // };

  const extra_menu = appStore.hisMatch({
    map: {
      "hj,gxjb,lyyz,qhwy,lyrm,whhk,nfsd,dglb,stmz,qzde,dghm": [
        {
          title: "护理质量巡查情况汇总表",
          icon: <YDBG />,
          path: "/qcTwo/护理质量巡查情况汇总表?qcLevel=2",
          component: 护理质量巡查情况汇总表,
          keepAlive: true,
          // hide: !appStore.isDev,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
        {
          title: "护理质量检查小结",
          icon: <YDBG />,
          path: "/qcTwo/护理质量检查小结?qcLevel=2",
          component: 护理质量检查小结,
          keepAlive: true,
          // hide: !appStore.isDev,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
      ],
      yczyy: [
        {
          title: "护理质量巡查情况汇总表",
          icon: <YDBG />,
          path: "/qcTwo/护理质量巡查情况汇总表?qcLevel=2",
          component: 护理质量巡查情况汇总表,
          keepAlive: true,
          // hide: !appStore.isDev,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
      ],
      gzsrm: [
        {
          title: "护理质量巡查情况汇总表",
          icon: <YDBG />,
          path: "/qcTwo/护理质量巡查情况汇总表?qcLevel=2",
          component: 护理质量巡查情况汇总表,
          keepAlive: true,
          // hide: !appStore.isDev,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
        {
          title: "护理质量检查小结",
          icon: <YDBG />,
          path: "/qcTwo/护理质量检查小结?qcLevel=2",
          component: Gzsrm_护理质量检查小结,
          keepAlive: true,
          // hide: !appStore.isDev,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
        route_二级质控问题原因措施汇总,
        route_QualityControlKey,
        route_administrativeWard,
        route_safetyChecklist,
      ],
      dghl: [
        {
          title: "护理质量巡查情况汇总表",
          icon: <YDBG />,
          path: "/qcTwo/护理质量巡查情况汇总表?qcLevel=2",
          component: 护理质量巡查情况汇总表,
          keepAlive: true,
          // hide: !appStore.isDev,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
        route_质控表单汇总,
      ],
      fqfybjy: [
        {
          title: "二级质控月度报告",
          icon: <YDBG />,
          path: "/qcTwo/workSummaryReportList",
          component: WorkSummaryReportList,
          keepAlive: true,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
        {
          title: "防疫专项检查分析报告",
          icon: <YDBG />,
          path: "/qcTwo/防疫专项检查分析报告",
          component: 防疫专项检查片区汇总,
          keepAlive: true,
          // hide: !appStore.isDev,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
        {
          title: "防疫专项检查汇总报告",
          icon: <YDBG />,
          path: "/qcTwo/防疫专项检查汇总",
          component: 防疫专项检查汇总,
          keepAlive: true,
          // hide: !appStore.isDev,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
        route_福清二级质控问题原因措施汇总,
      ],
      'whyx,whhk': [route_analysis],
      // whyx: [route_analysis, route_summaryReport, route_problemSummary],
      default: [
        {
          title: ['fssdy'].includes(appStore.HOSPITAL_ID)?"交叉检查月度报告":"二级质控月度报告",
          icon: <YDBG />,
          path: "/qcTwo/workSummaryReportList",
          component: WorkSummaryReportList,
          keepAlive: true,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
        {
          title: "防疫专项检查分析报告",
          icon: <YDBG />,
          path: "/qcTwo/防疫专项检查分析报告",
          component: 防疫专项检查片区汇总,
          keepAlive: true,
          // hide: !appStore.isDev,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
        {
          title: "防疫专项检查汇总报告",
          icon: <YDBG />,
          path: "/qcTwo/防疫专项检查汇总",
          component: 防疫专项检查汇总,
          keepAlive: true,
          // hide: !appStore.isDev,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
      ],
    },
    vague: true,
  });

  const LEFT_MENU_CONFIG: any = [
    {
      title: ['fssdy'].includes(appStore.HOSPITAL_ID)?"交叉检查记录":"二级质控记录",
      path: "/qcTwo",
      icon: <EJZK />,
      component: { ...QualityControlRecord },
      keepAlive: true,
      disabledKeepAlive:
        (appStore.history && appStore.history.action) !== "POP",
    },
    ...extra_menu,
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
});

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
