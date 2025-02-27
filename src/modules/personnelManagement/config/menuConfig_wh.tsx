import React from "react";
import {appStore, authStore} from "src/stores";
import ArrangeHome from "../views/arrangeHome/ArrangeHome";
import NurseSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/NurseSetting/NurseSettingView";
import ShiftSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/ShiftSetting/ShiftSettingView";
import ShiftSettingViewNewZJHJ from "src/modules/personnelManagement/views/arrangeHome/page/ShiftSetting-zjhj/ShiftSettingView";
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
  hidder?: boolean | Function;
  style?: React.CSSProperties;
  iSlimit?: boolean | Function;
  special?: boolean | Function;
  onlyNursingDepartment?: boolean // 仅仅护理部
  onlyNursingaduit?: boolean // 仅仅护理部
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
        style: { background: "#fff" },
        iSlimit: false,
        hidder: false,
      },
      {
        title: "我的期望排班",
        path: "/personnelManagement/expectedRecordSelf",
        component: ExpectedRecordSelf,
        iSlimit: false,
        hidder: false,
      },
      {
        title: "临时人员借调",
        path: "/personnelManagement/personnelSecondment",
        component: PersonnelSecondment,
        style: { background: "#fff" },
        hidder: false,
        iSlimit: true,
      },
      {
        title: "人员分组",
        path: "/personnelManagement/PersonnelSettingViewNew",
        component: PersonnelSettingViewNew,
        hidder: false,
        iSlimit: true,
      },
      {
        title: "排班人员设置",
        path: "/personnelManagement/NurseSettingViewNew",
        component: NurseSettingViewNew,
        hidder: false,
        iSlimit: true,
      },
      {
        title: "班次设置",
        path: "/personnelManagement/ShiftSettingViewNew",
        component: ShiftSettingViewNew,
        iSlimit: true,
        hidder: appStore.HOSPITAL_ID == 'zjhj'
      },
      {
        title: "班次设置",
        path: "/personnelManagement/ShiftSettingViewNewZJHJ",
        component: ShiftSettingViewNewZJHJ,
        onlyNursingDepartment: true,
        hidder: appStore.HOSPITAL_ID != 'zjhj'
      },
      {
        title: "排班套餐设置",
        path: "/personnelManagement/MealSettingViewNew",
        component: MealSettingViewNew,
        iSlimit: false,
        hidder: false,
      },
      {
        title: "结余设置",
        path: "/personnelManagement/balanceInit",
        component: BalanceInit,
        iSlimit: false,
        hidder: false,
      },
      {
        title: "标准工时设置",
        path: "/personnelManagement/standardTime",
        component: StandardTime,
        hidder: false,
        iSlimit: true,
        special: appStore.HOSPITAL_ID !=='925' && appStore.HOSPITAL_ID !=='zjhj',
      },
      {
        title: "加减班列表查询",
        path: "/personnelManagement/addSubClass",
        component: AddSubClass,
        hidder: false,
        iSlimit: true,
      },
      {
        title: "节假日查询",
        path: "/personnelManagement/holidaysList",
        component: HolidaysList,
        hidder: false,
        iSlimit: true,
      },
      {
        title: "休假记录查询",
        path: "/personnelManagement/leaveRecord",
        component: LeaveRecord,
        hidder: false,
        iSlimit: true,
      },
      {
        title: "夜班费统计",
        path: "/personnelManagement/nightChargingReport",
        component: StarRatingReportList,
        hidder: false,
        iSlimit: true,
      },
      {
        title: "排班统计",
        path: "/personnelManagement/arrangStatistics",
        component: ArrangStatistics,
        hidder: false,
        iSlimit: true,
      },
      {
        title: "期望排班记录查询",
        path: "/personnelManagement/expectedRecord",
        component: ExpectedRecord,
        hidder: false,
        iSlimit: true,
      },
      {
        title: "排班审核",
        path: "/personnelManagement/schedulingAudit",
        component: ShiftSettingViewNewZJHJ,
        hidder: appStore.HOSPITAL_ID != 'zjhj',
        onlyNursingaduit: true,
      }
    ]
  },
];
