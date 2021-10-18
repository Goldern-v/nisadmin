// 权限问题 - 新建为了解决账号切换的时候 要刷新浏览器才能隐藏对应模块
import React from "react";
import { authStore } from "src/stores";
import ArrangeHome from "../views/arrangeHome/ArrangeHome";
import MealSettingViewNew from "src/modules/personnelManagement/views/arrangeHome/page/MealSetting/MealSettingView";
import BalanceInit from "../views/arrangeHome/page/BalanceInit/BalanceInit";
import ExpectedRecordSelf from "../views/arrangeHome/page/expectedRecordSelf/ExpectedRecordSelf";

export interface meunConfigItem {
  title?: string;
  component?: any;
  path?: string;
  children?: meunConfigItem[];
  hide?: boolean | Function;
  style?: React.CSSProperties;
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
        style: { background: "#fff" }
      },
      {
        title: "我的期望排班",
        path: "/personnelManagement/expectedRecordSelf",
        component: ExpectedRecordSelf,
      },
      {
        title: "排班套餐设置",
        path: "/personnelManagement/MealSettingViewNew",
        component: MealSettingViewNew,
      },
      {
        title: "结余设置",
        path: "/personnelManagement/balanceInit",
        component: BalanceInit,
      },
    ]
  },
];
