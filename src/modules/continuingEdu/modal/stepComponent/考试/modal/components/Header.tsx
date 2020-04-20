import styled from "styled-components";
import React, { useLayoutEffect } from "react";
import { TableHeadCon } from "src/components/BaseTable";
import { Radio, Select, Input, Button } from "antd";
import { quesBankView } from "../QuesBankView";
import { observer } from "mobx-react-lite";

export default observer(function Header() {
  useLayoutEffect(() => {
    quesBankView.onload();
  }, []);

  return (
    <Wrapper>
      <LeftIcon>
        <Button className="checkButton" onClick={() => {}}>
          加入考卷
        </Button>
      </LeftIcon>
      <RightIcon>
        <Radio.Group
          buttonStyle="solid"
          style={{ marginRight: "15px" }}
          value={quesBankView.bankType}
          onChange={(e: any) => {
            quesBankView.bankType = e.target.value;
            quesBankView.pageIndex = 1;
            quesBankView.onload();
          }}
        >
          <Radio.Button value="系统题库">系统题库</Radio.Button>
          <Radio.Button value="医院题库">医院自建</Radio.Button>
        </Radio.Group>
        <span>类型：</span>
        <Select
          style={{ width: 120 }}
          value={quesBankView.questionType}
          onChange={(val: string) => {
            quesBankView.questionType = val;
            quesBankView.pageIndex = 1;
            quesBankView.onload();
          }}
        >
          <Select.Option value="单选题">单选题</Select.Option>
          <Select.Option value="多选题">多选题</Select.Option>
          <Select.Option value="填空题">填空题</Select.Option>
          <Select.Option value="问答题">问答题</Select.Option>
        </Select>
        <Input
          style={{ width: 150, marginLeft: 5, marginRight: -5 }}
          placeholder="请输入要搜索的关键字"
          value={quesBankView.keyWord}
          onChange={e => {
            quesBankView.keyWord = e.target.value;
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            quesBankView.onload();
          }}
        >
          查询
        </Button>
      </RightIcon>
    </Wrapper>
  );
});
const Wrapper = styled(TableHeadCon)`
  height: 31px !important;
  justify-content: space-between;
  .ant-select {
    width: 150px;
    margin-right: 15px;
  }
  .ant-calendar-picker {
    margin-right: 15px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
  .ant-select-selection-selected-value span {
    color: #000 !important;
  }
`;
const LeftIcon = styled.div`
  // height: 55px;
  // font-size: 13px;
  // position: relative;
  // font-size: 13px;
  // color: #333333;
  // padding: 0;
  // display: flex;
  // align-items: center;
`;

const RightIcon = styled.div`
  // height: 55px;
  // font-size: 13px;
  // position: relative;
  // font-size: 13px;
  // color: #333333;
  // padding: 0 0 0 15px;
  // display: flex;
  // align-items: center;
`;
