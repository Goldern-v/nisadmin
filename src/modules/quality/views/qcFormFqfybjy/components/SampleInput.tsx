import styled from "styled-components";
import React, { useState, useEffect, Fragment } from "react";
import { Button, Input } from "antd";

export interface Props {
  text: string;
  input: Function;
  save: (e: string) => void;
  isMulti?: boolean;
}
const defProps = {
  isMulti: false,
  text: "",
  input: (e: any) => {},
  save: (e: string) => {},
};
export default function SampleInput(props: Props = defProps) {
  const [val, setVal] = useState(props.text);

  const handleKeyUp = (e: any) => {
    if (e.keyCode == 13) {
      props.save(val);
    }
  };
  return (
    <Wrapper>
      {props.isMulti ? (
        <Fragment>
          <Input.TextArea
            className="def-ipt def-textarea"
            rows={2}
            value={val}
            onChange={(e) => setVal(e.currentTarget.value)}
          />
          <Button size="small" onClick={() => props.save(val)}>
            保存
          </Button>
        </Fragment>
      ) : (
        <Input
          className="def-ipt"
          value={val}
          onChange={(e) => setVal(e.currentTarget.value)}
          onKeyUp={(e) => handleKeyUp(e)}
        />
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .def-ipt {
    border: none;
    border-radius: 0;
    padding: 0;
    height: 24px;
    line-height: 24px;
    &.def-textarea {
      min-height: 24px;
      height: 48px;
      resize: vertical;
    }
  }
  .ant-btn {
    margin-top: 2px;
  }
`;
