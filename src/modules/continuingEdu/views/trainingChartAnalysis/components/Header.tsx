import { Radio, Select, DatePicker, Button, message } from "antd";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import Tabs from "../../trainingManual/components/Tabs";
import {
  trainingChartAnalysisModal,
  TabsItem,
} from "../trainingChartAnalysisModal";

export interface Props {}
export default observer(function Header(props: Props) {
  const { tabs } = trainingChartAnalysisModal;
  let changeDate = (date: any[]) => {
    let [m1, m2] = date;
    let M1 = Number(m1.format("M"));
    let M2 = Number(m2.format("M"));
    let Y1 = Number(m1.format("YYYY"));
    let Y2 = Number(m2.format("YYYY"));
    let difM = M2 - M1 + 1 + Math.max(Y2 - Y1, 0) * 12;
    //  计算月份差
    if (difM > 12) {
      message.warning("时间间隔不能超过一年");
      return false;
    }
    trainingChartAnalysisModal.selectedDate = date;
    trainingChartAnalysisModal.getData();
  };
  return (
    <Wrapper>
      <Radio.Group
        value={trainingChartAnalysisModal.selectedTab}
        onChange={(e) => trainingChartAnalysisModal.onChangeTab(e)}
      >
        {tabs.map((v: TabsItem) => (
          <Radio.Button value={v.key} key={v.key}>
            {v.label}
          </Radio.Button>
        ))}
      </Radio.Group>
      <RightIcon>
        <span className="label">科室</span>
        <Select
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          disabled={trainingChartAnalysisModal.selectedTab == tabs[0].key}
          value={trainingChartAnalysisModal.selectedDeptCode}
          onChange={(value: any, option: any) =>
            trainingChartAnalysisModal.onChangeDept(value, option)
          }
        >
          {trainingChartAnalysisModal.filterDeptList.map((item: any) => (
            <Select.Option value={item.code} key={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>

        <span className="label">成员</span>
        <Select
          value={trainingChartAnalysisModal.selectedPerCode}
          onChange={(val: string, option: any) => {
            trainingChartAnalysisModal.onChangePer(val, option);
          }}
          disabled={[tabs[0].key, tabs[1].key].includes(
            trainingChartAnalysisModal.selectedTab
          )}
        >
          {trainingChartAnalysisModal.filterPerList.map((item: any) => (
            <Select.Option value={item.empNo} key={item.empNo}>
              {item.empName}
            </Select.Option>
          ))}
        </Select>

        <DatePicker.RangePicker
          allowClear={false}
          value={trainingChartAnalysisModal.selectedDate}
          onChange={(date) => {
            changeDate(date);
          }}
        />
        <Button
          type="primary"
          onClick={() => trainingChartAnalysisModal.getData()}
        >
          查询
        </Button>
        <Button onClick={() => trainingChartAnalysisModal.print()}>打印</Button>
      </RightIcon>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
`;

const RightIcon = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  font-size: 13px;

  .label,
  > .ant-select,
  > .ant-calendar-picker {
    margin-right: 15px;
    margin-bottom: 12px;
  }
  > .ant-select {
    max-width: 150px;
    min-width: 100px;
  }
  .ant-calendar-picker {
    max-width: 220px;
  }
  .ant-btn {
    margin-bottom: 15px;
  }
  .ant-btn + .ant-btn {
    margin-left: 10px;
  }
`;
