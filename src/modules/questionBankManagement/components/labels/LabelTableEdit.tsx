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

    setLoading(true)

    questionBankManageService
      .changeLabelName(params)
      .then(res => {
        Message.success('修改成功');
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
    title="修改标签"
    confirmLoading={loading}>
    <Wrapper>
      <div>标签"{label.labelContent}"</div>
      <div>修改为:</div>
      <div>
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