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
import { appStore, authStore } from "src/stores";
import BaseTable from "src/components/BaseTable";
import { useCallback } from "src/types/react";
import { DoCon } from "src/components/BaseTable";
import { observer } from "mobx-react-lite";
import { DictItem } from "src/services/api/CommonApiService";
import { arrangeService } from "../../services/ArrangeService";
export interface Props {}
export default observer(function LeaveRecord() {
  const [dataSource, setDataSource] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const columns: ColumnProps<any>[] = [
    {
      title: "日期",
      dataIndex: "recordDate",
      render(text: string, record: any, index: number) {
        return text ? text.split(" ")[0] : "";
      }
    },
    {
      title: "时间"
    },
    {
      title: "问题种类"
    },
    {
      title: "详情"
    },
    {
      title: "创建人"
    },
    {
      title: "创建时间"
    },
    {
      title: "操作",
      width: 100,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDetail(record)}>查看详情</span>
          </DoCon>
        );
      }
    }
  ];

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  });
  const [total, setTotal]: any = useState(0);
  const getData = () => {
    setPageLoading(true);
    arrangeService
      .schVacationGetList({
        ...pageOptions,
        wardCode: authStore.selectedDeptCode
      })
      .then(res => {
        setTotal(res.data.totalCount);
        setDataSource(res.data.list);
        setPageLoading(false);
      });
  };

  const onDetail = (record: any) => {};
  useEffect(() => {
    getData();
  }, [pageOptions.pageIndex, pageOptions.pageSize]);

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>休假记录查询</PageTitle>
        <Place />
        <span className="label">日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} />
        <span className="label">科室:</span>
        <DeptSelect onChange={() => {}} />
        <span className="label">护士:</span>
        <Select>{/* <Select.Option>123</Select.Option> */}</Select>
        <Button onClick={() => getData()}>查询</Button>
        <Button type="primary" onClick={() => {}}>
          添加
        </Button>
        <Button>导出</Button>
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: "0 15px" }}
        type={["index", "fixedIndex"]}
        surplusWidth={200}
        surplusHeight={220}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: total
        }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
          });
        }}
        onRow={(record: any) => {
          return { onDoubleClick: () => onDetail(record) };
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
