import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, InputNumber } from 'antd'
import { observer } from 'mobx-react-lite'
import { ModalComponentProps } from "src/libs/createModal";
export interface Props extends ModalComponentProps {
  onOkCallBack?: Function,
  data?: any
}

export default observer(function ExamScoreEditModal(props: Props) {
  const { visible, onOkCallBack, onCancel } = props
  const [loading, setLoading] = useState(false)

  const handleOK = () => {

  }

  return <Modal
    width={400}
    confirmLoading={loading}
    visible={visible}
    onOk={handleOK}
    onCancel={onCancel}
    centered
    title="上传考核成绩">
    <Wrapper>
      <div className="main-title">最终成绩：96分</div>
      <div className="edit-item">
        <span >走位操作标准（满分40分）：扣</span>
        <span className="content">
          <InputNumber size="small" min={0} max={40} className="score-edit" precision={2} />
        </span>
        <span>分</span>
      </div>
      <div className="edit-item">
        <span >手势操作标准（满分40分）：扣</span>
        <span className="content">
          <InputNumber size="small" className="score-edit" precision={2} />
        </span>
        <span>分</span>
      </div>
      <div className="edit-item">
        <span >抽血操作标准（满分40分）：扣</span>
        <span className="content">
          <InputNumber size="small" className="score-edit" precision={2} />
        </span>
        <span>分</span>
      </div>
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
&>div{
  margin-bottom: 10px;
  &:last-of-type{
    margin-bottom: 0;
  }
}
  .main-title{
    font-size: 16px;
    color: #000;
  }
  .edit-item{
    font-size: 13px;
  }
  .score-edit{
    width: 60px;
    margin: 0 5px;
    .ant-input-number-handler-wrap{
      display: none;
    }
  }
`