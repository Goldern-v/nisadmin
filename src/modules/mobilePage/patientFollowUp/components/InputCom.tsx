import styled from "styled-components";
import React, { useState, useEffect } from "react";

export default function InputCom(props: any) {
  const { setParams } = props;
  let item = {
    [props.keyWord]: props.value,
  };
  return (
    <Wrapper>
      <div className="item">
        <span className="item_text">{props.label}</span>
        <input
          value={props.value}
          placeholder="请输入"
          disabled={props.status == 1}
          onInput={(e: any) => {
            item[props.keyWord] = e.currentTarget.value;
            setParams({ ...props.params, ...item });
          }}
        />
        <div className="company">{props.company}</div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .item {
    font-size: 14px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid #e6e6e6;
    margin: 0 15px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.65);
    .item_text {
      width: 220px;
    }
    input {
      width: 100px;
      border: 1px solid rgba(0, 0, 0, 0.65);
      height: 30px;
      &::focus {
        border: none;
      }
    }
  }
`;
