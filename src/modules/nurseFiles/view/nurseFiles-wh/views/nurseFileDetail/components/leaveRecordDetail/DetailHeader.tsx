import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { appStore, authStore } from "src/stores";
import { Button,message,Modal,Row,Col,Radio,Input} from "antd";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { nurseFilesService } from 'src/modules/nurseFiles/view/nurseFiles-wh/services/NurseFilesService'
import _ from 'lodash'
import printing from "printing";
import { leaveRecordModal,Alldays } from './modal';
interface Props {
  status?: string;
  initDetail:any
}
const defaultUser = {
  isPass: true,
  handleContent: '',
}
export default function QualityControlTempleteDetailHeader(props: Props) {
  const {initDetail} = props
  const [processVisible, setProcessVisible] = useState(false)
  const [shenheTitle, setShenheTitle] = useState("审核")
  const [user, setUser] = useState(defaultUser)

  console.log('header', leaveRecordModal.employeePager);
  const topHeaderBack = () => {
    appStore.history.length == 1 ? window.close() : appStore.history.goBack();
  };
  
  const ButtonGroup = () => {
    const { status,nextNode,creatorNo } = leaveRecordModal.employeePager
    console.log("ButtonGroup",status);
    const showShenhe = ()=>{
      if([-1,1].includes(status) && nextNode==="head_nurse_audit" && JSON.parse(sessionStorage.getItem('user') || "")?.roleManageCodeList.includes('QCR0004')) return true
      else if([-1,1].includes(status)  && nextNode==="minister_nurse_audit" && JSON.parse(sessionStorage.getItem('user') || "")?.roleManageCodeList.includes('QCR0001')) return true
      return false 
    }
    const showChexiao = ()=>{
      return JSON.parse(sessionStorage.getItem('user') || "")?.empNo === creatorNo && status !==-1
    }
    const showTijiao = ()=>{
      return JSON.parse(sessionStorage.getItem('user') || "")?.empNo === creatorNo && nextNode==="commit" && status ===-1 || status ===0
    }
    return (
      <>
        { showTijiao()&& <Button type="primary" onClick={()=>onSubmit(1)}>提交</Button>}
        { status===0 && <Button onClick={()=>onSubmit(0)}>暂存</Button>}
        { showShenhe() && <Button type="primary" onClick={()=>handleAudit()}>审核</Button>}
        { showChexiao() && <Button type="primary" onClick={()=>toCancel()}>撤销</Button>}
      </>
    )
  }

  const JsonStringFy = ()=>{
    return JSON.stringify(_.pick(leaveRecordModal.employeePager, _.keys(Alldays)));
  }

  const toCancel = ()=>{
    Modal.confirm({
    title: '请确认是否撤销?',
    onOk() {
      nurseFilesService.leaveApplicationCancel({id:leaveRecordModal.employeePager.id}).then((res:any)=>{
        if(res.code==="200"){
          message.success("撤销成功")
          appStore.history.goBack()
        }
      })
    },
    onCancel() {},
  });
  }

  const onSubmit = (status:number) => {
    let params = {
      ...leaveRecordModal.employeePager,
      status,
      leaveDetail:JsonStringFy()
    }
    nurseFilesService.leaveApplicationSave(params).then((res:any)=>{
      if(res.code==="200"){
        let successStr = status == 0 ? '暂存成功' : "提交成功"
        message.success(successStr)
        appStore.history.goBack()
      }
    })
  }
  
  const handleCheck = ()=>{
    let {employeePager} = leaveRecordModal
    let params = {
      nodeCode : employeePager.nextNode,
      id:employeePager.id,
      ...user
    }
    nurseFilesService.leaveApplicationHandNode(params).then((res:any)=>{
      console.log(res,'res')
      if(res.code==="200"){
        message.success('审核成功')
        initDetail()
        setProcessVisible(false)
      }

    })
  }

  const handleAudit = async () => {
    setUser(defaultUser)
    if(leaveRecordModal.employeePager){
      const nextNode = leaveRecordModal.employeePager.nextNode;
      const nodeList = leaveRecordModal.employeePager.nodeList as Array<any>;
      const obj = nodeList?.reverse()?.find((item: any) => item.nodeCode === nextNode)
      setShenheTitle(obj?.nodeName)
    }
    setProcessVisible(true)
  }

  const onPrint = () => {
    leaveRecordModal.onPrint();
  }

  const toConfirm = ()=>{
    if(!user.isPass && !user.handleContent) return message.warning("请填写审核意见")
    handleCheck()
  }

  return (
    <Con>
      <TopHeader>
        <BreadcrumbBox
          style={{
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 2,
          }}
          data={[
            {
              name: '请假记录',
              // link: "/selfNurseFile/LeaveRecord",
            },
            {
              name: "请假申请",
            },
          ]}
        />
        <div className="topHeaderTitle">
          <div className="title">{ leaveRecordModal.employeePager.recordName }</div>
          <div className="topHeaderStatus">
            状态：
            <span style={{ color: "#6767ff" }}>
              待提交
            </span>
          </div>
          <div className="topHeaderButton">
            <Button onClick={topHeaderBack}>返回</Button>
            { ButtonGroup() }
            <Button onClick={onPrint}>打印</Button>
          </div>
        </div>
       
      </TopHeader>
      <Modal
        title={shenheTitle}
        visible={processVisible}
        width={500}
        footer={[
          <>
          <Button onClick={ ()=>{setProcessVisible(false)} }>取消</Button>
          <Button type='primary' onClick={ toConfirm }>确定</Button>
          </>
        ]}
      >
        <div style={{ lineHeight: '28px', fontSize: '16px' }}>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4}>审核结果:</Col>
            <Col span={20}>
              <Radio.Group
                buttonStyle="solid"
                value={user.isPass}
                onChange={(e) => setUser({ ...user, 'isPass': e.target.value })}>
                <Radio.Button value={true}>通过</Radio.Button>
                <Radio.Button value={false}>退回</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4}>审核意见:</Col>
            <Col span={20}>
              <Input.TextArea
                value={user.handleContent}
                rows={4}
                onChange={(e) =>
                  setUser({ ...user, 'handleContent': e.target.value })
                } />
            </Col>
          </Row>
        </div>
      </Modal>
    </Con>
  );
}

const Con = styled.div` 
  box-sizing:border-box;
  height: 100%;
  width: 100%;
  padding-left: 20px;
  position: relative;
`;
const TopHeader = styled.div`
  .topHeaderClass {
    font-size: 14px;
    margin-top: 13px;
    color: #999;
    .topHeaderSpan1 {
      cursor: pointer;
    }
    .topHeaderSpan1:hover {
      color: #00a680;
    }
    .topHeaderSpan2 {
      cursor: pointer;
    }
    .topHeaderSpan2:hover {
      color: #00a680;
    }
  }
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    .topHeaderButton {
      position: absolute;
      top: 45px;
      right: 20px;
      button {
        margin-left: 10px;
      }
    }
    .title {
      font-weight: bold;
      min-height: 30px;
    }
  }
  .topHeaderStatus {
    font-size: 12px;
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`;
