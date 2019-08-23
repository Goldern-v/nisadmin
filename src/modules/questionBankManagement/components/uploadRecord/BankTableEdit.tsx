import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Input, message as Message } from 'antd'
import { questionBankManageService } from '../../api/QuestionBankManageService'

export interface Props {
  visible: boolean,
  bank: any,
  onCancel: any
}

export default function BankTableEdit(props: Props) {
  const { visible, bank, onCancel } = props;
  const [loading, setLoading] = useState(false)

  const [bankEdit, setBankEdit] = useState({
    bankName: '',
    id: ''
  });

  useEffect(() => {
    if (visible) {
      setBankEdit(bank);
    } else {
      setBankEdit({
        bankName: '',
        id: ''
      });
    }
  }, [visible])

  const handleOk = () => {
    let params = {
      bankId: bankEdit.id,
      newBankName: bankEdit.bankName
    }

    setLoading(true)

    questionBankManageService
      .updateUploadName(params)
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
    title="修改文件名"
    confirmLoading={loading}>
    <Wrapper>
      <div>文件"{bank.bankName}"</div>
      <div>修改为:</div>
      <div>
        <Input
          value={bankEdit.bankName}
          style={{ width: '300px' }}
          onChange={(e: any) => { setBankEdit({ ...bankEdit, bankName: e.target.value }) }} />
      </div>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  &>div{
    margin-bottom: 10px;
  }
`