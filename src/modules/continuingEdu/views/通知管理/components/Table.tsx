import styled from "styled-components";
import React from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { message as Message, Modal } from "src/vendors/antd";
import { observer } from "src/vendors/mobx-react-lite";
// import { mainPageModal } from "../MainPageModal";
// import { mainPageApi } from "../api/MainPageApi";
import { appStore } from "src/stores";

interface Props {
  getId: any;
}

export default observer(function Table(props: Props) {
  let id = props.getId || "";

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      // render: (text: any, record: any, index: number) =>
      //   (current - 1) * pageSize + index + 1,
      align: "center",
      width: 40
    },
    {
      title: "教学对象",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: 90
    },
    {
      title: "内容",
      dataIndex: "message",
      key: "message",
      align: "left",
      width: 250
    },
    {
      title: "分类",
      dataIndex: "wardName",
      key: "wardName",
      align: "left",
      width: 150
    },
    {
      title: "名称",
      dataIndex: "statusDesc",
      key: "statusDesc",
      align: "center",
      width: 100
    },

    {
      title: "类型",
      dataIndex: "commiterName",
      key: "commiterName",
      width: 100,
      align: "center"
    },
    {
      title: "定时时间",
      dataIndex: "commitTime",
      key: "commitTime",
      width: 130,
      align: "center"
    },
    {
      title: "推送时间",
      dataIndex: "commitTime",
      key: "commitTime",
      width: 130,
      align: "center"
    },
    {
      title: "绑定",
      dataIndex: "commitTime",
      key: "commitTime",
      width: 130,
      align: "center"
    },
    {
      title: "内容",
      dataIndex: "commitTime",
      key: "commitTime",
      width: 130,
      align: "center"
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
            <span>查看结果</span>
          </DoCon>
        );
      }
    }
  ];

  return (
    <Wrapper>
      <BaseTable
        // loading={mainPageModal.tableLoading}
        // dataSource={mainPageModal.tableList}
        columns={columns}
        surplusWidth={300}
        surplusHeight={270}
        type={["index"]}
        // pagination={{
        //   current: mainPageModal.pageIndex,
        //   total: mainPageModal.total,
        //   pageSize: mainPageModal.pageSize
        // }}
        // onChange={pagination => {
        //   mainPageModal.pageIndex = pagination.current;
        //   mainPageModal.total = pagination.total;
        //   mainPageModal.pageSize = pagination.pageSize;
        //   mainPageModal.onload();
        // }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
