import styled from "styled-components";
import React from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { observer } from "src/vendors/mobx-react-lite";
import { appStore } from "src/stores";
import { onlineLearningModal } from "../OnlineLearningModal";

export interface Props {
}

export default observer(function Table(props: Props) {
  const columns: any = [
    {
      title: "序号",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 200,
      align: "left"
    },
    {
      title: "提交时间",
      dataIndex: "startTime",
      width: 150,
      align: "center"
    },
    {
      title: "提交人",
      dataIndex: "endTime",
      width: 150,
      align: "center"
    },
    {
      title: "所在科室",
      dataIndex: "teachingTypeName",
      width: 120,
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "taskStatusDesc",
      width: 100,
      align: "center",
      render(text: string) {
        let color = text === "完成" ? "rgba(0, 0, 0, 0.65)" : "red";
        return <span style={{ color }}>{text}</span>;
      }
    },
    {
      title: "操作",
      dataIndex: "tpStatus",
      width: 100,
      align: "center",
      render(text: any, record: any) {
        let btnName =
          text === "tobegin"
            ? `待${record.teachingMethodName}`
            : text === "finished"
            ? "查看"
            : `去${record.teachingMethodName}`;
        return (
          <DoCon>
            <span onClick={() => handleStudy(record)}>{btnName}</span>
          </DoCon>
        );
      }
    }
  ];

  //查看 学习
  const handleStudy = (record: any) => {
    appStore.history.push(
      `/onlineLearningReview?id=${record.cetpId}&onlineLearningName=${
        record.teachingMethodName
      }`
    );
  };

  return (
    <Wrapper>
      <BaseTable
        loading={onlineLearningModal.tableLoading}
        dataSource={onlineLearningModal.tableList}
        columns={columns}
        surplusWidth={250}
        surplusHeight={280}
        pagination={{
          current: onlineLearningModal.pageIndex,
          total: onlineLearningModal.total,
          pageSize: onlineLearningModal.pageSize
        }}
        onChange={pagination => {
          onlineLearningModal.pageIndex = pagination.current;
          onlineLearningModal.total = pagination.total;
          onlineLearningModal.pageSize = pagination.pageSize;
          onlineLearningModal.onload();
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div`
  .teachingMethod-name {
    position: relative;
    .teachingMethod-item {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      span {
        cursor: default;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;
