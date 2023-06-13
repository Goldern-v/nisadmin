import { Obj } from "src/libs/types";

export const TYPE_LIST: Obj[] = [
  {
    label: "月度汇总",
    columnName: "月份",
    columnKey: "reportMonth",
    level: ["", "1.2", "2.2", "3.4"],
    value: "三级质控月度汇总报告",
  },
  {
    label: "季度汇总",
    columnName: "季度",
    columnKey: "reportQuarter",
    level: ["", "1.3", "2.4", "3.5"],
    value: "三级质控季度汇总报告",
  },
];
// 需显示月份的季度表单
export const EXTRA_QUARTER = TYPE_LIST[1].value + "（显示月份）";
