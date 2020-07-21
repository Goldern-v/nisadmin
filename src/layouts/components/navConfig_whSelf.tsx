import React from "react";
import { appStore, authStore } from "src/stores";

export interface navConfigItem {
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
    path: "/home",
    hidden: () => (authStore?.user?.empNo || '').toUpperCase() == 'Y0001',
  },
  {
    name: "排班管理",
    path: "/personnelManagement",
    hidden: () => (authStore?.user?.empNo || '').toUpperCase() == 'Y0001',
  },
  {
    name: "病区登记本",
    path: "/wardRegister"
    // hidden: !appStore.isDev
  },
  {
    name: "一级质控",
    path: "/qcOne/nursingWorkPlainList",
    hidden: () => (authStore?.user?.empNo || '').toUpperCase() == 'Y0001',
  },
  {
    name: "学习培训",
    path: "/continuingEdu",
    hidden: () => (authStore?.user?.empNo || '').toUpperCase() == 'Y0001',
  },
  // {
  //   name: "不良事件",
  //   path: "/wardRegister",
  //   hidden: !appStore.isDev
  // },

  // {
  //   name: "一级质控",
  //   path: "/qcOne/nursingWorkPlainList"
  //   // hidden: !appStore.isDev
  // },
  // {
  //   name: '质量管理',
  //   children: [
  //     {
  //       name: '一级质控',
  //       path: '/qcOne/nursingWorkPlainList',
  //       icon: require('../images/menu-icon/一级质控@2x.png'),
  //       hidden: !appStore.isDev
  //     }
  //   ]
  // },
  {
    name: "通知公告",
    path: "/notice",
    hidden: () => (authStore?.user?.empNo || '').toUpperCase() == 'Y0001',
  },
  {
    name: "护理制度",
    path: "/nursingRulesNew",
    hidden: () => (authStore?.user?.empNo || '').toUpperCase() == 'Y0001',
  },
  {
    name: "我的档案",
    path: "/selfNurseFile",
    hidden: () => (authStore?.user?.empNo || '').toUpperCase() == 'Y0001',
  },
  {
    name: "病区管理",
    path: "/wardManagement",
    hidden: () => (authStore?.user?.empNo || '').toUpperCase() == 'Y0001',
  },
  {
    name: "进出感染区统计",
    path: "/InfectedAreasCount",
    hidden: () => {
      if ((authStore?.user?.empNo || '').toUpperCase() == 'Y0001') return true
      if (appStore.isDev) return false;

      if (
        authStore.user &&
        authStore.user.empNo &&
        authStore.user.empNo.toLowerCase() == "xxk001"
      )
        return false;

      return true;
    }
  }
];
