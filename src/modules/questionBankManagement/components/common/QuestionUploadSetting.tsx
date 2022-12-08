import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Tag, message } from 'antd'

import { ModalComponentProps } from "src/libs/createModal"
import { authStore, appStore } from 'src/stores'
import LabelSelect from './../common/LabelSelect'
import { observer } from 'mobx-react-lite'
import { questionBankManageService } from './../../api/QuestionBankManageService'
import qs from 'qs'

export interface Props extends ModalComponentProps {
  data: any,
}

export default observer(function QuestionUploadSetting(props: Props) {
  const { onOk, onCancel, visible, data } = props
  const [labelList, setLabelList] = useState([] as any[])
  const [loading, setLoading] = useState(false)

  const handleOk = () => {
    const params = {
      bankId: data.bankId,
      questionLabelIdList: labelList.map((label: any) => label.id)
    }

    setLoading(true)
    questionBankManageService
      .updateLabelsForQuestionBank(params)
      .then(res => {
        setLoading(false)
        onCancel && onCancel()
        let newQuery = {
          id: data.bankId,
          bankName: data.bankName
        }
        message.success('保存成功', 1, () =>
          appStore.history
            .push(`/continuingEdu/uploadRecordQuestionBank?${qs.stringify(newQuery)}`))
      }, err => setLoading(false))
  }

  const LableList = () => {
    return labelList.map((item: any, idx: number) => <Tag
      closable
      key={item.labelContent}
      className="label-tag"
      color="green"
      onClose={() => {
        labelList.splice(idx, 1)
        setLabelList(labelList);
      }}>
      {item.labelContent}
    </Tag>
    )
  }

  useEffect(() => {
    if (visible) {
      setLabelList((data.labelList || []))
    }
  }, [visible])

  return <Modal
    title="题目导入成功"
    visible={visible}
    centered
    confirmLoading={loading}
    width={900}
    okText="保存并查看题目"
    onOk={handleOk}
    bodyStyle={{ padding: '24px 60px' }}
    onCancel={onCancel}>
    <Wrapper>
      <div className="row align-center">
        <img src={require('./../../assets/u20705.png')} alt="" />
      </div>
      <div className="row align-center" style={{ marginBottom: 30 }}>
        <span className="rt-message">{data?.rtMessage || ''}</span>
      </div>
      <div className="row" style={{ fontSize: '18px' }}>请完善上传题库标签：</div>
      <div className="row">
        <div style={{ width: 600 }}>
          <LabelSelect
            showAdd
            onSelect={(payload: any) => {
              let target = labelList.find((item: any) => item.id == payload.id)
              if (!target) {
                labelList.push(payload)
                setLabelList(labelList.concat())
              } else {
                message.warning('已存在该标签')
              }
            }} />
        </div>
      </div>
      <div className="row">
        {LableList()}
      </div>
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
  .align-center{
    text-align: center;
  }
  .row{
    margin-bottom: 15px;
  }
  .rt-message{
    font-size: 24px;
    font-weight: bold;
  }
  .label-tag{
    border-color: #00A680;
    color: #00A680;
  }
`
