import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'
import { Modal, Checkbox, message as Message } from 'antd'
import { questionBankManageService } from './../../api/QuestionBankManageService'

export interface Props {
  visible: boolean,
  labels: any[],
  onCancel: any
}

export default function LabelTableDelete(props: Props) {
  const { visible, labels, onCancel } = props;

  const [loading, setLoading] = useState(false);
  const [deleteQuestion, setDeleteQuestion] = useState(false);

  useEffect(() => {
    if (visible) setDeleteQuestion(false)
  }, [visible])

  const handleOk = () => {
    let params = {
      labelIdList: (labels || []).map((item) => item.id),
      deleteQuestion
    }

    setLoading(true)

    questionBankManageService
      .deleteLabelByLabelIdList(params)
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
    if (labels.length == 1) {
      return <Fragment>
        <div>您确定要删除标签"{labels[0].labelContent || ''}"吗？</div>
        <div>本次操作将作以下操作:</div>
        <div className="ml-24px">1. 删除标签："{labels[0].labelContent || ''}";</div>
        <div className="ml-24px">2. 该标签共关联{labels[0].questionCount || 0}道题，删除后这些题目将失去该标签。</div>
      </Fragment>
    } else {
      return <Fragment>
        <div>您确定要删除选中的{labels.length}个标签吗？</div>
        <div>删除后标签关联的题目将失去选中的标签。</div>
      </Fragment>
    }
  }

  return <Modal
    visible={visible}
    onOk={handleOk}
    centered
    onCancel={handleCancel}
    title="删除标签"
    confirmLoading={loading}>
    <Wrapper>
      {DeleteTitle()}
      <div>
        <Checkbox checked={deleteQuestion} onChange={(e: any) => { setDeleteQuestion(!deleteQuestion) }} />
        <span>同时删除标签关联的题目</span>
      </div>
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