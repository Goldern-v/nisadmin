import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Input, message as Message } from 'antd'
import { questionBankManageService } from './../../api/QuestionBankManageService'

export interface Props {
  visible: boolean,
  label: any,
  onCancel: any
}

export default function LabelTableEdit(props: Props) {
  const { visible, label, onCancel } = props;
  const [loading, setLoading] = useState(false)

  const [labelEdit, setLabelEdit] = useState({
    labelContent: '',
    id: ''
  });

  useEffect(() => {
    if (visible) {
      setLabelEdit(label);
    } else {
      setLabelEdit({
        labelContent: '',
        id: ''
      });
    }
  }, [visible])

  const handleOk = () => {
    let params = {
      labelId: labelEdit.id,
      newLabelName: labelEdit.labelContent
    }

    if (!labelEdit.labelContent.trim()) {
      Message.warning('未填写标签名称');
      return
    }

    let successMsg = params.labelId ? '修改成功' : '创建成功'

    setLoading(true)

    if (params.labelId)
      questionBankManageService
        .changeLabelName(params)
        .then(res => {
          Message.success(successMsg);
          setLoading(false)
          onCancel && onCancel({ reload: true });
        }, err => {
          setLoading(false)
        })
    else
      questionBankManageService
        .createQuestionLabel({
          newLabelName: params.newLabelName
        })
        .then(res => {
          Message.success(successMsg);
          setLoading(false)
          onCancel && onCancel({ reload: true });
        }, err => {
          setLoading(false)
        })
  }

  const handleCancel = () => {
    onCancel && onCancel();
  }

  return <Modal
    visible={visible}
    onOk={handleOk}
    centered
    onCancel={handleCancel}
    title={label.id ? '修改标签' : '新建标签'}
    confirmLoading={loading}>
    <Wrapper>
      <div style={{ display: label.id ? 'block' : 'none' }}>标签"{label.labelContent}"</div>
      <div style={{ display: label.id ? 'block' : 'none' }}>修改为:</div>
      <div style={{ textAlign: label.id ? 'left' : 'center' }}>
        <span style={{ display: label.id ? 'none' : 'inline' }}>标签名称：</span>
        <Input
          value={labelEdit.labelContent}
          style={{ width: '300px' }}
          onChange={(e: any) => { setLabelEdit({ ...labelEdit, labelContent: e.target.value }) }} />
      </div>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  &>div{
    margin-bottom: 10px;
  }
`