import React from "react";
import { authStore } from "src/stores";
import ArrangeHome from "../views/arrangeHome/ArrangeHome";
import DeptBorrowNew from "src/modules/personnelManagement/views/arrangeHome/page/deptBorrow/DeptBorrow";
import NurseSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/NurseSetting/NurseSettingView";
import ShiftSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/ShiftSetting/ShiftSettingView";
import MealSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/MealSetting/MealSettingView";
import PersonnelSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/PersonnelSetting/PersonnelSettingView";

export interface meunConfigItem {
  title?: string;
  component?: any;
  path?: string;
  children?: meunConfigItem[];
  hide?: boolean | Function;
  style?: React.CSSProperties;
}

export const meunConfig: meunConfigItem[] = [
  {
    title: "排班管理",
    path: "/personnelManagement",
    children: [
      {
        title: "护士排班",
        path: "/personnelManagement/arrangeHome",
        component: ArrangeHome,
        style: { background: "#fff" }
      },
      {
        title: "科室借用",
        path: "/personnelManagement/DeptBorrowNew",
        component: DeptBorrowNew,
        hide: !authStore.isRoleManage
      },
      {
        title: "人员分组",
        path: "/personnelManagement/PersonnelSettingViewNew",
        component: PersonnelSettingViewNew,
        hide: !authStore.isRoleManage
      },
      {
        title: "排班人员设置",
        path: "/personnelManagement/NurseSettingViewNew",
        component: NurseSettingViewNew,
        hide: !authStore.isRoleManage
      },
      {
        title: "班次设置",
        path: "/personnelManagement/ShiftSettingViewNew",
        component: ShiftSettingViewNew,
        hide: !authStore.isRoleManage
      },
      {
        title: "排班套餐设置",
        path: "/personnelManagement/MealSettingViewNew",
        component: MealSettingViewNew,
        hide: !authStore.isRoleManage
      }
    ]
  },
];
