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
import createModal from "src/libs/createModal";
import AddTypeModal from "./modal/AddTypeModal";
export interface Props {}
export default observer(function 类型管理() {
  const [dataSource, setDataSource] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const addTypeModal = createModal(AddTypeModal);
  const columns: ColumnProps<any>[] = [
    {
      title: "名称"
    },
    {
      title: "教学方式"
    },
    {
      title: "显示顺序"
    },
    {
      title: "操作",
      width: 100,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span>修改</span>
            <span>删除</span>
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
        <PageTitle>类型管理</PageTitle>
        <Place />

        <Button onClick={() => getData()}>查询</Button>
        <Button
          type="primary"
          onClick={() => {
            addTypeModal.show();
          }}
        >
          添加类型
        </Button>
        <Button>返回</Button>
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
      <addTypeModal.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
