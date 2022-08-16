import React from 'react'
import { appStore, authStore } from 'src/stores'

export interface navConfigItem {
  onClick?: any;
  name: string;
  path?: string;
  children?: navConfigItem[];
  hidden?: boolean | Function;
  icon?: any;
  menuStyle?: React.CSSProperties;
}
export const navConfig: (appStore:any,authStore?:any) => navConfigItem[] = (appStore,authStore) => ([
  {
    name: "首页",
    path: "/home",
  },
  {
    name: "审核管理",
    path: "/auditsManagement"
  },
  {
    name: "档案管理",
    path: "/nurseFile",
  },
  {
    name: "排班管理",
    path: "/personnelManagement"
  },
  // 厚街版本
  {
    name: "质量管理",
    children: [
      {
        name: "三级质量",
        path: "/qcThree",
        icon: require("../images/menu-icon/三级质控@2x.png")
      },
      {
        name: "二级质量",
        path: "/qcTwo",
        icon: require("../images/menu-icon/二级质控@2x.png")
      },
      {
        name: "一级质量",
        path: "/qcOneHj",
        icon: require("../images/menu-icon/一级质控@2x.png")
      },
      // lcey版本
      {
        name: "护士长手册",
        path: "/nurseHandBookNew",
        icon: require("../images/menu-icon/护理查房@2x.png"),
      },
    ]
  },
  {
    name: "学习培训",
    path: "/continuingEdu",
  },
  {
    name: "不良事件",
    path: "/badEventsNew",
    hidden: !appStore.isDev
  },
  {
    name: "护理制度",
    path: "/nursingRulesNew"
  },
  {
    name: "统计查询",
    path: "/statistic",
    hidden: () => !appStore.isDev,
  },
  {
    name: "我的档案",
    path: "/selfNurseFile",
  },
  
  {
    name: "系统设置",
    path: "/setting",
  },
]);
