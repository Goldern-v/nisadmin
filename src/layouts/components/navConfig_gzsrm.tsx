import React from "react";
import { appStore } from "src/stores";

export interface navConfigItem {
  onClick?: any;
  name: string;
  path?: string;
  children?: navConfigItem[];
  hidden?: boolean | Function;
  icon?: any;
  menuStyle?: React.CSSProperties;
}

const baseConfig: navConfigItem[] = [
  {
    name: "首页",
    path: "/home"
  },
  {
    name: "社区查房",
    path: "/communityRoundsRouter"
  },
  {
    name: "审核管理",
    path: "/auditsManagement"
  },
  {
    name: "排班管理",
    path: "/personnelManagement"
  },
  {
    name: "病区登记本",
    path: "/wardRegister"
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
    name: "学习培训",
    path: "/continuingEdu"
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
    name: "档案管理",
    path: "/nurseFile"
  },
  {
    name: "我的档案",
    path: "/selfNurseFile"
  },
  {
    name: "病区管理",
    path: "/wardManagement"
  },
];

const beConfig: navConfigItem[] = []

export const navConfig: navConfigItem[] = appStore.onlyBadEvent ? beConfig : baseConfig
