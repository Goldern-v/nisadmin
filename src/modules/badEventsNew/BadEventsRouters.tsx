import LeftMenu from "src/components/LeftMenu";
import styled from "styled-components";
import React, { useEffect } from "react";
import { RouteComponentProps } from "src/components/RouterView";

import { KeepAlive } from "react-keep-alive";

import { appStore} from "src/stores";
import BadEventsNewList from './BadEventsNewList'
import BadEventsNewList_nys from './BadEventsNewList_nys'
import BadEventsNewList_gzsrm from './BadEventsNewList_gzsrm'
import BadEventsNewListCommon from './BadEventsNewListCommon'
import 不良事件发生率 from './views/不良事件发生率'
import 不良事件统计 from './views/不良事件统计'
import badEventStatCommon from './views/badEventStatCommon'
import BadEventReportList from './views/BadEventReportList/BadEventReportList'
import BadEventReportListNew_gzsrm from './views/BadEventReportListNew_gzsrm/BadEventReportList'
import { autoLoginTnNisInfoBe } from "src/utils/toNisInfo/toNisInfo";
import BadEventSummaryQuarterGxjb from "./views/BadEventSummary_gxjb/BadEventSummaryQuarterGxjb";
import BadEventSummaryCaseGxjb from "./views/BadEventSummary_gxjb/BadEventSummaryCaseGxjb";
import BadEventSummaryClassfiyGxjb from "./views/BadEventSummary_gxjb/BadEventSummaryClassfiyGxjb";
import BadEventSummaryTotal from "./views/BadEventSummary_yczyy/index";
import BadEventReportExport_gzsrm from "./views/BadEventReportExport_gzsrm";
import BadEventStatisticalReport from "./views/BadEventStatisticalReport";
export interface Props extends RouteComponentProps<{ name?: string }> { };
const isGzsrmText = 'gzsrm,925,zjhj,qhwy,lcey'

export default function BadEventsRouters(props: Props) {
  useEffect(() => { }, [props.history.location.pathname]);
  const baseRouter = appStore.onlyBadEvent ? '/home' : '/badEventsNew'

  let LEFT_MENU_CONFIG: any[] = [
    ...appStore.hisMatch({
      map: {
        'nys,gzhd': [
          {
            title: " 不良事件查询",
            path: baseRouter,
            component: BadEventsNewList_nys,
            keepAlive: true,
            disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
          },
        ],
        [isGzsrmText]: [
          {
            title: " 不良事件查询",
            // icon: <SJZK />,
            path: baseRouter,
            component: BadEventsNewList_gzsrm,
            keepAlive: true,
            disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
          },
          {
            title: " 不良事件上报",
            path: `${baseRouter}/不良事件上报`,
          }
        ],
        'hj': [  //旧版other其他(迁移过来的)
          {
            title: " 不良事件查询",
            // icon: <SJZK />,
            path: baseRouter,
            component: BadEventsNewList,
            keepAlive: true,
            disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
          },
          {
            title: " 不良事件上报",
            hide: !appStore.isDev,
            path: `${baseRouter}/不良事件上报`,
          }
        ],
        other: [  //新版不良事件fqfybjy,yczyy
          {
            title: " 不良事件查询",
            // icon: <SJZK />,
            path: baseRouter,
            component: BadEventsNewListCommon,
            keepAlive: true,
            disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
          },
          {
            title: " 不良事件上报",
            path: `${baseRouter}/不良事件上报`,
          }
        ],
      },
      vague: true,
    }),

    ...appStore.hisMatch({
      map: {
        [isGzsrmText + ',lcey']: [],
        yczyy: [
          {
            title: '不良事件报告登记总表',
            path: `${baseRouter}/summaryTotal`,
            component: BadEventSummaryTotal
          },
        ],
        'gxjb': [
          {
            title: '不良事件汇总',
            path: `${baseRouter}/summary`,
            children: [
              {
                title: '不良事件分类汇总表',
                path: `${baseRouter}/summary/classify`,
                component: BadEventSummaryClassfiyGxjb
              },
              {
                title: '不良事件例数统计表',
                path: `${baseRouter}/summary/case`,
                component: BadEventSummaryCaseGxjb
              },
              {
                title: '季度上报汇总表',
                path: `${baseRouter}/summary/quarter`,
                component: BadEventSummaryQuarterGxjb
              },
            ]
          }
        ],
        fqfybjy: [
          {
            title: '不良事件统计',
            path: `${baseRouter}/不良事件统计`,
            component: badEventStatCommon,
          },
        ],
        other: [
          {
            title: '不良事件统计',
            path: `${baseRouter}/不良事件统计`,
            component: 不良事件统计,
          },
          {
            title: '不良事件发生率',
            path: `${baseRouter}/不良事件发生率`,
            component: 不良事件发生率,
          },
        ],

      },
      vague: true,
    }),
    ...appStore.hisMatch({
      map: {
        hj: [
          {
            title: '不良事件分析报告',
            path: `${baseRouter}/不良事件分析报告`,
            component: BadEventReportList,
            // hide: appStore.isDev ? false : true,
            keepAlive: true,
            disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
          }
        ],
        fqfybjy: [
          {
            title: '不良事件分析报告',
            path: `${baseRouter}/不良事件统计报告`,
            component: BadEventStatisticalReport,
            // hide: appStore.isDev ? false : true,
            keepAlive: true,
            disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
          }
        ],
        [isGzsrmText]:[
          {
            title: '不良事件分析报告',
            path: `${baseRouter}/不良事件分析报告`,
            component: BadEventReportListNew_gzsrm,
            // hide: appStore.isDev ? false : true,
            keepAlive: true,
            disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
          }
        ],
        other: []
      },
      vague: true
    }),
    ...appStore.hisMatch({
      map: {
        gzsrm: [
          {
            title: '不良事件导出',
            path: `${baseRouter}/BadEventExport`,
            component: BadEventReportExport_gzsrm
          },
        ],
        qhwy: [
          {
            title: '不良事件导出',
            path: `${baseRouter}/BadEventExport`,
            component: BadEventReportExport_gzsrm
          },
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
  let autoLoginInfo: any = {
    blank: true,
    redictUrl: '/crNursing/badEvent',
    loginUrl: '/crNursing/login'
  }
  if (['gxjb','yczyy', 'fqfybjy'].includes(appStore.HOSPITAL_ID)) { //跳转单独的上报系统
    autoLoginInfo = {
      blank: true,
      redictUrl: '/crNursing/badevents/index',
      loginUrl: '/crNursing/badevents/login'
    }
  }
  return (
    <Wrapper>
      <LeftMenuCon>
        <LeftMenu
          config={LEFT_MENU_CONFIG}
          beforeRouter={(payload: any) => {
            if (payload.key === `${baseRouter}/不良事件上报`) {
              autoLoginTnNisInfoBe(autoLoginInfo)
              return false
            } else {
              return true
            }
          }} />
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
