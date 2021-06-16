import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Select } from "src/vendors/antd";
export interface Props { }

export default function FilterItem(props: any) {
  const { configList, setSelectedItem, selectedItem, keyWord } = props;
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
      <Select
        style={{ width: 150, minWidth: 150 }}
        value={selectedItem}
        onChange={(value: any) => {
          setSelectedItem(value);
        }}
      >
        {configList.map((item: any) => (
          <Select.Option value={item.value} key={item.label}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </Wrapper>
  );
}

export function createFilterItem(
  keyWord: string,
  itemConfigList: any[],
  rangConfigList: any[],
  changeCallBack: () => void
) {
  let list = [];
  if (keyWord == "班次") {
    list = rangConfigList.map((item: any) => item.itemCode);
  } else {
    try {
      list = itemConfigList
        .find((item: any) => item.itemCode == keyWord)
        .options.split(";");
    } catch (error) {}
  }

  const configList = [
    { label: "全部", value: "全部" },
    ...list.map((item: string) => ({ label: item, value: item }))
  ];
  const [selectedItem, setSelectedItem] = useState("全部");
  const [initEd, setInitEd] = useState(false);

  useEffect(() => {
    setInitEd(true);
  }, []);
  useEffect(() => {
    initEd && changeCallBack && changeCallBack();
  }, [selectedItem]);
  return {
    Component: () => (
      <FilterItem
        configList={configList}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        keyWord={keyWord}
      />
    ),
    value: { [keyWord]: selectedItem == "全部" ? "" : selectedItem }
  };
}
