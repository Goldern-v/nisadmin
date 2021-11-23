import { Select, DatePicker, Button, Input } from "antd";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { courseLibraryModal, SelectItem } from "../modal";

export interface Prop {
  openAdd: () => any;
}
export default observer(function Header(props: Prop) {
  const { typeList } = courseLibraryModal;
  const { openAdd } = props;
  return (
    <Wrapper>
      <h1 className="title">课件库</h1>

      <span className="label">上传时间：</span>
      <DatePicker.RangePicker
        value={courseLibraryModal.date}
        onChange={(val: any) => courseLibraryModal.setFormData("date", val)}
        format="YYYY-MM-DD"
      />

      <span className="label">科室：</span>
      <Select
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        value={courseLibraryModal.deptCode}
        onChange={(val: string) =>
          courseLibraryModal.setFormData("deptCode", val)
        }
      >
        {courseLibraryModal.deptList.map((item: SelectItem) => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>

      <span className="label">课件类型：</span>
      <Select
        value={courseLibraryModal.type}
        onChange={(val: string) => courseLibraryModal.setFormData("type", val)}
      >
        {typeList.map((item: SelectItem) => {
          return (
            <Select.Option value={item.code} key={item.code}>
              {item.name}
            </Select.Option>
          );
        })}
      </Select>
      <Input
        placeholder="请输入要搜索的关键词"
        value={courseLibraryModal.keyword}
        onChange={(val: any) => courseLibraryModal.setFormData("keyword", val)}
      />
      <Button
        onClick={() => {
          courseLibraryModal.page = 1;
          courseLibraryModal.getData();
        }}
      >
        查询
      </Button>
      <Button type="primary" onClick={() => openAdd()}>
        添加课件
      </Button>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 13px;
  padding: 0 20px;

  .title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    flex: 1;
  }
  .label,
  > .ant-select,
  > .ant-calendar-picker,
  > .ant-input {
    margin-right: 15px;
    margin-bottom: 12px;
  }
  .label {
    margin-right: 0;
  }
  > .ant-select {
    max-width: 150px;
    min-width: 100px;
  }
  .ant-calendar-picker {
    max-width: 250px;
  }
  > .ant-input {
    max-width: 200px;
  }
  .ant-btn {
    margin-bottom: 15px;
  }
  .ant-btn + .ant-btn {
    margin-left: 10px;
  }
`;
