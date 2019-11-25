import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PageHeader, PageTitle, Place } from "src/components/common";
import {
  DatePicker,
  Select,
  ColumnProps,
  PaginationConfig
} from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import { observer } from "mobx-react-lite";
import { DictItem } from "src/services/api/CommonApiService";
import BaseTabs, { ConfigItem } from "src/components/BaseTabs";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import { authStore } from "src/stores";
import { arrangStatisticsService } from "./services/ArrangStatisticsService";
import BaseTable from "src/components/BaseTable";

export interface Props {}
export default observer(function ArrangStatistics() {
  const [date, setDate]: any = useState(getCurrentMonth());
  const [dataSource, setDataSource] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const columns: ColumnProps<any>[] | any = [
    {
      title: "姓名",
      dataIndex: "姓名",
      width: 80,
      align: "center"
    },
    ...Object.keys(dataSource[0] || {})
      .filter(item => !(item == "姓名" || item == "合计" || item == "序列"))
      .map(item => {
        return {
          title: item,
          dataIndex: item,
          width: 50,
          align: "center"
        };
      }),
    {
      title: "工时合计",
      dataIndex: "合计",
      width: 80,
      align: "center"
    }
  ];
  const onLoad = () => {
    let obj = {
      deptCode: authStore.selectedDeptCode,
      startTime: (date && date[0] && date[0].format("YYYY-MM-DD")) || "",
      endTime: (date && date[1] && date[1].format("YYYY-MM-DD")) || "",
      type: "range_name",
      status: true
    };
    setPageLoading(true);
    arrangStatisticsService.countUserAll(obj).then(res => {
      setPageLoading(false);
      setDataSource(res.data);
    });
  };

  useEffect(() => {
    onLoad();
  }, [date, authStore.selectedDeptCode]);
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>排班统计</PageTitle>
        <Place />
        <span className="label">日期:</span>
        <DatePicker.RangePicker
          allowClear={false}
          style={{ width: 220 }}
          value={date}
          onChange={(value: any) => setDate(value)}
        />
        <span className="label">科室:</span>
        <DeptSelect onChange={() => {}} />
        <Button type="primary" onClick={onLoad}>
          刷新
        </Button>
      </PageHeader>
      <div style={{ margin: "0 15px" }}>
        <BaseTable
          loading={pageLoading}
          dataSource={dataSource}
          columns={columns}
          type={["index"]}
          surplusHeight={180}
          surplusWidth={220}
        />
      </div>
    </Wrapper>
  );
});
const Wrapper = styled.div``;
