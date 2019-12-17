import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { DictItem } from "src/services/api/CommonApiService";
import { Select } from "src/vendors/antd";
export interface Props {
  label: string;
  list: DictItem[];
  initValue: any;
  width?: number;
}

export default function createdSelectItem(props: Props) {
  let { label, list, initValue, width } = props;
  const [value, setValue] = useState(initValue);
  let Component = () => (
    <Wrapper>
      <span className="label">{label}：</span>
      <Select
        value={value}
        onChange={(value: any) => setValue(value)}
        style={{ width: width || 100 }}
      >
        {list.map(item => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Wrapper>
  );
  return {
    Component,
    value
  };
}
const Wrapper = styled.div`
  margin-right: 10px;
`;
