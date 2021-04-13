import styled from "styled-components";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { quesBankView } from "../QuesBankView";
import { Select, Checkbox } from "antd";
export interface Props { }

export default observer(function SelectLabel(props: Props) {
  const [data, setData]: any = useState([]); //全部标签数据
  const [getCheckbox, setGetCheckbox]: any = useState([]); //选中的多选框

  // 删除标签
  const handleDel = (id: any) => {
    quesBankView.selectedLabel = quesBankView.selectedLabel.filter(
      (item: any) => item !== id
    );
    setData(data.filter((item: any) => item !== id));
    quesBankView.onload();
  };

  // 通过id获取标签名
  const labelContent = (item: any) => {
    return quesBankView.allData
      .filter((k: any) => k.id.toString() === item)
      .map((o: any) => o.labelContent);
  };

  // 聚焦获取前100条默认数据
  const handleFocus = () => {
    let obj = {
      keyWord: "",
      pageIndex: 1,
      pageSize: 100
    };
    quesBankView.initData(obj);
  };

  return (
    <Wrapper>
      <Select
        mode="multiple"
        maxTagCount={0}
        allowClear={true}
        placeholder="请输入标签查询"
        value={data}
        onChange={(arr: any[]) => {
          quesBankView.selectedLabel = arr;
          setData(arr);
          quesBankView.pageIndex = 1;
          quesBankView.onload();
        }}
        onFocus={handleFocus}
        style={{ width: "95%" }}
        showSearch
        filterOption={false}
        onSearch={(value: any) => {
          quesBankView.keyWordSelect = value;
          quesBankView.initData();
        }}
        loading={quesBankView.selectLoading}
      >
        {quesBankView.checkLabelList.map((item: any, index: number) => (
          <Select.Option value={item.id.toString()} key={item.id}>
            {item.labelContent}
          </Select.Option>
        ))}
      </Select>
      <Checkbox.Group
        className="label"
        value={quesBankView.selectedLabel.filter(
          (o: any) => getCheckbox.indexOf(o) == -1
        )}
        onChange={(checkedValue: any) => {
          quesBankView.selectedLabel = checkedValue;
          setGetCheckbox(
            data.filter(
              (item: any) => quesBankView.selectedLabel.indexOf(item) == -1
            )
          );
          quesBankView.onload();
        }}
      >
        {data &&
          data.map((item: any, index: any) => {
            return (
              <div className="box" key={index}>
                <Checkbox className="li" value={item}>
                  {labelContent(item)}
                </Checkbox>
                <span
                  className="del"
                  onClick={e => {
                    handleDel(item);
                  }}
                >
                  ×
                </span>
              </div>
            );
          })}
      </Checkbox.Group>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  .label {
    width: 95%;
    padding: 15px 0 0 0;
    @media screen {
      height: calc(100vh - 305px);
      overflow-y: auto;
    }
    .box {
      width: 100%;
      position: relative;
      line-height: 40px;
      color: rgba(0, 0, 0, 0.65);
      background-color: #fafafa;
      border: 1px solid #e8e8e8;
      margin-bottom: 10px;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 5px;
      height: 40px;
    }
    .li {
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .del {
      position: absolute;
      font-size: 16px;
      font-weight: bold;
      right: 10px;
      cursor: pointer;
    }
  }
`;
