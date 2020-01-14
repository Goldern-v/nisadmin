import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Spin } from 'antd'
import { ModalComponentProps } from "src/libs/createModal";
import { observer } from 'mobx-react-lite'
import QuestionList from './QuestionList'
import AwnserInfo from './AwnserInfo'
export interface Props extends ModalComponentProps {

}

export default observer(function TestPageModal(props: Props) {
  const [loading, setLoading] = useState(false)
  const { visible, onCancel } = props

  return <Modal
    width={1200}
    visible={visible}
    onCancel={onCancel}
    footer={null}
    bodyStyle={{ padding: 0 }}
    title="考试：1月理论考核第一期"
    confirmLoading={loading}>
    <Wrapper>
      <div className="left" style={{ overflowY: loading ? 'hidden' : 'auto' }}>
        <Spin spinning={loading}>
          <QuestionList />
        </Spin>
      </div>
      <div className="right">
        <AwnserInfo />
      </div>
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
  height: calc(100vh - 200px);
  width: 100%;
  &>div{
    height: 100%;
    overflow-y: auto;
    float: left;
    &.left{
      width: 900px;
      background: #eee;
    }
    &.right{
      width: 300px;
      border-left: 1px solid #e8e8e8;
    }
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #eaeaea;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 50px;
        background-color: #c2c2c2;
    }
    ::-webkit-scrollbar-track {
        border-radius: 50px;
        background-color: #eaeaea;
    }
  }
`