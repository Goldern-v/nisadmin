import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Radio, Input, Spin, Button } from 'antd'
import { ModalComponentProps } from "src/libs/createModal";
import { observer } from 'mobx-react-lite'
import AnwserSheetPage from './AnwserSheetPage'
import AnwserResultPannel from './AnwserResultPannel'
export interface Props extends ModalComponentProps {
  onOkCallBack?: Function,
  type?: 'view' | 'edit',
  visible: boolean
}
export default observer(function AnswerSheetModal(props: Props) {
  const bodyStyle = {
    padding: 0
  }
  const { visible, onOkCallBack, onCancel, type } = props
  const viewType = type || 'edit'
  const [loading, setLoading] = useState(false)

  const handleOK = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onOkCallBack && onOkCallBack()
      onCancel && onCancel()
    }, 1500)
  }

  const getAnswerInfo = () => {
    console.log('getAnswerInfo')
  }

  useLayoutEffect(() => {
    if (visible) {
      getAnswerInfo()
    }
  }, [visible])

  return <Modal
    width={1200}
    confirmLoading={loading}
    footer={<div>
      <Button onClick={onCancel}>取消</Button>
      {viewType == 'edit' && <Button
        loading={loading}
        onClick={handleOK}
        type="primary">
        保存成绩
      </Button>}
    </div>}
    onCancel={onCancel}
    bodyStyle={bodyStyle}
    visible={visible}
    // onOk={handleOK}
    // onCancel={onCancel}
    centered
    title="查看试卷">
    <Wrapper>
      <div
        className="left"
        style={{
          overflowY: loading ? 'hidden' : 'auto'
        }}>
        <Spin spinning={loading}>
          <AnwserSheetPage />
        </Spin>
      </div>
      <div className="right">
        <AnwserResultPannel />
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