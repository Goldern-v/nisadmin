import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Select, Input } from "src/vendors/antd";
export interface Props { }

export default function FilterInput(props: any) {
  const { value, setValue, keyWord } = props;
  const Wrapper = styled.div`
    margin: 0 10px 10px;
    .label {
      font-weight: bold;
      margin-right: 10px;
      min-width: 55px;
      display: inline-block;
      text-align: right;
    }
  `;
  return (
    <Wrapper>
      <span className="label">{keyWord}</span>
      <Input
        style={{ width: 150, minWidth: 150 }}
        defaultValue={value}
        allowClear
        onPressEnter={(e: any) => setValue(e.target.value)}
        onBlur={(e: any) => setValue(e.target.value)}
      />
    </Wrapper>
  );
}

export function createFilterInput(keyWord: string, changeCallBack: () => void) {
  const [value, setValue] = useState();
  const [initEd, setInitEd] = useState(false);

  useEffect(() => {
    setInitEd(true);
  }, []);
  useEffect(() => {
    initEd && changeCallBack && changeCallBack();
  }, [value]);
  return {
    Component: () => (
      <FilterInput value={value} setValue={setValue} keyWord={keyWord} />
    ),
    value: { [keyWord]: value }
  };
}
