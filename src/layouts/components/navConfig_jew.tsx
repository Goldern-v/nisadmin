// 九二五医院
import React from "react";
import { appStore, authStore } from "src/stores";
import JewDutyRecord from "src/modules/quality/views/jewDutyRecord";
// import { authStore } from 'src/stores';

export interface navConfigItem {
  onClick?: any;
  name: string;
  path?: string;
  children?: navConfigItem[];
  hidden?: boolean | Function;
  icon?: any;
  menuStyle?: React.CSSProperties;
}
const is925 = ["925", 'zjhj'].includes(appStore.HOSPITAL_ID)
const baseConfig: navConfigItem[] = [
  {
    name: "首页",
    path: "/home",
  },
  {
    name: "护理排班",
    path: "/personnelManagement",
  },
  {
    name: "不良事件",
    path: "/badEventsNew",
    hidden: !is925
    // hidden: !appStore.isDev,
  },
  {
    name: "质量管理",
    // hidden:authStore.isOnlyInternsManage,
    children: [
      {
        name: "三级质量",
        path: "/qcThree",
        icon: require("../images/menu-icon/三级质控@2x.png"),
      },
      {
        name: "二级质量",
        path: "/qcTwo",
        icon: require("../images/menu-icon/二级质控@2x.png"),
      },
      {
        name: "一级质量",
        path: "/qcOneGzsrm",
        icon: require("../images/menu-icon/一级质控@2x.png"),
      },
      // {
      //   name: '病区登记本',
      //   path: '',
      //   icon: require('../images/menu-icon/病区登记本@2x.png')
      // },
      {
        name: "质控模板",
        path: "/qcTemplates",
        icon: require("../images/menu-icon/三级质控@2x.png"),
        hidden:appStore.HOSPITAL_ID !=='925'
      },
      // {
      //   name: "查询统计",
      //   path: "/queryStatistics",
      //   icon: require("../images/menu-icon/护理查房@2x.png"),
      // },
      // {
      //   name: "护理查房",
      //   path: "/checkWard",
      //   icon: require("../images/menu-icon/护理查房@2x.png"),
      // },
      // {
      //   name: "护理质量指标",
      //   path: "/goodOrBadRouter",
      //   icon: require("../images/menu-icon/病区登记本@2x.png")
      // },
      // {
      //   name: "专科护理质量指标",
      //   path: "/specialNurseRouter",//path如果有改动，./NavBar也要改动
      //   icon: require("../images/menu-icon/病区登记本@2x.png"),
      //   hidden:!authStore.isSpecialMenu,
      // },
      // {
      //   name: "护士长手册",
      //   path: "/nurseHandBookNew",
      //   icon: require("../images/menu-icon/护理查房@2x.png"),
      //   hidden:appStore.HOSPITAL_ID !=='925'
      // },
      {
        name: '夜查房排班表',
        icon: require("../images/menu-icon/护理查房@2x.png"),
        path: '/checkWard/JewDutyRecord',
      },
      {
        name: '质量检查汇总',
        icon: require("../images/menu-icon/护理查房@2x.png"),
        path: '/qualitySummary/Summary',
      },
    ],
  },
  {
    name: "护士长手册",
    path: "/nurseHandBookNew",
  },
  {
    name: "学习培训",
    path: "/continuingEdu",
    // hidden: !appStore.isDev
  },
  {
    name: "统计查询",
    path: "/statistic",
  },
  {
    name: "档案管理",
    path: "/nurseFile",
    // hidden: !authStore.isRoleManage
  },
  {
    name: "我的档案",
    path: "/selfNurseFile",
    hidden: !is925
  },
  {
    name: "病区日志",
    path: "/wardLog",
    // hidden: !appStore.isDev
  },
  {
    name: "审核管理",
    path: "/auditsManagement",
    // hidden: !authStore.isRoleManage
  },
  {
    name: "护理制度",
    path: "/nursingRulesNew",
  },
  
  {
    name: "通知公告",
    path: "/notice",
  },
  // 不良事件功能暂时屏蔽
  
  
  
  {
    name: "病区登记本",
    path: "/wardRegister",
  },
  {
    name: "系统设置",
    path: "/setting",
  },
  {
    name:"敏感指标",
    onClick:()=>{
      let token = sessionStorage.getItem("authToken") || ""
      window.open(`http://192.168.1.37:9093/bcyNursingQuality/ssoLogin?token=${token}`)
    }
  }
];

const beConfig: navConfigItem[] = [];

export const navConfig: navConfigItem[] = appStore.onlyBadEvent
  ? beConfig
  : baseConfig;
