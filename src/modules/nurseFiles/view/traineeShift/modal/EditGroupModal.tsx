import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Modal, message as Message, InputNumber, Button, Select } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { traineeShiftApi } from "../api/TraineeShiftApi"; // 接口
import { traineeShiftModal } from "../TraineeShiftModal";
import AddTraineeModal from "./AddTraineeModal"; // 添加修改弹窗

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function EditGroupModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [groupStype, setGroupStype] = useState("全部"); //分组情况
  const [groupName, setGroupName] = useState("全部"); //小组
  const [editLoading, setEditLoading] = useState(false);
  const [editTraineeBtn, setEditTraineeBtn] = useState(false); //添加实习生弹窗
  const groupTypeList = [
    { name: "全部", code: "全部" },
    { name: 1, code: 1 },
    { name: 2, code: 2 },
    { name: 3, code: 3 },
    { name: 4, code: 4 },
    { name: 5, code: 5 },
    { name: 6, code: 6 },
    { name: 7, code: 7 },
    { name: 8, code: 8 },
    { name: 9, code: 9 },
    { name: 10, code: 10 },
    { name: 11, code: 11 },
    { name: 12, code: 12 },
    { name: 13, code: 13 },
    { name: 13, code: 13 },
    { name: 14, code: 14 },
    { name: 15, code: 15 },
    { name: 16, code: 16 },
    { name: 17, code: 17 },
    { name: 18, code: 18 },
    { name: 19, code: 19 },
    { name: 20, code: 20 },
    { name: 21, code: 21 },
    { name: 22, code: 22 },
    { name: 23, code: 23 },
    { name: 24, code: 24 },
    { name: 25, code: 25 },
    { name: 26, code: 26 },
    { name: 27, code: 27 },
    { name: 28, code: 28 },
    { name: 29, code: 29 },
    { name: 30, code: 30 }
  ]; //小组下拉选项

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
      title: "姓名",
      dataIndex: "empName",
      width: 120,
      align: "center"
    },
    {
      title: "性别",
      dataIndex: "sex",
      width: 60,
      align: "center"
    },
    {
      title: "分组",
      dataIndex: "groupNum",
      align: "center",
      width: 80,
      render(text: any, record: any, index: number) {
        return (
          <InputNumber
            className="specialInput"
            min={1}
            value={text}
            key={record.empNo}
            onChange={(val: any) => {
              record.groupNum = val;
              updateData(record);
            }}
          />
        );
      }
    },
    {
      title: "操作",
      key: "cz",
      width: 80,
      render(text: any, record: any) {
        return (
          <DoCon>
            <span onClick={() => handleDelete(record.empNo)}>删除</span>
          </DoCon>
        );
      }
    }
  ];

  //初始化表格数据
  useEffect(() => {
    if (visible) traineeShiftModal.groupOnload();
  }, [visible]);

  //初始化筛选条件
  const initValue = () => {
    setGroupStype("全部"); //分组情况
    setGroupName("全部");
  };

  // 筛选展示数据
  const showTableData = () => {
    setEditLoading(true);
    let showData: any = traineeShiftModal.groupTableList.filter((item: any) => {
      if (groupStype === "全部") {
        if (groupName === "全部") {
          return true;
        }
        return item.groupNum == groupName;
      } else if (groupStype === "已分组") {
        if (groupName === "全部") {
          return item.groupNum;
        }
        return item.groupNum && item.groupNum == groupName;
      } else {
        if (groupName === "全部") {
          return !item.groupNum;
        }
        return !item.groupNum && item.groupNum == groupName;
      }
    });
    traineeShiftModal.groupTableCopyList = showData;
    setEditLoading(false);
  };

  // 函数
  const updateData = (record: any) => {
    const dataIndexOne: any = traineeShiftModal.groupTableList.findIndex(
      (obj: any) => record.empNo === obj.empNo
    );
    traineeShiftModal.groupTableList[dataIndexOne] = record;
    const arrOne = traineeShiftModal.groupTableList.slice();
    traineeShiftModal.groupTableList = [];
    traineeShiftModal.groupTableList = arrOne;
    showTableData();
  };

  // 删除
  const handleDelete = (empNo: any) => {
    traineeShiftModal.groupTableList = traineeShiftModal.groupTableList.filter(
      (item: any) => item.empNo != empNo
    );
    showTableData();
    Message.success("删除成功！");
  };

  // 保存
  const checkForm = async () => {
    let content = (
      <div>
        <div> 未进行分组的实习生将不存入轮科小组</div>确认保存吗？
      </div>
    );
    let isHaveNoGroup: any = traineeShiftModal.groupTableList.find(
      (item: any) => !item.groupNum
    );
    if (isHaveNoGroup) {
      Modal.confirm({
        title: "提示",
        content,
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk: () => saveData()
      });
    } else {
      saveData();
    }
    initValue();
  };
  const saveData = () => {
    const realData: any = traineeShiftModal.groupTableList.filter(
      (item: any) => item.groupNum
    );
    let obj: any = {
      sheetId: traineeShiftModal.sheetId,
      rotatePersonsList: realData
    };
    setEditLoading(true);
    traineeShiftApi
      .saveAllRotatePersons(obj)
      .then(res => {
        setEditLoading(false);
        if (res.code == 200) {
          Message.success("保存成功");
          onOk();
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
    initValue();
  };

  // 取消实习生轮科弹窗
  const handleEditCancel = () => {
    setEditTraineeBtn(false);
  };
  const handleEditOk = () => {
    handleEditCancel();
  };

  return (
    <Modal
      width="600px"
      visible={visible}
      onCancel={handleCancel}
      forceRender={true}
      title="编辑实习小组"
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
          <LeftIcon>
            <span style={{ marginLeft: "15px" }}>分组情况：</span>
            <Select
              style={{ width: 90 }}
              value={groupStype}
              onChange={(value: any) => {
                setGroupStype(value);
              }}
            >
              <Select.Option value="全部">全部</Select.Option>
              <Select.Option value="已分组">已分组</Select.Option>
              <Select.Option value="未分组">未分组</Select.Option>
            </Select>
            {groupStype !== "未分组" && (
              <div style={{ display: "inline-block" }}>
                <span style={{ marginLeft: "15px" }}>小组：</span>
                <Select
                  style={{ width: 80 }}
                  value={groupName}
                  onChange={(value: any) => {
                    setGroupName(value);
                  }}
                >
                  {groupTypeList.map(item => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            )}
            <Button
              type="primary"
              style={{ marginLeft: "10px" }}
              onClick={() => showTableData()}
            >
              查询
            </Button>
          </LeftIcon>
          <RightIcon>
            <Button
              style={{ marginRight: "15px" }}
              onClick={() => setEditTraineeBtn(true)}
            >
              添加实习生
            </Button>
          </RightIcon>
        </ModalHeader>
        <BaseTable
          loading={traineeShiftModal.groupTableLoading}
          dataSource={traineeShiftModal.groupTableCopyList}
          columns={columns}
          surplusHeight={370}
        />
        <AddTraineeModal
          visible={editTraineeBtn}
          onCancel={handleEditCancel}
          onOk={handleEditOk}
        />
      </Wrapper>
    </Modal>
  );
});
const Wrapper = styled.div`
  width: 98%;
  margin: 0 auto;
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
  .specialInput {
    border: 0 !important;
    border-radius: 0 !important;
    text-align: center !important;
    outline: 0 !important;
    box-shadow: none !important;
    padding: 4px !important;
  }
  .specialMargin {
    margin-left: 255px;
  }
  .normalMargin {
    margin-left: 115px;
  }
  .ant-input-number-input {
    text-align: center !important;
    height: 25px;
  }

  .ant-input-number-handler-up:hover {
    height: 50% !important;
  }
`;
const ModalHeader = styled.div`
  height: 35px;
`;
const LeftIcon = styled.div`
  float: left;
`;
const RightIcon = styled.div`
  float: right;
`;
