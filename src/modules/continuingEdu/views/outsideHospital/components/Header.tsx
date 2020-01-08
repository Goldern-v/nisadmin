import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TableHeadCon } from "src/components/BaseTable";
import { PageTitle } from "src/components/common";
import { appStore } from "src/stores";
import { DatePicker, Select, Input, Button } from "src/vendors/antd";
interface Props {
  getTitle: any;
}
export default observer(function Header(props: Props) {
  const { getTitle } = props; //获取当前页面标题
  return (
    <Wrapper>
      <LeftIcon>
        <PageTitle>{getTitle}</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span>开始时间：</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} />
        <span>类型：</span>
        <Select style={{ width: 120 }} />
        <span>状态：</span>
        <Select style={{ width: 120 }} />
        <Input
          style={{ width: 150, marginLeft: 5, marginRight: -5 }}
          placeholder="请输入要搜索的关键字"
        />
        <Button onClick={() => {}}>查询</Button>
        <Button>导出</Button>
        <Button
          onClick={() =>
            appStore.history.push(
              `/continuingEdu/typeManagement?type=${getTitle}`
            )
          }
        >
          类型管理
        </Button>
        <Button type="primary">添加记录</Button>
      </RightIcon>
    </Wrapper>
  );
});
const Wrapper = styled(TableHeadCon)`
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
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0;
  display: flex;
  align-items: center;
`;

const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`;
