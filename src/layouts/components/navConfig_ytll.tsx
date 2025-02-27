import React from "react";
import { navConfigItem } from "src/libs/types";


export const navConfig = (appStore: any, authStore?: any): navConfigItem[] => {

  return [
    {
      name: "首页",
      path: "/home",
    },
    {
      name: "审核管理",
      path: "/auditsManagement",
      hidden: !authStore.isRoleManage
    },
    {
      name: "病区日志",
      path: "/wardLog"
      // hidden: !appStore.isDev
    },
    {
      name: "档案管理",
      path: "/nurseFile",
      hidden: !authStore.isRoleManage
    },
    {
      name: "我的档案",
      path: "/selfNurseFile"
    },
    // {
    //   name: "不良事件",
    //   path: "/badEventsNew",
    //   // hidden: !appStore.isDev,
    // },
    // {
    //   name: '不良事件分析报告',
    //   path: '/badEvents/alanysis/1/1'
    // },
    {
      name: "质量管理",
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
          // path: "/qcOneHj",
          path:'/qcOneDghl',
          icon: require("../images/menu-icon/一级质控@2x.png"),
        },
        {
          name: "质控模板",
          path: "/qcTemplates",
          icon: require("../images/menu-icon/三级质控@2x.png"),
        },
        // {
        //   name: '病区登记本',
        //   path: '',
        //   icon: require('../images/menu-icon/病区登记本@2x.png')
        // },
        {
          name: "查询统计",
          path: "/queryStatistics",
          icon: require("../images/menu-icon/护理查房@2x.png"),
        },
        {
          name: "护理查房",
          path: "/checkWard",
          icon: require("../images/menu-icon/护理查房@2x.png"),
        },
        // {
        //   name: "护士长手册",
        //   path: "/nurseHandBookNew",
        //   icon: require("../images/menu-icon/护理查房@2x.png"),
        // },
      ],
    },
    {
      name: "满意度调查表",
      path: "/nurseSatisfactionSurvey",
    },
    {
      name: "学习培训",
      path: "/continuingEdu",
      // hidden: !appStore.isDev
    },
    {
      name: "敏感指标",
      // path: "/indicator",
     onClick:()=>{
       let [http, host, port] = location.origin.split(':');
       let url = `http://192.168.254.92:9091/bcyNursingQuality/ssoLogin?token=${authStore.authToken}`
       window.open(url)
    }
 },
    {
      name: "病区登记本",
      path: "/wardRegister",
    },
    {
      name: "统计查询",
      path: "/statistic",
    },
    {
      name: "通知公告",
      path: "/notice",
    },
    {
      name: "病区管理",
      path: "/wardManagement"
    },
    {
      name: "护理制度",
      path: "/nursingRulesNew",
    },
    {
      name: "系统设置",
      path: "/setting",
    },
    {
      name: "护理排班",
      path: "/personnelManagement",
    },
  ];
}