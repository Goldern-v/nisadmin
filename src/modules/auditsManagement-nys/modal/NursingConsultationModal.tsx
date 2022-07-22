import Form from 'src/components/Form'
import styled from 'styled-components'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import createModal, { ModalComponentProps } from 'src/libs/createModal'
import { Button, Col, Input, message, Modal, Radio, Row, Spin } from 'antd'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { appStore, authStore } from 'src/stores/index'
import { CheckUserItem } from 'src/modules/notice/page/SentNoticeView'
import { TreeSelect } from 'antd/es'

import { aMServices } from '../services/AMServices'

const { SHOW_PARENT } = TreeSelect;

// import SelectPeopleModal from './SelectPeopleModal'
export interface Props extends ModalComponentProps {
  info: any;
  callback?: () => void;
  needAudit: boolean;
}
const rules: Rules = {
  status: (val) => !!val || "审核结果不能为空",
};
export default function NursingConsultationModal(props: Props) {
  const [title, setTitle] = useState("护理会诊单");
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [dataInfo, setDataInfo] = useState<any>({});
  const [members, setMembers] = useState<any[]>([])
  // const selectNurseModal = createModal(SelectPeopleModal);

  let { visible, onCancel, onOk, info ,needAudit} = props;
  const [membersList, setMembersList] = useState<any[]>([])
  let refForm = React.createRef<Form>();

  const onFieldChange = () => {};

  const onSave = async () => {
    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    if (members.length == 0) {
      message.warn('受邀会诊人不能为空')
      return
    }
    let data ={
      consultationId:dataInfo.consultationId,
      auditEmpNo: authStore.user?.empNo,
      operationType: "1",
      auditStatus: value.status,
      auditNode:"head_nurse_audit",
      members: members.map((v:any) => ({ empNo: v}))
    }
    
    aMServices.auditNursingConsultation(data).then((res: any) => {
      message.success("提交成功");
      props.callback && props.callback();
      onCancel();
    });
  };
  const handleMembers = (e: any) => {
    console.log('test-e', e)
    setMembers(e)
    // selectNurseModal.show({
    //   checkedUserList: members,
    //   onOkCallBack: (checkedUserList: CheckUserItem[]) => {
    //     let userList: any[] = checkedUserList.reduce((total: any[], item: any) => {
    //       return [
    //         ...total,
    //         ...item.userList ? item.userList.map((userListItem: any) => ({
    //           label: userListItem.empName,
    //           key: userListItem.empNo
    //         })) : [{ label: item.label, key: item.key }]
    //       ];
    //     }, []);
    //     // if (userList.length > 3) {
    //     //   return message.warn("选择人数不能超过三人");
    //     // }
    //     setMembers(userList)
    //   }
    // });
  }
  const getMembersList = useCallback(() => {

    aMServices.listCanParticipateInMember().then((res: any) => {
      console.log('test-res', res)
      const list = Object.keys(res.data || []).map((v: any, i: number) => {
        return {title: v, value: v, key: v, children: res.data[v].map((v1: any) => ({title: v1.empName, value: v1.empNo, key: v1.empNo})) }
      })
      setMembersList(list)
    })
  }, [])
  useEffect(() => {
    getMembersList()
  }, [])
  
  
  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (info && refForm.current && visible) {
      setIsSpinning(true);
      let from = refForm.current;
      
      aMServices
      .nursingConsultationDetail(info.othersMessage.auditedUrl)
      .then((res) => {
        setIsSpinning(false);
        setDataInfo(res.data.nursingConsultation|| {})
        let nursingConsultation = res.data.nursingConsultation || {}
        let members = res.data.members || []
        let {results = [] } = res.data
        from!.setFields({
          deptName: (authStore.deptList.find((item)=>item.code == nursingConsultation.deptCode) || {}).name,
          consultationObject: nursingConsultation.consultationObject,
          consultationTime: nursingConsultation.consultationTime,
          consultationPurposes: nursingConsultation.consultationPurposes,
          // creator: nursingConsultation.creator,
          nursingDiagnosis: nursingConsultation.nursingDiagnosis,
          createTime: nursingConsultation.createTime,
          status: nursingConsultation.status == 0 ? '' : nursingConsultation.status,
          resultText: results.map((v: any) => v.content).join('\n'),
          nursingMeasure: nursingConsultation.nursingMeasure,
          // memberList: members.reduce((current:string,item:any) => {
          //   current += item.empName + '、'
          //   return current.replace(/、$/,'')
          // },'')
        });
        setMembers((members || []).map((v:any) => v.empNo))
      });
    }
  }, [visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onSave}
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
      forceRender
      maskClosable
      footer={
        needAudit ? 
        [
        <Button key="back" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={onSave}>
          确定
        </Button>
        ] : []
      }
    >
      <Spin spinning={isSpinning}>
      <Wrapper>
        <div className='title'>{dataInfo.consultationName}</div>
        <div className="navbar bb">
          <span>床号: {dataInfo.bedNo}</span>
          <span>姓名: {dataInfo.consultationObject}</span>
          <span>性别: {dataInfo.sex}</span>
          <span>年龄: {dataInfo.age}</span>
        </div>
        <div className="navbar navbar-2">
          <span>申请人: {dataInfo.creator}</span>
          <span>申请日期: {dataInfo.createTime}</span>
          <span>受邀会诊人: </span>
          <TreeSelect
            size='small'
            treeData={membersList}
            treeCheckable={true}
            value={members}
            dropdownStyle={{height: '300px !important',overflowY: 'auto'}}
            onChange ={handleMembers}/>
        </div>
        <Form
          ref={refForm}
          rules={rules}
          labelWidth={90}
          onChange={onFieldChange}
        >
          <Row className='bb'>
            <Col span={12}>
              <Form.Field label={`预计会诊时间`} name="consultationTime">
                <Input size='small' disabled />
              </Form.Field>
            </Col>
            <Col span={12}>
              <Form.Field labelWidth={40} label={`病区`} name="deptName">
                <Input size='small' disabled />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            {/* <Col span={24}>
              <Form.Field label={`患者姓名`} name="consultationObject">
                <Input disabled />
              </Form.Field>
            </Col> */}
            <Col span={24}>
              <Form.Field label={`医疗诊断`} name="nursingDiagnosis">
                <Input.TextArea  disabled />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`会诊目的`} name="consultationPurposes">
                <Input.TextArea disabled />
              </Form.Field>
            </Col>
            {/* <Col span={24}>
              <Form.Field label={`创建人`} name="creator">
                <Input disabled />
              </Form.Field>
            </Col> */}
            <Col span={24}>
              <Form.Field label={`简要护理问题`} name="nursingMeasure">
                <Input.TextArea disabled />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`护理会诊情况及意见`} name="resultText">
                <Input.TextArea disabled />
              </Form.Field>
            </Col>
            {/* <Col span={24}>
              <Form.Field label={`参与人`} name="memberList">
                <Input.TextArea  disabled />
              </Form.Field>
            </Col> */}
            <Col span={24}>
              <Form.Field label={`审核结果`} name="status" required>
                {/* <Input disabled /> */}
                <Radio.Group buttonStyle="solid" disabled={!needAudit}>
                  <Radio.Button value="1">通过</Radio.Button>
                  <Radio.Button value="2">退回</Radio.Button>
              </Radio.Group>
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
      {/* <selectNurseModal.Component /> */}
      </Spin>
    </Modal>
  );
}
const Wrapper = styled.div`
  .title {
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    padding-bottom: 10px;
  }
  .navbar {
    display: flex;
    padding-bottom: 10px;
    span {
      flex: 1;
      font-size: 14px;
    }
    &.navbar-2 {
      justify-content: space-between;
      padding-top: 10px;
      span {
        flex: auto;
      }
    }
  }
  .pointer {
    cursor: pointer;
  }

  .bb {
    border-bottom: 1px dashed #333;
  }
  .ant-row:first-child {
    margin-bottom: 10px;
    .ant-col>div {
      margin-bottom: 10px;
      align-items: center;
    }
  }
  .ant-radio-button-wrapper-checked {
    color: #fff;
    background: #00A680;
    border-color: #00A680;
  }
  .ant-select-selection {
    width: 100px;
    height: 22px;
    overflow: hidden;
  }
`;
