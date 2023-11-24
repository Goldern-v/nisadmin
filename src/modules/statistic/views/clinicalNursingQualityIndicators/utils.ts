import { quarterList, textYM1 } from "src/enums/date";
import { Obj } from "src/libs/types";

const getYear = (year: any) => year.format("YYYY");

/**
 *
 * @param tableData table列表数据
 * @param key 需要计算rowSpan值的列的key值，即dataIndex
 * @returns
 */
const formatDataByRow = (tableData: any, key: string) => {
  const data = [...tableData];
  const reverseArr = [...tableData].reverse();
  let len = tableData.length;
  for (let i = 0; i < len; i++) {
    const v = data[i];
    if (i >= len) break;
    let index = reverseArr.findIndex((v1: any) => v1[key] === v[key]);
    if (index === -1) break;
    v.rowSpan = len - index - i;
    i = len - index - 1;
  }
  return data;
};

/**
 * 主要计算合计项，现已弃用
 * @param tableData
 * @param key
 * @returns
 */
const formatDataBy0 = (tableData: any, key: string) => {
  const obj = tableData.reduce((obj: any, prev: any) => {
    const name = prev[key];
    if (!obj[name]) {
      obj[prev[key]] = prev;
      return obj;
    }
    for (let i in obj[name]) {
      if (typeof obj[name][i] === "number") {
        obj[name][i] += prev[i];
      }
    }
    return obj;
  }, {});
  return Object.values(obj);
};

/**标题前缀时间 */
export const titlePrefix = (data: Obj) => {
  let { year, timeType, months, quarter } = data;
  year = getYear(year);
  if (timeType <= 1) return `${year}年`;
  if (timeType === 2) {
    if (quarter.length < 2) return `${year}年${quarterList[quarter[0] - 1]}`;
    quarter = quarter.sort();
    return `${year}年第${quarter
      .map((v: any) => quarterList[v - 1][1] || "")
      .join("、")}季度`;
  }
  const m0 = months[0].format(textYM1);
  const m1 = months[1].format(textYM1);
  if (m0 === m1) return m0;
  return `${m0}-${m1}`;
};
/**标题type维度 */
const titleType = (data: Obj) => {
  let { type, areaName, wardName } = data;
  if (type === 1) return "全院";
  if (type === 2) return areaName;
  return wardName;
};
const TITLE_CODE = {
  QCRG_HJ_03: "基础指标数据统计",
};
export const getTitle = (data: Obj) =>
  `${titlePrefix(data)}${titleType(data)}${TITLE_CODE[data.code]}`;

/** tableData是否格式化
 * type/timeType */
const DATA_CONFIG = {
  11: (tableData: any) => formatDataBy0(tableData, "科室"),
  12: (tableData: any) => formatDataByRow(tableData, "deptName"),
  13: (tableData: any) => formatDataByRow(tableData, "科室"),
};
export const getDataConfig = (data: Obj) => {
  const { type, timeType } = data;
  const text = `${type}${timeType}`;
  return DATA_CONFIG[text];
};

export const getColumnsConfig = (data: Obj) => {
  const { type, timeType } = data;
  const text = `${type}${timeType}`;
  if (["31","33"].includes(text)) return COLUMNS_CONFIG[31];
  return COLUMNS_CONFIG[text];
};
/**
 *
 * @param secondItem 第二个列的标题和key
 * @param callback 是否存在第3列
 * @returns 函数
 */
const def13 = (
  secondItem = {
    title: `科室`,
    dataIndex: "科室",
  },
  callback = (arr: any) => {}
) => (arr: any[]) => {
  callback(arr);
  arr.unshift({
    ...secondItem,
    align: "center",
    width: 140,
    render: (value: any, record: any) => {
      return value;
    },
  });
  arr.unshift({
    title: "科室",
    dataIndex: "科室",
    align: "center",
    width: 100,
    render(value: any, record: Obj) {
      return {
        children: value || "合计",
        // children: `${value}(${record.rowSpan})`,
        props: {
          // rowSpan: record.rowSpan !== undefined ? record.rowSpan : 1
          rowSpan: record.rowSpan || 0,
        },
      };
    },
  });
};
/**
 * 按全院，按季度的columns格式
 * @param needWard 是否需要片区
 * @param callback 
 * @returns 
 */
const def12 = (needWard = true, callback?: (arr: any) => void) => (arr: any[]) => {
  arr.unshift({
    title: `季度`,
    dataIndex: "quarter",
    align: "center",
    width: 100,
    render: (value: any, record: any) => {
      const [v1, v2] = (value || "").split("-");
      if (v2) {
        return quarterList[Number(v2) - 1];
      }
      if (!needWard && !callback)
      return "合计";
    },
  });
  callback && callback(arr)
  needWard && arr.unshift({
    title: `科室`,
    dataIndex: "deptName",
    align: "center",
    width: 100,
    render(value: any, record: Obj) {
      return {
        children: value || "合计",
        props: {
          rowSpan: record.rowSpan || 0,
        },
      };
    },
  });
};
/** 列数据
 * type/timeType
 * 第一个数字，1：全院，3：科室
 * 第二个数字，1：按年度，2：按季度，3：按月度
 * */
export const COLUMNS_CONFIG = {
  11: (arr: any[]) => {
    arr.unshift({
      title: "科室",
      dataIndex: "科室",
      align: "center",
      width: 100,
      render: (value: any, record: any) => {
        return value || "合计";
      },
    });
  },
  13: def13({
    title: "月份",
    dataIndex: "month",
  }),
  31: (arr: any[]) => {
    arr.unshift({
      title: `月份`,
      dataIndex: "month",
      align: "center",
      width: 70,
      render: (value: any, record: any) => {
        return value || "合计";
      },
    });
  },
  12: def12(),
  32: def12(false)
};
