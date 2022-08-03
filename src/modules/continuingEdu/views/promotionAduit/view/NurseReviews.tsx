import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Modal, message as Message,Row, Col, Input,Radio  } from 'antd'
import { badEventReportService } from '../services/BadEventReportService'
import { PromotionDetaitUtils } from '../promotionDedait';
import moment from 'moment'

export interface Props {
  visible: boolean
  onOk?: any,
  onCancel?: any
}
export default function NurseReviews(props: Props) {
  const { onOk, onCancel, visible} = props;
  const [userAudit, setUserAudit] = useState({
    noPass: '',
    handleContent: ''
  } as {noPass:string ; handleContent:string});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [aduitData, setAduitData] = useState({} as any);

  const audit = () => {
    if (typeof userAudit.noPass != 'boolean') return Message.error('未选择审核通过');
    setConfirmLoading(true)
    let obj = {
      nodeCode:aduitData.nodeCode,
      handleContent:userAudit.handleContent,
      noPass:userAudit.noPass,
      formId:PromotionDetaitUtils.master.id,
      fromCode:PromotionDetaitUtils.master.formCode,
      handleTime:moment().format("YYYY-MM-DD HH:mm:ss")
    }
    if(aduitData.nodeCode == 'nurse_handle'){
      let list = PromotionDetaitUtils.handleDifferent()
      console.log(list);
      
    }
    badEventReportService.getHandleNode(obj).then((res)=>{
      if(res.code == '200'){
        Message.success('操作成功');
        onOk()
      }
    })
  }
  const onRadioChange = (e:any) => {
    setUserAudit({noPass:e.target.value , handleContent:userAudit.handleContent})
  };

  useEffect(() => {
    if (!visible) setUserAudit({ noPass: '', handleContent: '' })
    setAduitData(PromotionDetaitUtils.savdfege())
  }, [visible])

  return <Modal
    title={aduitData && aduitData.nodeName}
    onOk={audit}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    visible={visible}
    maskClosable={false}
    className="badevent-user-check-modal">
    <Wrapper>
      {
        (aduitData.nodeName == '科护士长审核' || aduitData.nodeName == '大科护士长审核') && <Row>
        <Col span={18}>
        <Radio.Group onChange={(e)=>{onRadioChange(e)}} value={userAudit.noPass}>
          <Radio value={false}>合格</Radio>
          <Radio value={true}>不合格</Radio>
        </Radio.Group>
        </Col>
      </Row>
      }
      {
        (aduitData.nodeName == '晋升小组审核' || aduitData.nodeName == '护理部审核') && <Row>
         <Col span={18}>
         <Radio.Group onChange={(e)=>{onRadioChange(e)}} value={userAudit.noPass}>
           <Radio value={false}>同意晋升</Radio>
           <Radio value={true}>不同意晋升</Radio>
         </Radio.Group>
         </Col>
       </Row>
      }
      <Row>意见或建议</Row>
      <Row>
        <Col>
          <Input.TextArea
            maxLength={20}
            value={userAudit.handleContent}
            onChange={e => setUserAudit({ ...userAudit, handleContent: e.target.value })} />
        </Col>
      </Row>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
.ant-row{
  margin-bottom: 10px;
}
.label-col{
  line-height: 32px;
}
.input-item{
  width: 240px;
  line-height: 32px;
  vertical-align: middle;
}
.label-col{
  text-align: right;
}
`