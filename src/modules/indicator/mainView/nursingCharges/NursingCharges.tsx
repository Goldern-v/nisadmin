import styled from "styled-components";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { nursingChargesModal } from "./NursingChargesModal";
import { DatePicker, Select, Button } from "src/vendors/antd";
import BaseTable from "src/components/BaseTable";
interface Props {
  getTitle: any;
}
export default observer(function NursingCharges(props: Props) {
  const { getTitle } = props; //获取当前页面标题

  // 初始化函数
  useEffect(() => {
    nursingChargesModal.init();
  }, []);

  // 动态科室对应的列
  const columns: any = [];
  if (nursingChargesModal.tableHeaderList.length) {
    let tableHeaderList = nursingChargesModal.tableHeaderList;
    tableHeaderList.map((item: any, index: number) => {
      columns.push({
        title: item,
        dataIndex: item,
        key: item,
        width: item === "序号" ? 70 : 200,
        align: "center",
        render: (text: any, record: any, idx: any) => {
          return record[index];
        }
      });
    });
  }

  return (
    <Wrapper>
      <PageHeader>
        <LeftIcon>{getTitle}</LeftIcon>
        <RightIcon>
          <span>开始时间：</span>
          <DatePicker.RangePicker
            allowClear={false}
            style={{ width: 220 }}
            value={nursingChargesModal.selectedDate}
            onChange={date => {
              nursingChargesModal.selectedDate = date;
              nursingChargesModal.onload();
            }}
          />
          <span>科室：</span>
          <Select
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 220 }}
            placeholder="选择新科室"
            value={nursingChargesModal.wardCode}
            onChange={(val: string) => {
              nursingChargesModal.wardCode = val;
              nursingChargesModal.onload();
            }}
          >
            <Select.Option value={""}>全部</Select.Option>
            {nursingChargesModal.deptList.map((item: any) => {
              return (
                <Select.Option value={item.code} key={item}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
          <span>质控指标：</span>
          <Select
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 220 }}
            placeholder="选择指标"
            value={nursingChargesModal.indicatorCode}
            onChange={(val: string) => {
              nursingChargesModal.indicatorCode = val;
              nursingChargesModal.onload();
            }}
          >
            <Select.Option value={""}>全部</Select.Option>
            {nursingChargesModal.chargesList.map((item: any) => {
              return (
                <Select.Option value={item.code} key={item}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
          <Button
            type="primary"
            onClick={() => {
              nursingChargesModal.onload();
            }}
          >
            查询
          </Button>
          <Button
            onClick={() => {
              nursingChargesModal.export();
            }}
          >
            导出
          </Button>
        </RightIcon>
      </PageHeader>
      <Content>
        <BaseTable
          loading={nursingChargesModal.dataLoading}
          dataSource={nursingChargesModal.tableContentList}
          columns={columns}
          surplusWidth={280}
          surplusHeight={200}
        />
      </Content>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const PageHeader = styled.div`
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
  font-size: 20px;
  color: #333;
  font-weight: bold;
`;

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
`;

const Content = styled.div``;
