import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Modal, message as Message, Button, Input, Checkbox } from "antd";
import YearPicker from "src/components/YearPicker";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { traineeShiftModal } from "../TraineeShiftModal";
import { traineeShiftApi } from "../api/TraineeShiftApi"; // 接口

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function AddTraineeModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [editDataList, setEditDataList]: any = useState([]);

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
      title: "组别",
      dataIndex: "groupNum",
      align: "center",
      width: 80
    },
    {
      title: "操作",
      dataIndex: "isGrouped",
      width: 70,
      align: "center",
      render(text: any, record: any, index: number) {
        return (
          <Checkbox
            key={record.allGroupCode}
            disabled={record.groupId}
            checked={!!text}
            onChange={(e: any) => {
              record.isGrouped = e.target.checked ? 1 : 0;
              setEditDataList(
                traineeShiftModal.allGroupTableList.filter(
                  (item: any) => item.isGrouped && !item.groupId
                )
              );
              const arrOne = traineeShiftModal.allGroupTableList;
              arrOne.map((item: any) => (item.isCheck = false));
              traineeShiftModal.allGroupTableList = [];
              traineeShiftModal.allGroupTableList = arrOne;
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
    setEditLoading(true);
    let obj: any = {
      groupId: traineeShiftModal.groupId,
      sheetId: traineeShiftModal.sheetId,
      rotatePersonsList: editDataList
    };
    setEditLoading(true);
    traineeShiftApi
      .saveAllRotatePersons(obj)
      .then(res => {
        setEditLoading(false);
        if (res.code == 200) {
          Message.success("保存成功");
          onOk();
          traineeShiftModal.groupOnload();
        } else {
          Message.error(`${res.dec}`);
        }
      })
      .catch(e => {
        setEditLoading(false);
      });
  };

  // 关闭取消
  const handleCancel = async () => {
    if (editLoading) return;
    await (onCancel && onCancel());
    traineeShiftModal.allGroupKeyWord = "";
  };

  return (
    <Modal
      width="800px"
      visible={visible}
      onCancel={handleCancel}
      title="添加实习生"
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => handleCancel()}>取消</Button>
          <Button
            type="primary"
            loading={editLoading}
            onClick={() => checkForm()}
          >
            保存
          </Button>
        </div>
      }
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
            placeholder="请输入姓名关键字进行检索"
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
          surplusHeight={380}
          // pagination={{
          //   current: traineeShiftModal.pageIndex,
          //   total: traineeShiftModal.total,
          //   pageSize: traineeShiftModal.pageSize
          // }}
          // onChange={(pagination: any) => {
          //   traineeShiftModal.pageIndex = pagination.current;
          //   traineeShiftModal.total = pagination.total;
          //   traineeShiftModal.pageSize = pagination.pageSize;
          //   traineeShiftModal.allGroupOnload();
          // }}
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
