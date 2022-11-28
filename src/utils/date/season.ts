import moment from "moment";

export const getSeasonsStartAndEnd = (year?: number, season?: number) => {
  const _year = year || moment().year();
  const _season = season || moment().quarter();

  switch (_season) {
    case 1:
      return [moment(`${_year}-1-1`), moment(`${_year}-3-31`)];
    case 2:
      return [moment(`${_year}-4-1`), moment(`${_year}-6-30`)];
    case 3:
      return [moment(`${_year}-7-1`), moment(`${_year}-9-30`)];
    case 4:
      return [moment(`${_year}-10-1`), moment(`${_year}-12-31`)];
  }
};
export const MONTH_OF_QUARTER = [
  ["1月", "2月", "3月"],
  ["4月", "5月", "6月"],
  ["7月", "8月", "9月"],
  ["10月", "11月", "12月"],
];
// 获取季度的月份
export const getMonthOfQuarter = (index: number | string) => {
  return [...MONTH_OF_QUARTER[index]] || [];
};
