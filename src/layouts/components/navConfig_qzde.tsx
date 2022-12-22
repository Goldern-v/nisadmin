import React from "react";

export interface navConfigItem {
  onClick?: any;
  name: string;
  path?: string;
  children?: navConfigItem[];
  hidden?: boolean | Function;
  icon?: any;
  menuStyle?: React.CSSProperties;
}

export const navConfig = (appStore: any, authStore?: any) => {
  // 龙江
  let navList: navConfigItem[] = [
    {
      name: "首页",
      path: "/home",
      hidden: !appStore.isDev
    },
    {
      name: "审核管理",
      path: "/auditsManagement",
      hidden: !authStore.isRoleManage
    },
    // 厚街
    {
      name: "病区日志",
      path: "/wardLog"
    },
    {
      name: "排班管理",
      path: "/personnelManagement"
    },
    {
      name: "病区登记本",
      path: "/wardRegister"
      // hidden: !appStore.isDev
    },
    // 厚街
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
        {
          name: "查询统计",
          path: "/queryStatistics",
          icon: require("../images/menu-icon/护理查房@2x.png")
        },
        {
          name: "护理查房",
          path: "/checkWard",
          icon: require("../images/menu-icon/护理查房@2x.png")
        }
      ]
    },
    // 厚街
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
      path: "/nurseFile",
      hidden: !authStore.isRoleManage
    },
    {
      name: "我的档案",
      path: "/selfNurseFile"
    },

    {
      name: "统计查询",
      path: "/statistic",
      // hidden: () => !appStore.isDev
    },
    {
      name: "系统设置",
      path: "/setting",
    },
  ];

  return navList
}
