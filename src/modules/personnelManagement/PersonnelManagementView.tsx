import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import LeftMenuPage from "src/components/LeftMenuPage";
import ArrangeHome from "./views/arrangeHome/ArrangeHome";
import DeptBorrowNew from "src/modules/personnelManagement/views/arrangeHome/page/deptBorrow/DeptBorrow";
import NurseSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/NurseSetting/NurseSettingView";
import ShiftSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/ShiftSetting/ShiftSettingView";
import MealSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/MealSetting/MealSettingView";
import PersonnelSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/PersonnelSetting/PersonnelSettingView";
import { appStore, authStore } from "src/stores";
import PersonnelSecondment from "./views/arrangeHome/page/personnelSecondment/PersonnelSecondment";
import AddSubClass from "./views/arrangeHome/page/addSubClass/AddSubClass";
import HolidaysList from "./views/arrangeHome/page/HolidaysList/HolidaysList";
import BalanceInit from "./views/arrangeHome/page/BalanceInit/BalanceInit";
import LeaveRecord from "./views/arrangeHome/page/leaveRecord/LeaveRecord";
import StarRatingReportList from "./views/arrangeHome/page/nightChargingReport/StarRatingReportList";
import ArrangStatistics from "./views/arrangeHome/page/arrangStatistics/ArrangStatistics";
export interface Props {}

export default function PersonnelManagementView() {
  const leftMenuConfig = [
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
        appStore.HOSPITAL_ID == "wh"
          ? {
              title: "临时人员借调",
              path: "/personnelManagement/personnelSecondment",
              component: PersonnelSecondment,
              style: { background: "#fff" },
              hide: !authStore.isRoleManage
            }
          : {
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
        },
        {
          title: "加减班列表查询",
          path: "/personnelManagement/addSubClass",
          component: AddSubClass,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        },
        {
          title: "节假日查询",
          path: "/personnelManagement/holidaysList",
          component: HolidaysList,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        },
        {
          title: "结余设置",
          path: "/personnelManagement/balanceInit",
          component: BalanceInit,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        },
        {
          title: "休假记录查询",
          path: "/personnelManagement/leaveRecord",
          component: LeaveRecord,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        },
        {
          title: "夜计费",
          path: "/personnelManagement/nightChargingReport",
          component: StarRatingReportList,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        },
        {
          title: "排班统计",
          path: "/personnelManagement/arrangStatistics",
          component: ArrangStatistics,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        }
      ]
    }
  ];
  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  );
}
const Wrapper = styled.div``;
