import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Select } from "antd";
import { appStore } from "src/stores";
import { stepViewModal } from "../../stepComponent/StepViewModal";
import { ScrollBox } from "src/components/common";
import { stepServices } from '../../stepComponent/services/stepServices'
interface User {
  label?: string;
  key: string;
}

export interface Props {
  visible: boolean;
  id?: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function GroupsSettingModal(props: Props) {
  const { visible, id, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [personList, setPersonList] = useState([] as any);
  const [groupName, setGroupName] = useState('');
  // 初始化弹窗数据
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        if (id) {
          stepServices.getCompleteInfoOfGroup(id).then((res: any) => {
            if (res.data) {
              setGroupName(res.data.groupName);
              setPersonList(res.data.personList.map((item: any) => ({
                ...item,
                label: item.empName,
                key: item.empNo,
                value: item.empNo,
                text: item.empName,
                userList: [item]
              })))
            }
          })
        } else {
          setGroupName('');
          let arr: any = stepViewModal.stepData3.participantList.reduce(
            (total: any[], item: any) => {
              return [...total, ...item.userList];
            },
            []
          );
          setPersonList(arr.map((item: any) => ({
            ...item,
            label: item.empName,
            key: item.empNo,
            value: item.empNo,
            text: item.empName,
            userList: [item]
          })))
        }
      }, 100);
    }
  }, [visible]);

  // 删除人员
  const onDeselect = (key: any) => {
    let _user = personList.find((item: any) => item.key === key.key);
    deleteUser(_user);
  };
  // 删除函数封装
  const deleteUser = (user: User | User[]) => {
    if (user instanceof Array) {
      for (let i = 0; i < user.length; i++) {
        let index = personList.findIndex(
          (item: any) => item.key === user[i].key
        );
        if (index > -1) {
          personList.splice(index, 1);
        }
      }
      setPersonList([...personList]);
    } else {
      let index = personList.findIndex(
        (item: any) => item.key === user.key
      );
      if (index > -1) {
        personList.splice(index, 1);
        setPersonList([...personList]);
      }
    }
  };

  // 保存
  const checkForm = () => {
    if (!groupName || !personList.length) {
      Message.warning('保存前请先填写好小组名称和人员');
      return;
    }
    let obj: any = {
      groupName,
      personList,
    }
    if (id) obj.id = id;
    setEditLoading(true);
    stepServices.saveOrUpdateGroup(obj).then((res: any) => {
      setEditLoading(false);
      let msg = "小组新建成功";
      Message.success(msg);
      onOk(res);
    }).catch(e => {
      console.log(e);
    });
  };

  // 取消
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      width={800}
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={id ? "小组设置" : "小组新建"}
    >
      <Wrapper>
        <Header>
          <div className='groupName'>
            <span>小组名称：</span>
            <Input
              style={{ width: 250, marginLeft: 5, marginRight: -5 }}
              placeholder="请输入小组名称"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
            />
          </div>
          <div className='groupPeople'>

          </div>
        </Header>
        <SelectCon>
          <Select
            mode="tags"
            placeholder="..."
            value={personList}
            labelInValue={true}
            style={{ width: "100%" }}
            open={false}
            onDeselect={onDeselect}
          />
        </SelectCon>
      </Wrapper>
    </Modal>
  );
})
const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  .label {
    line-height: 32px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
`;
const Header = styled.div`
  height: 50px;
  .groupName {
    float: left;
  }
  .groupPeople {
    float: right
  }
`;
const SelectCon = styled(ScrollBox)`
  min-height: calc(55vh - 60px);
  .ant-select-selection--multiple {
    height: 300px;
    padding: 10px 0 !important;
  }
`;
