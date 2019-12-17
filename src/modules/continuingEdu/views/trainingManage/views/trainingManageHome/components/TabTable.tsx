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
export interface Props {
  tableObj: any;
  setTableObj: any;
}
export default observer(function TabTable(props: Props) {
  let { pageIndex, pageSize, total, dataSource, pageLoading } = props.tableObj;

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

  const onDetail = (record: any) => {};

  return (
    <Wrapper>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: "0 15px" }}
        type={["index", "fixedIndex"]}
        surplusWidth={200}
        surplusHeight={220}
        pagination={{
          current: pageIndex,
          pageSize: pageSize,
          total: total
        }}
        onChange={(pagination: PaginationConfig) => {
          // setPageOptions({
          //   pageIndex: pagination.current,
          //   pageSize: pagination.pageSize
          // });
        }}
        onRow={(record: any) => {
          return { onDoubleClick: () => onDetail(record) };
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
