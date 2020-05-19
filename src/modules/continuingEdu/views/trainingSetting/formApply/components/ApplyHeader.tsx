import styled from "styled-components";
import React, { useState } from "react";
import { Select, Input, Button, DatePicker } from "antd";
import { formApplyModal } from "../FormApplyModal"; // 仓库数据
import FormEditModal from "../modal/FormEditModal"; // 新建弹窗

const Option = Select.Option;

interface Props {
  getTitle: any;
}

export default function ApplyHeader(props: Props) {
  const { getTitle } = props; //获取当前页面标题
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态

  // 修改表单
  const saveOrUpload = (record?: any) => {
    setEditParams({});
    setEditVisible(true);
  };

  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
  };
  const handleEditOk = () => {
    // getTableData();
    handleEditCancel();
  };

  return (
    <Wrapper>
      <LeftIcon>
        <Title>{getTitle}</Title>
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
          <Option value="4">发布</Option>
          <Option value="5">归档</Option>
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
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
  );
}
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
