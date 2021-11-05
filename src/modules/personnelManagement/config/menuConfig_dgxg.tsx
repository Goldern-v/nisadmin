import React from "react";
import { authStore } from "src/stores";
import ArrangeHome from "../views/arrangeHome/ArrangeHome";
import NurseSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/NurseSetting/NurseSettingView";
import ShiftSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/ShiftSetting/ShiftSettingView";
import MealSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/MealSetting/MealSettingView";
import PersonnelSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/PersonnelSetting/PersonnelSettingView";
import PersonnelSecondment from "../views/arrangeHome/page/personnelSecondment/PersonnelSecondment";
import AddSubClass from "../views/arrangeHome/page/addSubClass/AddSubClass";
import HolidaysList from "../views/arrangeHome/page/HolidaysList/HolidaysList";
import BalanceInit from "../views/arrangeHome/page/BalanceInit/BalanceInit";
import LeaveRecord from "../views/arrangeHome/page/leaveRecord/LeaveRecord";
import StarRatingReportList from "../views/arrangeHome/page/nightChargingReport/StarRatingReportList";
import ArrangStatistics from "../views/arrangeHome/page/arrangStatistics/ArrangStatistics";
import ExpectedRecord from "../views/arrangeHome/page/expectedRecord/ExpectedRecord";
import ExpectedRecordSelf from "../views/arrangeHome/page/expectedRecordSelf/ExpectedRecordSelf";
import StandardTime from "../views/arrangeHome/page/StandardTime/StandardTime";

export interface meunConfigItem {
  title?: string;
  component?: any;
  path?: string;
  children?: meunConfigItem[];
  hide?: boolean | Function;
  style?: React.CSSProperties;
  iSlimit?: boolean | Function;
  special?: boolean | Function;
}
console.log(!authStore.isRoleManage, 87)

export const meunConfig: meunConfigItem[] = [
  {
    title: "排班管理",
    path: "/personnelManagement",
    children: [
      {
        title: "护士排班",
        path: "/personnelManagement/arrangeHome",
        component: ArrangeHome,
        style: { background: "#fff" },
        iSlimit: false,
      },
      // {
      //   title: "我的期望排班",
      //   path: "/personnelManagement/expectedRecordSelf",
      //   component: ExpectedRecordSelf,
      //   iSlimit: false,
      // },
      {
        title: "临时人员借调",
        path: "/personnelManagement/personnelSecondment",
        component: PersonnelSecondment,
        style: { background: "#fff" },
        iSlimit: true,
      },
      {
        title: "人员分组",
        path: "/personnelManagement/PersonnelSettingViewNew",
        component: PersonnelSettingViewNew,
        // hide: !authStore.isRoleManage
        iSlimit: true,
      },
      {
        title: "排班人员设置",
        path: "/personnelManagement/NurseSettingViewNew",
        component: NurseSettingViewNew,
        // hide: !authStore.isRoleManage
        iSlimit: true,
      },
      {
        title: "班次设置",
        path: "/personnelManagement/ShiftSettingViewNew",
        component: ShiftSettingViewNew,
        // hide: !authStore.isRoleManage
        iSlimit: true,
      },
      {
        title: "排班套餐设置",
        path: "/personnelManagement/MealSettingViewNew",
        component: MealSettingViewNew,
        iSlimit: false,
      },
      {
        title: "结余设置",
        path: "/personnelManagement/balanceInit",
        component: BalanceInit,
        iSlimit: false,
      },
      {
        title: "标准工时设置",
        path: "/personnelManagement/standardTime",
        component: StandardTime,
        // hide: !(authStore.user?.empNo == 'G6051' || authStore.user?.empNo == 'ADMIN')
        iSlimit: true,
        special: true
      },
      {
        title: "加减班列表查询",
        path: "/personnelManagement/addSubClass",
        component: AddSubClass,
        // hide: !authStore.isRoleManage
        iSlimit: true,
      },
      {
        title: "节假日查询",
        path: "/personnelManagement/holidaysList",
        component: HolidaysList,
        // hide: !authStore.isRoleManage
        iSlimit: true,
      },
      {
        title: "休假记录查询",
        path: "/personnelManagement/leaveRecord",
        component: LeaveRecord,
        // hide: !authStore.isRoleManage
        iSlimit: true,
      },
      {
        title: "夜班费统计",
        path: "/personnelManagement/nightChargingReport",
        component: StarRatingReportList,
        // hide: !authStore.isRoleManage
        iSlimit: true,
      },
      {
        title: "排班统计",
        path: "/personnelManagement/arrangStatistics",
        component: ArrangStatistics,
        // hide: !authStore.isRoleManage
        iSlimit: true,
      },
      {
        title: "期望排班记录查询",
        path: "/personnelManagement/expectedRecord",
        component: ExpectedRecord,
        // hide: !authStore.isRoleManage
        iSlimit: true,
      }
    ]
  },
];
