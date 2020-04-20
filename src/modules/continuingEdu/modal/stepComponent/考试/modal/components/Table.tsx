import styled from "styled-components";
import React from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { quesBankView } from "../QuesBankView";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";

export default observer(function Table() {
  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "题目",
      dataIndex: "questionContent",
      key: "questionContent",
      align: "left"
    },
    {
      title: "类型",
      dataIndex: "questionType",
      key: "questionType",
      align: "center",
      width: 120
    },
    {
      title: "操作",
      dataIndex: "cz",
      key: "8",
      width: 100,
      align: "center",
      render: (text: any, row: any, c: any) => {
        return (
          <DoCon>
            <span onClick={() => {}}>查看</span>
          </DoCon>
        );
      }
    }
  ];

  return (
    <Wrapper>
      <BaseTable
        loading={quesBankView.tableLoading}
        dataSource={quesBankView.tableList}
        columns={columns}
        surplusHeight={480}
        pagination={{
          current: quesBankView.pageIndex,
          total: quesBankView.total,
          pageSize: quesBankView.pageSize
        }}
        onChange={pagination => {
          quesBankView.pageIndex = pagination.current;
          quesBankView.total = pagination.total;
          quesBankView.pageSize = pagination.pageSize;
          quesBankView.onload();
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
