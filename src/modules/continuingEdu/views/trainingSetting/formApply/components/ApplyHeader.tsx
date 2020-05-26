import styled from "styled-components";
import { observer } from "mobx-react-lite";

import React, { useState, useLayoutEffect } from "react";
import { Select, Input, Button, DatePicker } from "antd";
import { PageTitle } from "src/components/common";
import { formApplyModal } from "../FormApplyModal"; // 仓库数据
import FormEditModal from "../modal/FormEditModal"; // 新建弹窗

const Option = Select.Option;

interface Props {}

export default observer(function ApplyHeader(props: Props) {
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态

  const handleEditOk = () => {
    formApplyModal.onload();
    setEditVisible(false);
  };

  return (
    <Wrapper>
      <LeftIcon>
        <PageTitle maxWidth={1450}>{formApplyModal.getTitle}</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span>创建日期：</span>
        <DatePicker.RangePicker
          allowClear={false}
          style={{ width: 220 }}
          value={formApplyModal.selectedDate}
          onChange={date => {
            formApplyModal.selectedDate = date;
            formApplyModal.onload();
          }}
        />
        <span className="span">状态：</span>
        <Select
          style={{ width: 200 }}
          value={formApplyModal.stateType}
          onChange={(val: string) => {
            formApplyModal.stateType = val;
            formApplyModal.pageIndex = 1;
            formApplyModal.onload();
          }}
        >
          <Option value="">全部</Option>
          <Option value="1">草稿</Option>
          <Option value="2">待审核</Option>
          <Option value="3">退回</Option>
          <Option value="4">通过</Option>
        </Select>
        <Input
          style={{ width: 200, marginLeft: 15, marginRight: 5 }}
          placeholder="请输入要搜索的关键字"
          value={formApplyModal.keyWord}
          onChange={e => {
            formApplyModal.keyWord = e.target.value;
          }}
        />
        <Button
          onClick={() => {
            formApplyModal.onload();
          }}
        >
          查询
        </Button>
        <Button
          type="primary"
          className="span"
          onClick={() => setEditVisible(true)}
        >
          新建
        </Button>
      </RightIcon>
      <FormEditModal
        visible={editVisible}
        onCancel={() => setEditVisible(false)}
        onOk={handleEditOk}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  width: calc(100vw-200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 15px 0 15px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;
const LeftIcon = styled.div`
  padding: 0;
  float: left;
`;

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
  .span {
    margin-left: 15px;
  }
`;
