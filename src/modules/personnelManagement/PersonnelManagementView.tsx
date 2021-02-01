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
import ExpectedRecord from "./views/arrangeHome/page/expectedRecord/ExpectedRecord";
import ExpectedRecordSelf from "./views/arrangeHome/page/expectedRecordSelf/ExpectedRecordSelf";
import NightHoursStatistics from "./views/arrangeHome/page/nightHoursStatistics/NightHoursStatistics";
import StandardTime from "./views/arrangeHome/page/StandardTime/StandardTime";
import NurseByShiftView from 'src/modules/statistic/views/nurseByShift/NurseByShiftView'
import DepartmentByShiftView from 'src/modules/statistic/views/departmentByShift/DepartmentByShiftView'
//南医三 请假管理
import 请假审核 from "./views/请假审核/请假审核"
import 请假统计 from "./views/请假统计/请假统计"


export interface Props { }

export default function PersonnelManagementView() {
  const leftMenuConfig = [
    {
      title: "排班管理",
      path: "/personnelManagement",

      children: [
        {
          title: appStore.HOSPITAL_ID == "nys" ? '护士排班与轮班' : "护士排班",
          path: "/personnelManagement/arrangeHome",
          component: ArrangeHome,
          style: { background: "#fff" }
        },
        {
          title: "我的期望排班",
          path: "/personnelManagement/expectedRecordSelf",
          component: ExpectedRecordSelf,
          hide: appStore.HOSPITAL_ID != "wh"
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
          title: "结余设置",
          path: "/personnelManagement/balanceInit",
          component: BalanceInit,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        },
        {
          title: "标准工时设置",
          path: "/personnelManagement/standardTime",
          component: StandardTime,
          hide: appStore.HOSPITAL_ID != "wh" || !(authStore.user?.empNo == 'G6051' || authStore.user?.empNo == 'ADMIN')
        },
        {
          title: "加减班列表查询",
          path: "/personnelManagement/addSubClass",
          component: AddSubClass,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        },
        {
          title: "加减班列表查询",
          path: "/personnelManagement/addSubClass",
          component: AddSubClass,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "nys"
        },
        {
          title: "节假日查询",
          path: "/personnelManagement/holidaysList",
          component: HolidaysList,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        },

        {
          title: "休假记录查询",
          path: "/personnelManagement/leaveRecord",
          component: LeaveRecord,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        },
        {
          title: "夜班费统计",
          path: "/personnelManagement/nightChargingReport",
          component: StarRatingReportList,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID == "hj"
        },
        {
          title: "排班统计",
          path: "/personnelManagement/arrangStatistics",
          component: ArrangStatistics,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        },
        {
          title: "期望排班记录查询",
          path: "/personnelManagement/expectedRecord",
          component: ExpectedRecord,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        },
        {
          title: "排班统计属性统计",
          path: "/personnelManagement/nurseByShiftView",
          component: NurseByShiftView,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "nys"
        },
        {
          title: "科室排班统计",
          path: "/personnelManagement/departmentByShiftView",
          component: DepartmentByShiftView,
          hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "nys"
        }
        // {
        //   title: "小时数统计",
        //   path: "/personnelManagement/nightHoursStatistics",
        //   component: NightHoursStatistics,
        //   hide: !authStore.isRoleManage || appStore.HOSPITAL_ID != "wh"
        // }
      ]
    },
    ...appStore.hisMatch({
      map: {
        nys: [
          {
            title: "请假管理",
            path: "/personnelManagement/请假管理",
            hide: !authStore.isRoleManage,
            children: [
              {
                title: "请假审核",
                path: "/personnelManagement/请假管理/请假审核",
                component: 请假审核
              },
              {
                title: "请假统计",
                path: "/personnelManagement/请假统计/请假统计",
                component: 请假统计
              }
            ]
          }
        ],
        other: []
      }
    })
  ];
  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  );
}
const Wrapper = styled.div``;
