import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Modal, message as Message, Button, Input, Checkbox } from "antd";
import YearPicker from "src/components/YearPicker";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { traineeShiftModal } from "../TraineeShiftModal";

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function AddTraineeModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const editDataList: any = [];

  // 表格数据
  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "实习编号",
      dataIndex: "empNo",
      width: 90,
      align: "center"
    },
    {
      title: "姓名",
      dataIndex: "empName",
      width: 90,
      align: "center"
    },
    {
      title: "性别",
      dataIndex: "sex",
      width: 60,
      align: "center"
    },
    {
      title: "进修时间",
      dataIndex: "进修时间",
      width: 140,
      align: "center",
      render(text: any, record: any) {
        return `${record.internshipBegin} ~ ${record.internshipEnd}`;
      }
    },
    {
      title: "操作",
      dataIndex: "操作",
      width: 70,
      align: "center",
      render(text: any, record: any, index: number) {
        return (
          <Checkbox
            key={record.allGroupCode}
            defaultChecked={false}
            onChange={(e: any) => {
              if (e.target.checked) editDataList.push(record);
            }}
          />
        );
      }
    }
  ];

  //初始化表格数据
  useEffect(() => {
    if (visible) traineeShiftModal.allGroupOnload();
  }, [visible, traineeShiftModal.sheetId]);

  // 保存
  const checkForm = () => {
    let arr: any = [];
    let obj: any = {};
    setEditLoading(true);
    arr = [...traineeShiftModal.groupTableCopyList, ...editDataList].reduce(
      (item: any, next: any) => {
        obj[next.empNo] ? " " : (obj[next.empNo] = true && item.push(next));
        return item;
      },
      []
    );
    traineeShiftModal.groupTableList = arr;
    traineeShiftModal.groupTableCopyList = arr;
    setEditLoading(false);
    Message.success("添加成功");
    onOk();
  };

  // 关闭取消
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      width="800px"
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title="添加实习生"
    >
      <Wrapper>
        <ModalHeader>
          <span>年份：</span>
          <YearPicker
            allowClear={false}
            style={{ width: 120 }}
            value={traineeShiftModal.selectedYear}
            onChange={(year: any) => {
              traineeShiftModal.selectedYear = year;
              traineeShiftModal.allGroupOnload();
            }}
          />
          <Input
            style={{ width: 280, marginLeft: 20 }}
            placeholder="请输关键字进行检索"
            value={traineeShiftModal.allGroupKeyWord}
            onChange={(e: any) => {
              traineeShiftModal.allGroupKeyWord = e.target.value;
            }}
          />
          <Button
            type="primary"
            style={{ margin: "0 20px 0 15px" }}
            onClick={() => {
              traineeShiftModal.allGroupOnload();
            }}
          >
            查询
          </Button>
        </ModalHeader>
        <BaseTable
          loading={traineeShiftModal.groupTableLoading}
          dataSource={traineeShiftModal.allGroupTableList}
          columns={columns}
          surplusHeight={370}
          pagination={{
            current: traineeShiftModal.pageIndex,
            total: traineeShiftModal.total,
            pageSize: traineeShiftModal.pageSize
          }}
          onChange={(pagination: any) => {
            traineeShiftModal.pageIndex = pagination.current;
            traineeShiftModal.total = pagination.total;
            traineeShiftModal.pageSize = pagination.pageSize;
            traineeShiftModal.allGroupOnload();
          }}
        />
      </Wrapper>
    </Modal>
  );
});
const Wrapper = styled.div`
  width: 98%;
  margin: 0 auto;
`;
const ModalHeader = styled.div``;
