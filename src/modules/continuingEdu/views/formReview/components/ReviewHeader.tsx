import styled from "styled-components";
import React from "react";
import { Input, Button, DatePicker } from "antd";
import { formReviewModal } from "../FormReviewModal";

export default function ReviewHeader() {
  return (
    <Wrapper>
      <LeftIcon>
        <Title>资质准入审核</Title>
      </LeftIcon>
      <RightIcon>
        <span>提交日期：</span>
        <DatePicker.RangePicker
          allowClear={false}
          style={{ width: 220 }}
          value={formReviewModal.selectedDate}
          onChange={date => {
            formReviewModal.selectedDate = date;
            formReviewModal.onload();
          }}
        />
        <Input
          style={{ width: 200, marginLeft: 15, marginRight: 5 }}
          placeholder="请输入要搜索的关键字"
          value={formReviewModal.keyWord}
          onChange={e => {
            formReviewModal.keyWord = e.target.value;
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            formReviewModal.onload();
          }}
        >
          查询
        </Button>
      </RightIcon>
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
`;
