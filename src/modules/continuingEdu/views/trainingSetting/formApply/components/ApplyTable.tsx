import styled from "styled-components";
import React, { useState, useEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button } from "antd";
import { formApplyModal } from "../FormApplyModal";

interface Props {
  getTitle: any;
}

export default function ApplyTable(props: Props) {
  const { getTitle } = props; //获取当前页面标题

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "标题",
      dataIndex: "title",
      align: "center"
    },
    {
      title: "创建时间",
      dataIndex: "starDate",
      align: "center",
      width: 190
    },
    {
      title: "提交时间",
      dataIndex: "endDate",
      align: "center",
      width: 190
    },
    {
      title: "状态",
      dataIndex: "state",
      width: 160,
      align: "center"
    },
    {
      title: "备注",
      dataIndex: "world",
      align: "left",
      width: 230
    },
    {
      title: "操作",
      dataIndex: "cz",
      width: 150,
      align: "center",
      render: (text: any, row: any) => {
        return (
          <DoCon>
            <span>审核</span>
          </DoCon>
        );
      }
    }
  ];

  return (
    <Wrapper>
      <BaseTable
        loading={formApplyModal.tableLoading}
        dataSource={formApplyModal.tableList}
        columns={columns}
        surplusHeight={230}
        pagination={{
          current: formApplyModal.pageIndex,
          total: formApplyModal.total,
          pageSize: formApplyModal.pageSize
        }}
        onChange={pagination => {
          formApplyModal.pageIndex = pagination.current;
          formApplyModal.total = pagination.total;
          formApplyModal.pageSize = pagination.pageSize;
          formApplyModal.onload();
        }}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 0 20px;
  box-sizing: border-box;
`;
