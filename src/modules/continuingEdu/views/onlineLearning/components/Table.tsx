import styled from "styled-components";
import React, { useState, useEffect } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { message as Message, Modal } from "src/vendors/antd";
import { observer } from "src/vendors/mobx-react-lite";
import { appStore, authStore } from "src/stores";
import { onlineLearningModal } from "../OnlineLearningModal";

export interface Props {}

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
      title: "开始时间",
      dataIndex: "startTime",
      width: 150,
      align: "center"
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      width: 150,
      align: "center"
    },
    {
      title: "类型",
      dataIndex: "teachingTypeName",
      width: 120,
      align: "center"
    },
    {
      title: "教学方法",
      dataIndex: "teachingMethodName",
      width: 80,
      align: "center",
      className: "teachingMethod-name",
      render: (text: string) => {
        let bgColor = "";
        let textColor = "";
        switch (text) {
          case "学习":
            bgColor = "#EEFDEE";
            textColor = "#4CA21D";
            break;
          case "培训":
            bgColor = "#FDF8E6";
            textColor = "#DD7316";
            break;
          case "考试":
            bgColor = "#FCECE9";
            textColor = "#EA3838";
            break;
          case "练习":
            bgColor = "#EEF1FF";
            textColor = "#2754A8";
            break;
          case "实操":
            bgColor = "#F0F8F8";
            textColor = "#006667";
            break;
          case "演练":
            bgColor = "#FAEAFB";
            textColor = "#AB2892";
            break;
          default:
        }
        return (
          <div
            className="teachingMethod-item"
            style={{ backgroundColor: bgColor }}
          >
            <span style={{ color: textColor }}>{text}</span>
          </div>
        );
      }
    },
    {
      title: "组织方式",
      dataIndex: "organizationWayName",
      width: 80,
      align: "center"
    },
    {
      title: "剩余时间",
      dataIndex: "remainingTimeDes",
      width: 100,
      align: "center",
      render(text: any) {
        let color: any = text.includes("天") ? "rgba(0, 0, 0, 0.65)" : "red";
        return <span style={{ color }}>{text}</span>;
      }
    },
    {
      title: "课件",
      dataIndex: "coursewareCount",
      width: 80,
      align: "center"
    },
    {
      title: "视频",
      dataIndex: "videoCount",
      width: 80,
      align: "center"
    },
    {
      title: "题库（题）",
      dataIndex: "questionCount",
      width: 80,
      align: "center"
    },
    {
      title: "学分",
      dataIndex: "studentCredit",
      width: 80,
      align: "center"
    },
    {
      title: "学时",
      dataIndex: "studentClassHours",
      width: 80,
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
          text === "finished" ? "查看" : `去${record.teachingMethodName}`;
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
    appStore.history.push(`/onlineLearningReview?id=${record.cetpId}`);
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
