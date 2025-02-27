import React from "react";
import { appStore, authStore } from "src/stores";

export interface navConfigItem {
  onClick?: any;
  name: string;
  path?: string;
  children?: navConfigItem[];
  hidden?: boolean | Function;
  icon?: any;
  menuStyle?: React.CSSProperties;
}

export const navConfig: navConfigItem[] = [
  {
    name: "首页",
    path: "/home"
  },
  {
    name: "学习培训",
    path: "/continuingEdu",
    // hidden: !appStore.isDev
  },
  {
    name: "敏感指标",
    path: "/indicator"
  },
  {
    name: "排班管理",
    path: "/personnelManagement"
  },
  {
    name: "一级质控",
    path: "/qcOne/nursingWorkPlainList"
  },
  {
    name: "二级质控",
    path: "/qcTwo"
  },
  {
    name: "三级质控",
    path: "/qcThree"
  },
  {
    name: "通知公告",
    path: "/notice"
  },
  {
    name: "护理制度",
    path: "/nursingRulesNew"
  },
  {
    name: "护士长手册",
    path: "/nurseHandBookNew",
    // hidden: !authStore.isNotANormalNurse
  },
  {
    name: "护士长满意度调查表",
    path: "/nurseSatisfactionSurvey",
  },
  {
    name: "不良事件",
    // hidden: !appStore.isDev,
    path: "/badEventsNew"
  },
  {
    name: "病区日志",
    path: "/wardLog"
    // hidden: !appStore.isDev
  },
  {
    name: "系统设置",
    path: "/setting"
  },
  {
    name: "档案管理",
    path: "/nurseFile"
  },
  {
    name: "我的档案",
    path: "/selfNurseFile"
  },
  {
    name: "统计查询",
    path: "/statistic"
  },
];
