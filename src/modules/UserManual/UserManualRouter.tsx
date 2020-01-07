import LeftMenu from "src/components/LeftMenu";
import styled from "styled-components";
import React, { useEffect } from "react";
import { RouteComponentProps } from "src/components/RouterView";
import { KeepAlive } from "react-keep-alive";
export interface Props extends RouteComponentProps<{ name?: string }> {}
import { appStore } from "src/stores";
import Content from "./components/Content";
import { ReactComponent as YJZK } from "./images/YJZK.svg";
import { ReactComponent as SJZK } from "./images/SJZK.svg";
import { ReactComponent as EJZK } from "./images/EJZK.svg";
import { ReactComponent as SHGL } from "./images/SHGL.svg";
import { ReactComponent as WDDA } from "./images/WDDA.svg";
import { ReactComponent as HLZD } from "./images/HLZD.svg";
import { ReactComponent as PBGL } from "./images/PBGL.svg";
import { ReactComponent as DAGL } from "./images/DAGL.svg";
import { ReactComponent as BQDJ } from "./images/BQDJ.svg";
import { ReactComponent as BQGL } from "./images/BQGL.svg";
import { ReactComponent as TZGG } from "./images/TZGG.svg";
import { ReactComponent as SY } from "./images/SY.svg";

const LEFT_MENU_CONFIG: any = [
  {
    title: "首页相关指导",
    icon: <SY />,
    path: "/UserManual/Guidance",
    component: Content,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  },
  {
    title: "审核管理相关指导",
    icon: <SHGL />,
    path: "/UserManual/AuditManagementGuidance",
    component: Content,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  },
  {
    title: "排班管理相关指导",
    icon: <PBGL />,
    path: "/UserManual/WorkforceManagementGuidance",
    component: Content,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  },
  {
    title: "病区登记本相关指导",
    icon: <BQDJ />,
    path: "/UserManual/WardRegisterGuidance",
    component: Content,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  },
  {
    title: "一级质控相关指导",
    icon: <YJZK />,
    path: "/UserManual/QualityOneControlGuidance",
    component: Content,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  },
  {
    title: "二级质控相关指导",
    icon: <EJZK />,
    path: "/UserManual/QualityTwoControlGuidance",
    component: Content,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  },
  {
    title: "三级质控相关指导",
    icon: <SJZK />,
    path: "/UserManual/QualityThreeControlGuidance",
    component: Content,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  },
  {
    title: "通知公告相关指导",
    icon: <TZGG />,
    path: "/UserManual/NoticeAnnouncementGuidance",
    component: Content,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  },
  {
    title: "护理制度相关指导",
    icon: <HLZD />,
    path: "/UserManual/NursingSystemGuidance",
    component: Content,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  },
  {
    title: "档案管理相关指导",
    icon: <DAGL />,
    path: "/UserManual/FileManagementGuidance",
    component: Content,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  },
  {
    title: "我的档案相关指导",
    icon: <WDDA />,
    path: "/UserManual/MyFileGuidance",
    component: Content,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  },
  {
    title: "病区管理相关指导",
    icon: <BQGL />,
    path: "/UserManual/WardManagementGuidance",
    component: Content,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  }
];

export default function UserManualRouter(props: Props) {
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
  .NtvMn svg {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    position: relative;
    top: 6px;
  }
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
