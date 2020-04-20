import styled from "styled-components";
import React from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { quesBankView } from "../QuesBankView";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";

export default observer(function CheckedContent() {
  //类型背景颜色函数封装
  const typeBackground = (data: any) => {
    const background = [
      "#EEFDEE",
      "#FDF8E6",
      "#FCECE9",
      "#EEF1FF",
      "#F0F8F8",
      "#FAEAFB"
    ];
    return background[data - 1];
  };

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
      dataIndex: "teachingObject",
      key: "teachingObject",
      align: "left"
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
