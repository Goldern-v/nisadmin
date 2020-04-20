import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { quesBankView } from "../QuesBankView";
import { Select } from "antd";

export interface Props {}

export default observer(function SelectLabel(props: Props) {
  useLayoutEffect(() => {
    quesBankView.init();
  }, []);

  const handleDel = (data: any) => {
    quesBankView.selectedLabel = quesBankView.selectedLabel.filter(
      (item: any) => item !== data
    );
    quesBankView.onload();
  };

  const labelContent = (item: any) => {
    return quesBankView.checkLabelList
      .filter((k: any) => k.id.toString() === item)
      .map((o: any) => o.labelContent);
  };

  return (
    <Wrapper>
      <Select
        mode="tags"
        placeholder="请输入标签查询"
        value={quesBankView.selectedLabel}
        onChange={(arr: any[]) => {
          quesBankView.selectedLabel = arr;
          quesBankView.pageIndex = 1;
          quesBankView.onload();
        }}
        style={{ width: "95%" }}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {quesBankView.checkLabelList.map((item: any, index: number) => {
          return (
            <Select.Option value={item.id.toString()} key={item.id}>
              {item.labelContent}
            </Select.Option>
          );
        })}
      </Select>
      <ul className="label">
        {quesBankView.selectedLabel &&
          quesBankView.selectedLabel.map((item: any, index: any) => {
            return (
              <li
                className="li"
                key={index}
                onClick={e => {
                  handleDel(item);
                }}
              >
                {labelContent(item)}
              </li>
            );
          })}
      </ul>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .label {
    height: 400px;
    width: 95%;
    padding: 15px 0 0 0;
    position: relative;
    .li {
      height: 40px;
      width: 100%;
      list-style-type: none;
      line-height: 40px;
      background: #eefdee;
      margin-bottom: 10px;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 5px;
    }
    .li:after {
      content: "×";
      font-size: 16px;
      font-weight: bold;
      position: absolute;
      right: 10px;
      cursor: pointer;
    }
  }
`;
