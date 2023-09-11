import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import React, { useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import { KeepAlive } from 'react-keep-alive'
import { appStore, authStore } from 'src/stores'

import AdministrativeWard from './views/administrativeWard'
import Analysis from './views/analysis/Analysis'
import RecordView from './views/checkWard/view/record/RecordView'
import CheckWardReportList from './views/checkWard/view/reportList/CheckWardReportList'
import ScheduleView from './views/checkWard/view/schedule/ScheduleView'
import committeeWorkReport from './views/committeeWorkReport'
import ProblemSummary from './views/problemSummary/ProblemSummary'
import qcNursingAnalysis from './views/qcNursingAnalysis'
import qcThreeProblem from './views/qcThreeProblem/index'
import qcThreeResult from './views/qcThreeResult/index'
import QualityControlRecord from './views/qualityControlRecord/QualityControlRecord'
import QueryStatistics from './views/queryStatistics/QueryStatistics'
import SatisfactionAnalysis from './views/satisfactionAnalysis'
import SummaryReport from './views/summaryReport/SummaryReport'
// import WorkSummaryReportList from './views/workSummaryReportList/WorkSummaryReportList'
import WritingForm from './views/writingForm/WritingForm'
import { ReactComponent as CFJL } from './images/icon/CFJL.svg'
import { ReactComponent as CFJHB } from './images/icon/CFJHB.svg'
import { ReactComponent as CFJHBG } from './images/icon/CFJHBG.svg'
import { ReactComponent as JCTJ } from './images/icon/JCTJ.svg'
import { ReactComponent as WJSX } from './images/icon/WJSX.svg'
import { qcThreeTitle } from './data/qcTitle'
import { ReactComponent as SJZK } from './images/icon/SJZK.svg'
import { ReactComponent as YDBG } from './images/icon/YDBG.svg'
import { ReactComponent as HZBG } from './images/icon/HZBG.svg'
import { ReactComponent as WTBG } from './images/icon/WTBG.svg'

import 护理质量检查小结 from "./views/qcFormHj/护理质量检查小结";
// import 护理质量巡查情况汇总表 from './views/qcFormHj/护理质量巡查情况汇总表'

// import 护理质量统计查询 from './views/qcFormNys/护理质量统计查询'
import 护理质量检查小结Nys from "./views/qcFormNys/护理质量检查小结";
import 护理质量检查小结Gzsrm from "./views/qcFormGzsrm/护理质量检查小结";
import 护理质量巡查情况汇总表Nys from "./views/qcFormNys/护理质量巡查情况汇总表";

// import 一级质控问题原因措施汇总 from './views/qcFormGzsrm/一级质控问题原因措施汇总'
// import 二级质控问题原因措施汇总 from './views/qcFormGzsrm/二级质控问题原因措施汇总'
import 三级质控问题原因措施汇总 from "./views/qcFormGzsrm/三级质控问题原因措施汇总";
import 福清三级质控问题原因措施汇总 from "./views/qcFormFqfybjy/三级质控问题原因措施汇总";

import 质控表单汇总 from "./views/qcDghl/质控表单汇总";
import 三级质控护理质量统计汇总 from "./views/qcFormGzsrm/三级质控护理质量统计汇总";
import qcThreeMQSummary from './views/qcThreeMQSummary/index'
import { CONFIG_TITLE } from './utils/enums'
import qcQSummary from './views/qcQSummary'
import CheckSummary from './views/qcZzwy/qcCheckSummary/CheckSummary'
import IssueAnalysis from './views/qcZzwy/issueAnalysis/IssueAnalysis'
import RectificationSummary from './views/qcZzwy/qcRectificationSummary/RectificationSummary'
import QcMonthCheckReportList from './views/qcZzwy/qcMonthCheckReport/QcMonthCheckReportList'
import QuarterlyAnalysisReportZzwy from './views/qcZzwy/qcQuarterlyAnalysisReport/Index'
import QqualityMWSummary from './views/qcZzwy/qqualityMWSummary/tableList'
import JmFyAnalysis from "src/modules/quality/views/analysis/JmFyAnalysis"; // 季度质量管理工作总结 Quarterly quality management work summary

export interface Props extends RouteComponentProps<{ name?: string }> {}
export default function QcThreeRouter(props: Props) {
  useEffect(() => {}, [props.history.location.pathname]);

  const route_护理质量巡查情况汇总表_nys = {
    title: "护理质量巡查情况汇总表",
    icon: <YDBG />,
    path: "/qcThree/护理质量巡查情况汇总表?qcLevel=3",
    component: 护理质量巡查情况汇总表Nys,
    keepAlive: true,
    // hide: !appStore.isDev,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
  };

  const route_护理质量检查小结 = {
    title: "护理质量检查小结",
    icon: <YDBG />,
    path: "/qcThree/护理质量检查小结?qcLevel=3",
    component: appStore.hisMatch({
      map: {
        nys: 护理质量检查小结Nys,
        gzsrm:护理质量检查小结Gzsrm,
        other: 护理质量检查小结,
      },
    }),
    keepAlive: true,
    // hide: !appStore.isDev,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
  };

  const route_检查表单统计表 = {
    title: "检查表单统计表",
    path: "/qcThree/queryStatistics",
    icon: <JCTJ />,
    component: QueryStatistics,
  };

  const route_三级质控问题汇总 = {
    title: appStore.hisMatch({
      map: {
        fqfybjy: CONFIG_TITLE[3] + '问题汇总',
        fssdy: '专项检查问题汇总',
        other: '三级质控问题汇总'
      }
    }),
    icon: <WTBG />,
    path: "/qcThree/problemSummary",
    component: ProblemSummary,
  };

  const route_三级质控问题原因措施汇总 = {
    title: "三级质控问题原因措施汇总",
    path: "/qcThree/三级质控问题原因措施汇总?qcLevel=3",
    icon: <JCTJ />,
    component: 三级质控问题原因措施汇总,
  };
  const route_福清三级质控问题原因措施汇总 = {
    title: CONFIG_TITLE[3] + "原因措施汇总",
    path: "/qcThree/三级质控问题原因措施汇总?qcLevel=3",
    icon: <JCTJ />,
    component: 福清三级质控问题原因措施汇总,
  };
  const route_三级质控月度报告 = {
    title: appStore.hisMatch({
      map: {
        fqfybjy: CONFIG_TITLE[3] + '月度报告',
        fssdy: '专项检查月度报告',
        other: '三级质控月度报告'
      }
    }),
    icon: <YDBG />,
    path: "/qcThree/analysis",
    component: Analysis,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
  };
  const route_JMFY_三级质控月度报告 = {
    title: appStore.hisMatch({
      map: {
        fqfybjy: CONFIG_TITLE[3] + '月度报告',
        fssdy: '专项检查月度报告',
        other: '三级质控月度报告'
      }
    }),
    icon: <YDBG />,
    path: "/qcThree/JmFyAnalysis",
    component: JmFyAnalysis,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
  };
  const route_三级质控汇总报告 = {
    title: appStore.hisMatch({
      map: {
        fqfybjy: CONFIG_TITLE[3] + '汇总报告',
        fssdy: '专项检查汇总报告',
        other: '三级质控汇总报告'
      }
    }),
    icon: <HZBG />,
    path: "/qcThree/summaryReport",
    component: SummaryReport,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
  };

  const route_质控表单汇总 = {
    title: "单个质控表单汇总",
    icon: <HZBG />,
    path: "/qcThree/质控表单汇总",
    component: 质控表单汇总,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
  };

  const route_三级质控护理质量统计汇总 = {
    title: "护理质量统计汇总",
    icon: <JCTJ />,
    path: "/qcThree/护理质量统计汇总",
    component: 三级质控护理质量统计汇总,
    // keepAlive: true,
  };
  // 行政查房
  const route_administrativeWard = {
    title: "行政查房",
    path: "/qcThree/administrativeWard",
    icon: <JCTJ />,
    component: AdministrativeWard,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP',
  };

  const route_satisfactionAnalysis = {
    title: "满意度调查分析",
    icon: <JCTJ />,
    path: "/qcThree/satisfactionAnalysis",
    component: SatisfactionAnalysis,
  };
  // 护理分析
  const route_qcNursingAnalysis = {
    title: "三级护理分析",
    icon: <JCTJ />,
    path: "/qcThree/qcNursingAnalysis",
    component: qcNursingAnalysis,
  };
  const route_qcThreeResult = {
    title: "三级质控结果汇总表",
    icon: <JCTJ/>,
    path: "/qcThree/qcThreeResult",
    component: qcThreeResult,
    hide: !authStore.level3publishedWatch,
  }
  const route_qcThreeProblem = {
    title: "三级质控问题分析改进",
    icon: <JCTJ/>,
    path: "/qcThree/qcThreeProblem",
    component: qcThreeProblem,
    hide: !authStore.level3publishedWatch,
  }
  const route_committeeWorkReport = {
    title: "委员会小组工作报告",
    icon: <JCTJ/>,
    path: "/qcThree/committeeWorkReport",
    component: committeeWorkReport,
    hide: !authStore.level3publishedWatch,
  }
  const route_质控_ZZWY = [
    {
      title: "护理部质量检查汇总表",
      icon: <HZBG />,
      path: "/qcThree/护理部质量检查汇总表?qcLevel=3",
      component: CheckSummary,
      
    },
    
  {
    title: "质控表项目问题分析汇总",
    icon: <JCTJ />,
    path: "/qcThree/质控表项目问题分析汇总?qcLevel=3",
    component: IssueAnalysis
  },
    {
      title: "质控检查反馈整改单",
      icon: <HZBG />,
      path: "/qcThree/质控检查反馈整改单?qcLevel=3",
      component: RectificationSummary,
    },
    {
      title: "月度质控检查总结报告",
      icon: <JCTJ />,
      path: "/qcThree/月度质控检查总结报告?qcLevel=3",
      component: QcMonthCheckReportList,
    },

    {title: "季度质量分析报告",
      icon: <HZBG />,
      path: "/qcThree/季度质量分析报告?qcLevel=3",
      component: QuarterlyAnalysisReportZzwy,
    },
    {
      title: "季度质量管理工作总结",
      icon: <HZBG />,
      path: "/qcThree/季度质量管理工作总结?qcLevel=3",
      component: QqualityMWSummary,
    },
]

  let extra_menu: any = appStore.hisMatch({
    map: {
      gzsrm: [
        route_护理质量巡查情况汇总表_nys,
        route_护理质量检查小结,
        route_检查表单统计表,
        // route_一级质控问题原因措施汇总,
        // route_二级质控问题原因措施汇总,
        route_三级质控护理质量统计汇总,
        route_三级质控问题原因措施汇总,
        route_administrativeWard,
        route_satisfactionAnalysis,
        route_qcNursingAnalysis,
      ],
      nys: [route_护理质量巡查情况汇总表_nys, route_护理质量检查小结],
      yczyy: [
        route_护理质量巡查情况汇总表_nys,
        route_护理质量检查小结,
        route_三级质控问题汇总,
        route_检查表单统计表,
      ],
      'wh,gdsfy': [
        route_三级质控月度报告,
        route_三级质控汇总报告,
        route_三级质控问题汇总,
        route_检查表单统计表,
        {
          title: "文件书写统计表",
          path: "/qcThree/writingForm",
          icon: <WJSX />,
          component: WritingForm,
        },
        {
          title: "特殊时段查房记录",
          path: "/qcThree/checkWard",
          icon: <CFJL />,
          component: RecordView,
          keepAlive: true,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
        {
          title: "特殊时段计划表",
          path: "/qcThree/schedule",
          icon: <CFJHB />,
          component: ScheduleView,
        },
        {
          title: "特殊时段查房统计报告",
          path: "/qcThree/checkWardReportList",
          icon: <CFJHBG />,
          component: CheckWardReportList,
          keepAlive: true,
          disabledKeepAlive:
            (appStore.history && appStore.history.action) !== "POP",
        },
      ],
      dghl: [
        route_护理质量巡查情况汇总表_nys,
        route_护理质量检查小结,
        route_检查表单统计表,
        route_质控表单汇总,
      ],
      fqfybjy: [
        route_护理质量巡查情况汇总表_nys,
        route_护理质量检查小结,
        route_三级质控月度报告,
        route_三级质控汇总报告,
        route_三级质控问题汇总,
        route_检查表单统计表,
        route_福清三级质控问题原因措施汇总,
        {
          title: CONFIG_TITLE[3] + "月季度汇总报告",
          icon: <HZBG />,
          path: "/qcThree/qcThreeMQSummary?level=3.4",
          component: qcThreeMQSummary,
          hide: !authStore.level3publishedWatch,
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
        },
        {
          title: CONFIG_TITLE[3] + "季度汇总报告",
          icon: <HZBG />,
          path: "/qcThree/qcQSummary?level=3.6",
          component: qcQSummary,
          hide: !authStore.level3publishedWatch,
          keepAlive: true,
          disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
        },
      ],
      "whyx,whhk": [
        // route_三级质控月度报告,
        // route_三级质控汇总报告,
        // route_三级质控问题汇总,
        route_committeeWorkReport,
        route_qcThreeResult,
        route_qcThreeProblem,
      ],
      dgxg: [
        route_护理质量巡查情况汇总表_nys,
        route_护理质量检查小结,
        route_三级质控月度报告,
        route_三级质控汇总报告,
        // route_三级质控问题汇总,
        route_检查表单统计表,
      ],
      jmfy:[
        route_护理质量巡查情况汇总表_nys,
        route_护理质量检查小结,
        route_JMFY_三级质控月度报告,
        route_三级质控汇总报告,
        route_三级质控问题汇总,
        route_检查表单统计表,
      ],
      zzwy: [
        route_护理质量巡查情况汇总表_nys,
        route_护理质量检查小结,
        route_三级质控月度报告,
        route_三级质控汇总报告,
        route_三级质控问题汇总,
        route_检查表单统计表,
        ...route_质控_ZZWY,
      ],
      other: [
        route_护理质量巡查情况汇总表_nys,
        route_护理质量检查小结,
        route_三级质控月度报告,
        route_三级质控汇总报告,
        route_三级质控问题汇总,
        route_检查表单统计表,
      ],
    },
    vague: true,
  });

  const LEFT_MENU_CONFIG: any = [
    {
      title: qcThreeTitle.leftNavTitle,
      icon: <SJZK />,
      path: "/qcThree",
      component: { ...QualityControlRecord },
      keepAlive: true,
      disabledKeepAlive:
        (appStore.history && appStore.history.action) !== "POP",
    },
    ...extra_menu,
  ];
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
