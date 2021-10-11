import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, InputNumber, Modal, Row, Select, Icon, Spin } from 'antd'
import NurseHandBookService from '../services/NurseSatisfactionSurveyService'
import { fileDownload } from 'src/utils/file/file'

const api = new NurseHandBookService();
export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
  isAdd?: boolean,
  previewPaperData?: any,
}
export default function editModal(props: Props) {
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp, previewPaperData } = props
  const [loading, setLoading] = useState(false)
  const handleOk = () => {}
  const bdstyle: React.CSSProperties = {maxHeight: "90vh"}
  const afterClose = () => {}
  
  return <Modal
    title={"满意度调查表详情"}
    width={1000}
    bodyStyle={bdstyle}
    afterClose={afterClose}
    confirmLoading={loading}
    okText={"保存"}
    centered
    visible={visible}
    onOk={() => {
      handleOk()
    }}
    onCancel={() => onCancel()}>
    <Wrapper>
      <p>{previewPaperData?.text}</p>
      <div>
        {previewPaperData?.questionList?.map((item: any, idx: any) =>
        <div key={idx}>{item.questionContent}</div>)}
      </div>
      
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
height:80vh;
.father{
  position: relative;
}
.back{
  width: 50px;
  height: 50px;
  position: absolute;
  right: 95px;
  top: -22px;
  background-color: #323639;
  z-index: 999;
}
.iframeStyle{
  width:100%;
  height:85vh;
  position: absolute;
  left:0px;
  .img{
    margin-top:50px;
  }
}
`
