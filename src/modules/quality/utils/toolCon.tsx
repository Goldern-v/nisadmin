import { Select } from "antd";
import React from "react";

export const MonthList = () => {
  let options = [];
  for (let i = 12; i > 0; i--) {
    let month = i;
    options.push(
      <Select.Option
        value={`${month}`}
        key={`month${month}`}
      >{`${month}月`}</Select.Option>
    );
  }

  return options;
};
