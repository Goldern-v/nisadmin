import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
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
export interface Props {}
export default observer(function 教学计划() {
  const [dataSource, setDataSource] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      render(text: string, record: any, index: number) {
        return index + 1;
      }
    },
    {
      title: "开始时间"
    },
    {
      title: "结束时间"
    },
    {
      title: "类型"
    },
    {
      title: "标题"
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
    // qcOneService
    //   .qcSafetyCheckGetPage({
    //     ...pageOptions,
    //     wardCode: authStore.selectedDeptCode
    //   })
    //   .then(res => {
    //     setTotal(res.data.totalCount);
    //     setDataSource(res.data.list);
    //     setPageLoading(false);
    //   });
  };

  const onDetail = (record: any) => {};
  useEffect(() => {
    getData();
  }, [pageOptions.pageIndex, pageOptions.pageSize]);

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>安全隐患排查表</PageTitle>
        <Place />
        <span className="label">开始时间:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} />
        <span className="label">类型:</span>
        <Select>{/* <Select.Option>123</Select.Option> */}</Select>
        <span className="label">状态:</span>
        <Select>{/* <Select.Option>123</Select.Option> */}</Select>
        <Input
          style={{ width: 150, marginLeft: 15, marginRight: -10 }}
          placeholder="请输入要搜索的关键字"
        />
        <Button onClick={() => getData()}>查询</Button>
        <Button>导出</Button>
        <Button>类型管理</Button>
        <Button type="primary">添加记录</Button>
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
