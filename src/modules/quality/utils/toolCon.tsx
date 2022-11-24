import { Select } from "antd";
import React from "react";

export const MonthList = (isList = false) => {
  let options = [];
  for (let i = 12; i > 0; i--) {
    let month = i;
    options.push(
      isList
        ? `${month}月`
        : <Select.Option
          value={`${month}`}
          key={`month${month}`}
        >{`${month}月`}</Select.Option>
    );
  }

  return options;
};

/**季度下拉框
 * isList 是否只是数组
 */
export const QuarterList = (isList = false) => {
  return ['一', '二', '三', '四'].map((v, i) => (
    isList ? `第${v}季度` : <Select.Option value={i + 1 + ''} key={i + 1}>{`第${v}季度`}</Select.Option>
  ))
}
