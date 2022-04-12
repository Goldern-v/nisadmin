import styled from "styled-components";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Modal, message as Message, Row, Col, Button, Input } from "antd";
import { traineeShiftApi } from "../api/TraineeShiftApi"; // 接口
import { traineeShiftModal } from "../TraineeShiftModal";

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function AddGroupModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [groupName, setGroupName] = useState("");

  // 保存
  const checkForm = async () => {
    let isOk: any = /^[1-9]\d*$/.test(groupName.replace(/(^\s+)|(\s+$)/g, ""));
    let isHavedGroupName: any = traineeShiftModal.tableList.find(
      (item: any) => item.groupNum == groupName
    );
    if (groupName) {
      if (isHavedGroupName) {
        Message.warning("该小组名称已存在，请重新命名！");
        return;
      }
      if (!isOk) {
        Message.warning("小组名称必须为正整数！");
        return;
      }
      setEditLoading(true);
      traineeShiftApi
        .createRotateGroup(groupName)
        .then((res: any) => {
          setEditLoading(false);
          if (res.code == 200) {
            Message.success("已成功添加分组！");
            onOk();
            traineeShiftModal.onload();
          } else {
            setEditLoading(false);
            Message.error(`${res.desc}`);
          }
        })
        .catch(() => {
          setEditLoading(false);
        });
    } else {
      Message.warning("保存前请填写小组名称！");
    }
  };

  // 关闭取消
  const handleCancel = async () => {
    if (editLoading) return;
    await (onCancel && onCancel());
  };

  return (
    <Modal
      width="450px"
      visible={visible}
      onCancel={handleCancel}
      forceRender={true}
      title="添加实习小组"
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
        <Row>
          <Col span={6} className="label">
            <span style={{ color: "red", marginRight: "3px" }}>*</span>
            小组名称：
          </Col>
          <Col span={17}>
            <Input
              style={{ width: 250 }}
              placeholder="请输入要小组名"
              value={groupName}
              onChange={e => {
                setGroupName(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Wrapper>
    </Modal>
  );
});
const Wrapper = styled.div`
  width: 85%;
  margin: 10px auto;
  .label {
    margin-top: 5px;
  }
`;
