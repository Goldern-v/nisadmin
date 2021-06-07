import React from "react";
import { authStore } from "src/stores";
import ArrangeHome from "../views/arrangeHome/ArrangeHome";
import DeptBorrowNew from "src/modules/personnelManagement/views/arrangeHome/page/deptBorrow/DeptBorrow";
import NurseSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/NurseSetting/NurseSettingView";
import ShiftSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/ShiftSetting/ShiftSettingView";
import MealSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/MealSetting/MealSettingView";
import PersonnelSettingViewNew
  from "src/modules/personnelManagement/views/arrangeHome/page/PersonnelSetting/PersonnelSettingView";
import PersonnelSecondment
  from "src/modules/personnelManagement/views/arrangeHome/page/personnelSecondment/PersonnelSecondment";
import AddSubClass from "src/modules/personnelManagement/views/arrangeHome/page/addSubClass/AddSubClass";
import LeaveRecord from "src/modules/personnelManagement/views/arrangeHome/page/leaveRecord/LeaveRecord";
import ArrangStatistics from "src/modules/personnelManagement/views/arrangeHome/page/arrangStatistics/ArrangStatistics";
import ExpectedRecord from "src/modules/personnelManagement/views/arrangeHome/page/expectedRecord/ExpectedRecord";

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
        title: "临时人员借调",
        path: "/personnelManagement/personnelSecondment",
        component: PersonnelSecondment,
        style: { background: "#fff" },
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
      },
      {
        title: "加减班列表查询",
        path: "/personnelManagement/addSubClass",
        component: AddSubClass,
        hide: !authStore.isRoleManage
      },
      {
        title: "休假记录查询",
        path: "/personnelManagement/leaveRecord",
        component: LeaveRecord,
        hide: !authStore.isRoleManage
      },
      {
        title: "排班统计",
        path: "/personnelManagement/arrangStatistics",
        component: ArrangStatistics,
        hide: !authStore.isRoleManage
      },
      {
        title: "期望排班记录查询",
        path: "/personnelManagement/expectedRecord",
        component: ExpectedRecord,
        hide: !authStore.isRoleManage
      }
    ]
  },
];
