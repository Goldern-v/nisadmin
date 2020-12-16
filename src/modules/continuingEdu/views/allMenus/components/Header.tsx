import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TableHeadCon } from "src/components/BaseTable";
import { appStore, authStore } from "src/stores";
import { DatePicker, Select, Input, Button, message } from "src/vendors/antd";
import { allMenusModal } from "../AllMenusModal";
import { allMenusApi } from "../api/AllMenusApi";

interface Props {
  getTitle: any;
  getId: any;
  addRecordModal: any;
}
export default observer(function Header(props: Props) {
  let Title = props.getTitle || "";
  useEffect(() => {
    allMenusModal.init();
  }, []);

  return (
    <Wrapper>
      <LeftIcon>
        <span>开始时间：</span>
        <DatePicker.RangePicker
          allowClear={false}
          style={{ width: 200 }}
          value={allMenusModal.selectedDate}
          onChange={date => {
            allMenusModal.selectedDate = date;
            allMenusModal.onload();
          }}
        />
        <span>教学方式：</span>
        <Select
          style={{ width: 70 }}
          value={allMenusModal.teachingMethod}
          onChange={(val: string) => {
            allMenusModal.teachingMethod = val;
            allMenusModal.pageIndex = 1;
            allMenusModal.onload();
          }}
        >
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="1">学习</Select.Option>
          <Select.Option value="2">培训</Select.Option>
          <Select.Option value="3">考试</Select.Option>
          <Select.Option value="4">练习</Select.Option>
          <Select.Option value="5">实操</Select.Option>
          <Select.Option value="6">演练</Select.Option>
          <Select.Option value="7">实践</Select.Option>
        </Select>
        <span>状态：</span>
        <Select
          style={{ width: 90 }}
          value={allMenusModal.status}
          onChange={(val: string) => {
            allMenusModal.status = val;
            allMenusModal.pageIndex = 1;
            allMenusModal.onload();
          }}
        >
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="1">草稿</Select.Option>
          <Select.Option value="2">待审核</Select.Option>
          <Select.Option value="3">退回</Select.Option>
          <Select.Option value="41">待开始</Select.Option>
          <Select.Option value="42">进行中</Select.Option>
          <Select.Option value="43">已结束</Select.Option>
        </Select>
        <span>组织方式：</span>
        <Select
          style={{ width: 70 }}
          value={allMenusModal.organizationWay}
          onChange={(val: string) => {
            allMenusModal.organizationWay = val;
            allMenusModal.pageIndex = 1;
            allMenusModal.onload();
          }}
        >
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="1">线上</Select.Option>
          <Select.Option value="2">线下</Select.Option>
        </Select>
        <span>成员：</span>
        <Select
          placeholder="请输入成员姓名"
          style={{ width: 130 }}
          value={allMenusModal.empNo as any}
          onChange={(val: string) => {
            allMenusModal.empNo = val;
            allMenusModal.pageIndex = 1;
            allMenusModal.onload();
          }}
          allowClear
          showSearch
          filterOption={false}
          onSearch={(value: any) => {
            allMenusModal.empNoSearch = value;
            allMenusModal.initData();
          }}
        >
          {allMenusModal.empNoList.map((item: any) => (
            <Select.Option key={item.empName} value={item.empNo}>
              {`${item.empName}(${item.empNo})`}
            </Select.Option>
          ))}
        </Select>

      </LeftIcon>
      <RightIcon>
        <Input
          style={{ width: 130, marginLeft: 5, marginRight: -5 }}
          placeholder="请输入关键字"
          value={allMenusModal.keyWord}
          onChange={e => {
            allMenusModal.keyWord = e.target.value;
          }}
        />
        <Button
          type='primary'
          onClick={() => {
            allMenusModal.onload();
          }}
        >
          查询
        </Button>
        <Button
          onClick={() => {
            allMenusModal.export();
          }}
        >
          导出
        </Button>
      </RightIcon>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  width: calc(100vw-200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 20px 0 20px;
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
  padding: 0;
  float: left;
`;

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
`;
