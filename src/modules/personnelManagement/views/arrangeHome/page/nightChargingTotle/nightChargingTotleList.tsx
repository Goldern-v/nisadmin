import styled from "styled-components";
import React, { useState, useEffect } from "react";
import qs from "qs";
import { authStore, appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { Button, Select, message, Modal } from "antd";
import BaseTable, {
  TabledCon,
  DoCon,
  TableHeadCon
} from "src/components/BaseTable";
import moment from "moment";
import YearPicker from "src/components/YearPicker";

const Option = Select.Option;

export default observer(function nightChargingTotleList() {
  const { history } = appStore;
  const defaultQuery = {
    year: moment().format("YYYY"),
    month: "",
  } as any;

  const [query, setQuery] = useState(defaultQuery);

  const monthList = (() => {
    let currentMonth = 12;
    let monthArr = [];
    while (currentMonth--) {
      monthArr.push(currentMonth + 1);
    }
    return monthArr;
  })();

  return (
    <Wrapper>
      <HeaderCon>
        <LeftIcon />
        <RightIcon>
          <span>年份:</span>
          <span className="year-select">
            <YearPicker
              allowClear={false}
              value={moment(`${query.year}-01-01`) || undefined}
              onChange={(newMoment: any) => {
                if (newMoment)
                  setQuery({ ...query, year: newMoment.format("YYYY") });
                else setQuery({ ...query, year: "" });
              }}
            />
          </span>
          <span>月份:</span>
          <Select
            className="month-select"
            onChange={(month: string) => setQuery({ ...query, month })}
          >
            <Option value="">全部</Option>
            {monthList.map((month: number) => (
              <Option value={`${month}`} key={month}>
                {month}
              </Option>
            ))}
          </Select>
          <Button type="primary">
            导出
          </Button>
          <Button type="primary">
            打印
          </Button>
        </RightIcon>
      </HeaderCon>
    </Wrapper>
  );
});

// @ts-ignore
const Wrapper = styled.div`
 position: relative;
`;

const HeaderCon = styled.div`
display: flex;
  justify-content: space-between;
  .ant-select {
    width: 150px;
    margin-right: 20px;
  }
  .ant-calendar-picker {
    margin-right: 20px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
  .month-select {
    width: 70px;
  }
  .year-select {
    width: 100px;
    display: inline-block;
  }
  .approvalStatus-select{
    width:180px;
  }
`;
const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  /* padding: 0 0 0 15px; */
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
const ExportCon = styled.div`
  & > div {
    margin-top: 15px;
  }
`;
