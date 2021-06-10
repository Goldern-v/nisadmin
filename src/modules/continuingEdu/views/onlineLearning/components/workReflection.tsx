import styled from "styled-components";
import React, { useEffect, useState } from "react";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { observer } from "src/vendors/mobx-react-lite";
import { appStore } from "src/stores";
import { onlineLearningModal } from "../OnlineLearningModal";
import EditModal from './workReflectionModal'

export interface Props {
  handleNew: number
}

export default observer(function Table(props: Props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalId, setModalId] = useState("")
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
      dataIndex: "submitTime",
      width: 150,
      align: "center"
    },
    {
      title: "提交人",
      dataIndex: "empName",
      width: 150,
      align: "center"
    },
    {
      title: "所在科室",
      dataIndex: "deptName",
      width: 120,
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "statusDesc",
      width: 100,
      align: "center",
      render(text: string) {
        const map: any = {
          '审核中': '#F59A23',
          '驳回': '#D9001B',
          '审核通过': '#02A7F0',
        }
        let color = map[text]
        return <span style={{ color }}>{text}</span>;
      }
    },
    {
      title: "操作",
      dataIndex: "tpStatus",
      width: 100,
      align: "center",
      render(text: any, record: any) {
        return (
          <DoCon>
            <span onClick={() => handleView(record)}>查看</span>
          </DoCon>
        );
      }
    }
  ];

  //查看 学习
  const handleView = (record: any) => {
    setModalId(record.id)
    setModalVisible(true)
  };

  const onOk = async () => {
    setModalVisible(false)
    await onlineLearningModal.onload()
  }

  useEffect(() => {
    if (props.handleNew) {
      setModalId('')
      setModalVisible(true)
    }
  }, [props.handleNew])

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
      <EditModal visible={modalVisible} modalId={modalId} onOk={onOk} onCancel={() => setModalVisible(false)}/>
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
