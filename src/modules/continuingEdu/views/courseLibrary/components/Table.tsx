import { observer } from "mobx-react";
import React from "react";
import BaseTable from "src/components/BaseTable";
import styled from "styled-components";
import { courseLibraryModal } from "../modal";
import Moment from "moment";
import { Button } from "antd";

export interface Props {
  onOpenDetail: (item: any, key: number) => void;
  onDeleteItem: (item: any) => void;
}
export default observer(function Table(props: Props) {
  const { onOpenDetail, onDeleteItem } = props;
  const columns: any[] = [
    {
      title: "序号",
      align: "center",
      render: (text: any, record: any, index: number) => index + 1,
      width: 50,
    },
    {
      title: "上传时间",
      align: "center",
      dataIndex: "uploadDate",
      render: (text: string) => {
        return Moment(new Date(text)).format("YYYY-MM-DD HH:mm:ss");
      },
      width: 120,
    },
    {
      title: "名称",
      align: "center",
      dataIndex: "courseName",
      width: 120,
    },
    {
      title: "课件类型",
      align: "center",
      dataIndex: "courseType",
      width: 70,
    },
    {
      title: "所属科室",
      align: "center",
      dataIndex: "deptName",
      width: 120,
    },
    {
      title: "上传人",
      align: "center",
      dataIndex: "empName",
      width: 80,
    },
    {
      title: "观看时长",
      align: "center",
      dataIndex: "viewingTime",
      render: (text: number) => {
        // if (text < 60) return text + 's'
        return text;
      },
      width: 70,
    },
    {
      title: "允许下载",
      align: "center",
      dataIndex: "isDownload",
      render: (text: any) => {
        return <span>{text ? "√" : "×"}</span>;
      },
      width: 70,
    },
    {
      title: "状态",
      align: "center",
      dataIndex: "state",
      render: (text: number) => {
        const arr = ["全院可见", "授权可见", "自己可见"];
        let color = "#000";
        if (text === 1) {
          color = "#03B615";
        }
        return <span style={{ color }}>{arr[text - 1]}</span>;
      },
      width: 70,
    },
    {
      title: "备注",
      align: "center",
      dataIndex: "remark",
      width: 150,
    },
    {
      title: "操作",
      align: "center",
      dataIndex: "",
      width: 130,
      render: (text: any, item: any) => {
        return (
          <ButtonBox>
            <span onClick={() => onOpenDetail(item, 2)}>查看</span>
            <span onClick={() => onOpenDetail(item, 1)}>修改</span>
            <span onClick={() => onDeleteItem(item)}>删除</span>
          </ButtonBox>
        );
      },
    },
  ];
  return (
    <Wrapper>
      <BaseTable
        loading={courseLibraryModal.tableLoading}
        dataSource={courseLibraryModal.tableList}
        columns={columns}
        surplusWidth={250}
        surplusHeight={280}
        pagination={{
          current: courseLibraryModal.page,
          total: courseLibraryModal.total,
          pageSize: courseLibraryModal.pageSize,
        }}
        onChange={(pagination) => {
          courseLibraryModal.page = pagination.current;
          courseLibraryModal.total = pagination.total;
          courseLibraryModal.pageSize = pagination.pageSize;
          courseLibraryModal.getData();
        }}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div``;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  > span {
    cursor: pointer;
    color: ${(p) => p.theme.$mtc};
  }
`;
