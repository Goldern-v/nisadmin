import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'
import { Modal, Checkbox, message as Message } from 'antd'
import { questionBankManageService } from '../../api/QuestionBankManageService'

export interface Props {
  visible: boolean,
  banks: any[],
  onCancel: any
}

export default function BankTableDelete(props: Props) {
  const { visible, banks, onCancel } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => { }, [visible])

  const handleOk = () => {
    let params = {
      bankIdList: (banks || []).map((item) => item.id)
    }

    setLoading(true)

    questionBankManageService
      .deleteUploadRecord(params)
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

  const DeleteTitle = () => {
    if (banks.length == 1) {
      return <Fragment>
        <div>您确定要删除导入记录"{banks[0].bankName || ''}"吗？</div>
        <div>本次操作将作以下操作:</div>
        <div className="ml-24px">1. 删除导入记录："{banks[0].bankName || ''}";</div>
        <div className="ml-24px">2. 该导入记录共有{banks[0].bankQuestionCount || 0}道题，删除后同时删除这些题目。</div>
      </Fragment>
    } else {
      return <Fragment>
        <div>您确定要删除选中的{banks.length}个导入记录吗？</div>
        <div>本次操作将作以下操作:</div>
        <div className="ml-24px">1. 删除{banks.length}个导入记录;</div>
        <div className="ml-24px">2. 同时删除这{banks.length}个导入记录的题目。</div>
      </Fragment>
    }
  }

  return <Modal
    visible={visible}
    onOk={handleOk}
    centered
    onCancel={handleCancel}
    title="删除导入记录"
    confirmLoading={loading}>
    <Wrapper>
      {DeleteTitle()}
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
  &>div{
      margin-bottom: 10px;
  }
  .ml-24px{
    margin-left: 24px;
  }
`