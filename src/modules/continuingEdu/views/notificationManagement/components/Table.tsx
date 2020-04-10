import styled from "styled-components";
import React from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { notificationModal } from "../NotificationModal";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";

export default observer(function Table() {
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
      width: 40
    },
    {
      title: "教学对象",
      dataIndex: "teachingObject",
      key: "teachingObject",
      align: "left",
      width: 120
    },
    {
      title: "分类",
      dataIndex: "group",
      key: "group",
      align: "left",
      width: 120
    },
    {
      title: "名称",
      dataIndex: "title",
      key: "title",
      align: "left",
      width: 300
    },
    {
      title: "类型",
      dataIndex: "teachingMethod",
      key: "teachingMethod",
      width: 80,
      align: "center",
      onCell: (record: any, rowIndex: any) => ({
        style: {
          backgroundColor: typeBackground(record.teachingMethod)
        }
      }),
      render(teachingMethod: any, record: any) {
        //1.学习、2培训、3考试、4练习、5实操、6演练
        const teachingMethodArray = [
          "学习",
          "培训",
          "考试",
          "练习",
          "实操",
          "演练"
        ];
        const color = [
          "#4CA21D",
          "#DD7316",
          "#EA3838",
          "#2754A8",
          "#006667",
          "#AB2892"
        ];
        return (
          <span
            style={{
              color: color[teachingMethod - 1]
            }}
          >
            {teachingMethodArray[teachingMethod - 1]}
          </span>
        );
      }
    },
    {
      title: "状态",
      dataIndex: "statusName",
      key: "statusName",
      width: 90,
      align: "center",
      render: (text: string) => {
        let color = "";
        switch (text) {
          case "已发送":
            color = "#284fc2";
            break;
          case "未发送":
            color = "#E63122";
            break;
          default:
        }
        return <span style={{ color }}>{text}</span>;
      }
    },
    {
      title: "发布时间",
      dataIndex: "publishTime",
      key: "publishTime",
      width: 140,
      align: "center"
    },
    {
      title: "推送时间",
      dataIndex: "sendMessageTime",
      key: "sendMessageTime",
      width: 140,
      align: "center"
    },
    {
      title: "绑定(人)",
      dataIndex: "participantsCount",
      key: "participantsCount",
      width: 70,
      align: "center"
    },
    {
      title: "内容",
      dataIndex: "noticeContent",
      key: "noticeContent5",
      width: 200,
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
            <span
              onClick={() => {
                // console.log(row, "0000000");
                appStore.history.push(
                  `/notificationManagement?title=${row.title}&cetpId=${
                    row.cetpId
                  }&noticeContent=${row.noticeContent}`
                );
              }}
            >
              查看结果
            </span>
          </DoCon>
        );
      }
    }
  ];

  return (
    <Wrapper>
      <BaseTable
        loading={notificationModal.tableLoading}
        dataSource={notificationModal.tableList}
        columns={columns}
        surplusWidth={300}
        surplusHeight={230}
        pagination={{
          current: notificationModal.pageIndex,
          total: notificationModal.total,
          pageSize: notificationModal.pageSize
        }}
        onChange={pagination => {
          notificationModal.pageIndex = pagination.current;
          notificationModal.total = pagination.total;
          notificationModal.pageSize = pagination.pageSize;
          notificationModal.onload();
        }}
      />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
