import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Modal, message as Message } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { stepViewModal } from "../../StepViewModal";
import { videoInsertionApi } from "./api/VideoInsertionApi";
import QuestionListModal from "./modal/QuestionListModal";
export interface Props {}

export default function VideoInsertion() {
  const [tableList, setTableList] = useState([]); // 表格数据
  const [tableLoading, setTableLoading] = useState(false); //表格loading
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态

  //初始化
  useLayoutEffect(() => {
    getData();
  }, []);

  // 获取表格数据
  const getData = () => {
    let obj: any = {};
    setTableLoading(true),
      videoInsertionApi
        .getAllVideoList(stepViewModal.taskCode)
        .then((res: any) => {
          setTableLoading(false);
          setTableList(res.data);
        });
  };

  // 删除
  const handleDelete = (record: any) => {
    let obj: any = {
      attachmentId: record.attachmentId,
      taskCode: stepViewModal.taskCode
    };
    let content = (
      <div>
        <div>该视频已添加插入的考题，若删除视频将会清空视频插入的考题</div>
        <div>您确定要删除该条视频吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        videoInsertionApi
          .deleteAllQuestions(obj)
          .then(res => {
            if (res.code == 200) {
              Message.success("文件删除成功");
              getData();
            } else {
              Message.warning(`${res.desc}`);
            }
          })
          .catch(err => {
            Message.error("文件删除失败");
          });
      }
    });
  };

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 60
    },
    {
      title: "视频标题",
      dataIndex: "title",
      key: "title",
      align: "left"
    },
    {
      title: "插入题数",
      dataIndex: "questionCount",
      key: "questionCount",
      align: "center",
      width: 100
    },
    {
      title: "操作",
      dataIndex: "caozuo",
      key: "caozuo",
      align: "center",
      width: 180,
      render(text: any, record: any) {
        return (
          <DoCon>
            <span>查看</span>
            <span onClick={() => setEditVisible(true)}>修改</span>
            <span onClick={() => handleDelete(record)}>删除</span>
          </DoCon>
        );
      }
    }
  ];

  useEffect(() => {
    console.log(
      stepViewModal.stepData4.attachmentIds,
      stepViewModal.taskCode,
      "attachmentIds"
    );
  }, [stepViewModal.stepData4.attachmentIds.length]);

  return (
    <Wrapper>
      <div>
        <span>视频插题：</span>
        <Button type="primary" onClick={() => setEditVisible(true)}>
          添加
        </Button>
      </div>
      <BaseTable
        loading={tableLoading}
        dataSource={tableList}
        columns={columns}
        surplusHeight={200}
      />
      <QuestionListModal
        visible={editVisible}
        onCancel={() => setEditVisible(false)}
        onOk={() => {
          setEditVisible(false);
          getData();
        }}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-top: 20px;
`;
