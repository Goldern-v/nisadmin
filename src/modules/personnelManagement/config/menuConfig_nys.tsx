import React from "react";
import { appStore, authStore } from "src/stores";
import ArrangeHome from "../views/arrangeHome/ArrangeHome";
import DeptBorrowNew from "src/modules/personnelManagement/views/arrangeHome/page/deptBorrow/DeptBorrow";
import NurseSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/NurseSetting/NurseSettingView";
import ShiftSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/ShiftSetting/ShiftSettingView";
import MealSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/MealSetting/MealSettingView";
import PersonnelSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/PersonnelSetting/PersonnelSettingView";
import AddSubClass from "../views/arrangeHome/page/addSubClass/AddSubClass";
import StarRatingReportList from "../views/arrangeHome/page/nightChargingReport/StarRatingReportList";
import NurseByShiftView from 'src/modules/statistic/views/nurseByShift/NurseByShiftView'
import DepartmentByShiftView from 'src/modules/statistic/views/departmentByShift/DepartmentByShiftView'
import BalanceInit from "../views/arrangeHome/page/BalanceInitNys/BalanceInit";
import 请假审核 from "../views/请假审核/请假审核"
import 请假统计 from "../views/请假统计/请假统计"


export interface meunConfigItem {
  title?: string;
  component?: any;
  path?: string;
  children?: meunConfigItem[];
  hide?: boolean | Function;
  style?: React.CSSProperties;
  iSlimit?: boolean | Function;
}

export const meunConfig: meunConfigItem[] = [
  {
    title: "排班管理",
    path: "/personnelManagement",
    children: [
      {
        title: '护士排班与轮班',
        path: "/personnelManagement/arrangeHome",
        component: ArrangeHome,
        style: { background: "#fff" }
      },
      {
        title: "科室借用",
        path: "/personnelManagement/DeptBorrowNew",
        component: DeptBorrowNew,
        // hide: !authStore.isRoleManage
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
        // hide: !authStore.isRoleManage
        iSlimit: true,
      },
      {
        title: "积假设置",
        path: "/personnelManagement/balanceInit",
        component: BalanceInit,
      },
      {
        title: "加减班列表查询",
        path: "/personnelManagement/addSubClass",
        component: AddSubClass,
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
        title: "排班统计属性统计",
        path: "/personnelManagement/nurseByShiftView",
        component: NurseByShiftView,
        // hide: !authStore.isRoleManage
        iSlimit: true,
      },
      {
        title: "科室排班统计",
        path: "/personnelManagement/departmentByShiftView",
        component: DepartmentByShiftView,
        // hide: !authStore.isRoleManage
        iSlimit: true,
      }
    ]
  },
  ...appStore.hisMatch({
    map: {
      nys: [
        {
          title: "请假管理",
          path: "/personnelManagement/请假管理",
          // hide: !authStore.isRoleManage,
          iSlimit: true,
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
