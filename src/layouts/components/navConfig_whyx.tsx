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
// 武汉亚心
export const navConfig: (appStore: any, authStore: any) => navConfigItem[] = (
  appStore,
  authStore
) => {
  let navList: navConfigItem[] = [
    {
      name: "首页",
      path: "/home",
    },
    {
      name: "审核管理",
      path: "/auditsManagement",
    },
    {
      name: "档案管理",
      path: "/nurseFile",
      hidden: !authStore.isNotANormalNurse,
    },
    {
      name: "学习培训",
      path: "/continuingEdu",
      // hidden: !appStore.isDev
    },
    {
      name: "病区日志",
      path: "/wardLog",
      // hidden: !appStore.isDev
    },
    {
      name: "病区登记本",
      path: "/wardRegister",
      // hidden: !appStore.isDev,
    },
    // {
    //   name: '不良事件分析报告',
    //   path: '/badEvents/alanysis/1/1'
    // },
    {
      name: "质量管理",
      children: [
        {
          name: "三级质控",
          path: "/qcThree",
          icon: require("../images/menu-icon/三级质控@2x.png"),
        },
        {
          name: "二级质控",
          path: "/qcTwo",
          icon: require("../images/menu-icon/二级质控@2x.png"),
        },
        {
          name: "一级质控",
          path: "/qcOneWhyx",
          icon: require("../images/menu-icon/一级质控@2x.png"),
        },
        {
          name: "护理部职能督导",
          path: "/qcFun",
          icon: require("../images/menu-icon/functional.png"),
        },
        {
          name: "质控模板",
          path: "/qcTemplates",
          icon: require("../images/menu-icon/三级质控@2x.png")
        },
        //     {
        //       name: '病区登记本',
        //       path: '',
        //       icon: require('../images/menu-icon/病区登记本@2x.png')
        //     },
        //     {
        //       name: "查询统计",
        //       path: "/queryStatistics",
        //       icon: require("../images/menu-icon/护理查房@2x.png")
        //     },
        //     {
        //       name: "护理查房",
        //       path: "/checkWard",
        //       icon: require("../images/menu-icon/护理查房@2x.png")
        //     }
      ],
    },
    {
      name: "敏感指标",
      path: "/indicator",
    },
    // {
    //   name: "敏感指标登记本",
    //   path: "/sensitiveRegister",
    //   // hidden: !appStore.isDev
    // },
    {
      name: "统计查询",
      path: "/statistic",
    },
    {
      name: "排班管理",
      path: "/personnelManagement",
    },
    // {
    //   name: "健康宣教",
    //   path: "/setting/typeDict",
    //   children: [
    //     {
    //       name: "健康宣教",
    //       path: "/setting/typeDict",
    //       icon: require("../images/menu-icon/三级质控@2x.png")
    //     }
    //   ]
    // },
    {
      name: "护理制度",
      path: "/nursingRulesNew",
    },
    {
      name: "我的档案",
      path: "/selfNurseFile",
    },
    {
      name: "通知公告",
      path: "/notice",
    },
    {
      name: "系统设置",
      path: "/setting",
      children: [
        {
          name: "健康宣教",
          path: "/setting/typeDict",
          icon: require("../images/menu-icon/三级质控@2x.png"),
        },
      ],
    },
  ];
  return navList;
};
