import styled from "styled-components";
import React, { useState, useEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button } from "antd";
import { formReviewModal } from "../FormReviewModal";
import { appStore } from "src/stores";

export interface Props {
  type: string;
  needAudit: boolean;
}

export default function ReviewTable(props: Props) {
  let { type, needAudit } = props;

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
      align: "left"
    },
    {
      title: "提交人",
      dataIndex: "empName",
      align: "center",
      width: 120
    },
    {
      title: "工号",
      dataIndex: "empNo",
      align: "center",
      width: 100
    },
    {
      title: "提交时间",
      dataIndex: "date",
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
      title: "操作",
      dataIndex: "cz",
      width: 100,
      align: "center",
      render: (text: any, record: any) => {
        return (
          <DoCon>
            {needAudit ? (
              <span
                onClick={() => {
                  appStore.history.push(
                    `/continuingEduFormCheck/${record.empNo}`
                  );
                }}
              >
                审核
              </span>
            ) : (
              <span>查看</span>
            )}
          </DoCon>
        );
      }
    }
  ];

  const rowSelection = {};

  return (
    <Wrapper>
      {needAudit && <GroupPostBtn>批量审核</GroupPostBtn>}
      <PostBtn
        onClick={() => {
          formReviewModal.onload();
        }}
      >
        刷新
      </PostBtn>
      <BaseTable
        loading={formReviewModal.tableLoading}
        dataSource={formReviewModal.tableList}
        columns={columns}
        surplusHeight={270}
        rowSelection={needAudit ? rowSelection : false}
        pagination={{
          current: formReviewModal.pageIndex,
          total: formReviewModal.total,
          pageSize: formReviewModal.pageSize
        }}
        onChange={pagination => {
          formReviewModal.pageIndex = pagination.current;
          formReviewModal.total = pagination.total;
          formReviewModal.pageSize = pagination.pageSize;
          formReviewModal.onload();
        }}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div``;

const PostBtn = styled(Button)`
  position: fixed !important;
  top: 109px;
  right: 33px;
`;

const GroupPostBtn = styled(Button)`
  position: fixed !important;
  top: 109px;
  right: 103px;
`;
