import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TableHeadCon } from "src/components/BaseTable";
import { appStore } from "src/stores";
import { DatePicker, Select, Input, Button, message } from "src/vendors/antd";
import { mainPageModal } from "../MainPageModal";
import qs from "qs";
interface Props {
  getTitle: any;
  getId: any;
  addRecordModal: any;
}
export default observer(function Header(props: Props) {
  let Pid = qs.parse(appStore.location.search.replace("?", "")).Pid;
  let Title = props.getTitle || "";
  let id = props.getId || "";
  useEffect(() => {
    mainPageModal.id = id;
    mainPageModal.init();
  }, [id, Title]);

  return (
    <Wrapper>
      <LeftIcon>
        <span>开始时间：</span>
        <DatePicker.RangePicker
          allowClear={false}
          style={{ width: 220 }}
          value={mainPageModal.selectedDate}
          onChange={date => {
            mainPageModal.selectedDate = date;
            mainPageModal.onload();
          }}
        />
        <span>类型：</span>
        <Select
          style={{ width: 120 }}
          value={mainPageModal.selectedType}
          onChange={(val: string) => {
            mainPageModal.selectedType = val;
            mainPageModal.pageIndex = 1;
            mainPageModal.onload();
          }}
        >
          <Select.Option value="">全部</Select.Option>
          {mainPageModal.selectTypeList.map((item: any, index: number) => (
            <Select.Option value={item.id} key={index}>
              {item.name}
            </Select.Option>
          ))}
          <Select.Option value="-1">其他</Select.Option>
        </Select>
        <span>状态：</span>
        <Select
          style={{ width: 120 }}
          value={mainPageModal.selectedState}
          onChange={(val: string) => {
            mainPageModal.selectedState = val;
            mainPageModal.pageIndex = 1;
            mainPageModal.onload();
          }}
        >
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="1">草稿</Select.Option>
          <Select.Option value="2">待审核</Select.Option>
          <Select.Option value="3">退回</Select.Option>
          <Select.Option value="4">发布</Select.Option>
          <Select.Option value="5">归档</Select.Option>
        </Select>
      </LeftIcon>
      <RightIcon>
        <Input
          style={{ width: 150, marginLeft: 5, marginRight: -5 }}
          placeholder="请输入要搜索的关键字"
          value={mainPageModal.keyWord}
          onChange={e => {
            mainPageModal.keyWord = e.target.value;
          }}
        />
        <Button
          onClick={() => {
            mainPageModal.onload();
          }}
        >
          查询
        </Button>
        <Button>导出</Button>
        <Button
          onClick={() =>
            appStore.history.push(
              `/typeManagement?type=${Title}&id=${id}&Pid=${Pid}`
            )
          }
        >
          类型管理
        </Button>
        <Button
          type="primary"
          onClick={() => {
            props.addRecordModal.show({
              onOkCallBack() {
                message.success("保存成功");
                mainPageModal.onload();
              }
            });
          }}
        >
          添加记录
        </Button>
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
