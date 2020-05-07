import styled from "styled-components";
import windowHeight from "src/hooks/windowHeight";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { quesBankView } from "../QuesBankView";
import { Select, Checkbox } from "antd";
export interface Props {}

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
    return quesBankView.checkLabelList
      .filter((k: any) => k.id.toString() === item)
      .map((o: any) => o.labelContent);
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
        style={{ width: "95%" }}
        showSearch
        filterOption={(input: string, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
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
// const Wrapper = styled.div`
//   .label {
//     height: 400px;
//     width: 95%;
//     padding: 15px 0 0 0;
//     position: relative;
//     .li {
//       height: 40px;
//       width: 100%;
//       list-style-type: none;
//       line-height: 40px;
//       background: #eefdee;
//       margin-bottom: 10px;
//       padding: 0 10px;
//       box-sizing: border-box;
//       border-radius: 5px;
//     }
//     .li:after {
//       content: "×";
//       font-size: 16px;
//       font-weight: bold;
//       position: absolute;
//       right: 10px;
//       cursor: pointer;
//     }
//   }
// `;
