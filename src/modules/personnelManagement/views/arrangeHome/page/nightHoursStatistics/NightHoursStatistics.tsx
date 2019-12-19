import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PageHeader, PageTitle, Place } from "src/components/common";
import {
  DatePicker,
  Select,
  ColumnProps,
  PaginationConfig,
  Input
} from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import { appStore, authStore } from "src/stores";
import BaseTable from "src/components/BaseTable";
import { arrangeService } from "../../services/ArrangeService";
import { observer } from "mobx-react-lite";
import { DictItem } from "src/services/api/CommonApiService";
import { getCurrentMonthNow } from "src/utils/date/currentMonth";
import moment from "moment";
export interface Props {}
export default observer(function NightHoursStatistics() {
  const [searchWord, setSearchWord] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const [date, setDate]: any = useState(getCurrentMonthNow());

  const columns: ColumnProps<any>[] | any = [
    {
      title: "护士工号",
      width: 100,
      dataIndex: "工号",
      align: "center"
    },
    {
      title: "护士姓名",
      width: 100,
      dataIndex: "姓名",
      align: "center"
    },
    {
      title: "总小时数",
      dataIndex: "statusType",
      align: "center",
      width: 100,
      render(text: string, record: any, index: number) {
        let keys = Object.keys(record).filter(
          (item: any) =>
            item !== "工号" &&
            item !== "姓名" &&
            item !== "加班" &&
            item !== "减班" &&
            item !== "key"
        );
        let sum = keys.reduce((total: any, current: any) => {
          total += record[current];
          return total;
        }, 0);
        return sum + Number(record["加班"]) - Number(record["减班"]);
      }
    },
    ...Object.keys(dataSource[0] || {})
      .filter(
        (item: any) =>
          item !== "工号" &&
          item !== "姓名" &&
          item !== "加班" &&
          item !== "减班" &&
          item !== "key"
      )
      .map(item => ({
        title: item,
        width: 100,
        dataIndex: item,
        align: "center"
      })),
    {
      title: "加班",
      dataIndex: "加班",
      align: "center",
      width: 100
    },
    {
      title: "减班",
      dataIndex: "减班",
      align: "center",
      width: 100
    }
  ];

  const getData = () => {
    setPageLoading(true);
    arrangeService
      .schNightHourFindBylist({
        wardCode: authStore.selectedDeptCode,
        empNo: searchWord,
        startDate: date[0] ? moment(date[0]).format("YYYY-MM-DD") : "",
        endDate: date[1] ? moment(date[1]).format("YYYY-MM-DD") : ""
      })
      .then(res => {
        setDataSource(res.data);
        setPageLoading(false);
      });
  };

  const onDetail = (record: any) => {};

  useEffect(() => {
    getData();
  }, [authStore.selectedDeptCode, date, searchWord]);

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>夜小时数统计</PageTitle>
        <Place />
        <span className="label">日期:</span>
        <DatePicker.RangePicker
          allowClear={true}
          style={{ width: 220 }}
          value={date}
          onChange={value => setDate(value)}
        />
        <span className="label">科室:</span>
        <DeptSelect onChange={() => {}} />
        <span className="label">工号姓名:</span>
        <Input
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
          style={{ width: 120 }}
        />

        <Button type="primary" onClick={() => getData()}>
          查询
        </Button>
        {/* <Button type='primary' onClick={() => {}}>
          添加
        </Button>
        <Button>导出</Button> */}
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: "0 15px" }}
        type={["index"]}
        surplusHeight={180}
        surplusWidth={200}
        // pagination={{
        //   current: pageOptions.pageIndex,
        //   pageSize: pageOptions.pageSize,
        //   total: pageOptions.total
        // }}
        // onChange={(pagination: PaginationConfig) => {
        //   setPageOptions({
        //     pageIndex: pagination.current,
        //     pageSize: pagination.pageSize,
        //     total: pagination.total
        //   });
        // }}
        onRow={(record: any) => {
          return { onDoubleClick: () => onDetail(record) };
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
