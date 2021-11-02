import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, InputNumber, Modal, Row, Select, Icon, Spin } from 'antd'
import NurseHandBookService from '../services/NurseHandBookService'
import { fileDownload } from 'src/utils/file/file'

const api = new NurseHandBookService();
export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
  isAdd?: boolean,
  path?: string,
  id?: any,

}
export default function editModal(props: Props) {
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp, path, id } = props
  const [loading, setLoading] = useState(false)
  const [pdf, setPdf] = useState(false)
  const handleOk = () => {}
  const bdstyle: React.CSSProperties = {maxHeight: "90vh"}
  const [spinning, setSpinning] = useState(false)
  const afterClose = () => {

  }
  const handleDownload = () => {
    api.
    download(id).then((res) => {
      fileDownload(res)
    })
  }

  useEffect(() => {
    initData()
  }, [props.path])

  const initData = () => {
    setSpinning(true)
    let str:any = path;
    let index = str.lastIndexOf("\.");
    let type = str.substr(index+1,str.length);
    let arrList = ["pdf","doc","docx","ppt","pptx","xls","xlsx"]
    setPdf(arrList.includes(type))
    setTimeout(()=>{
      setSpinning(false)
    },500)
    
  }
  
  return <Modal
    title={"文档预览"}
    width={1000}
    bodyStyle={bdstyle}
    afterClose={afterClose}
    confirmLoading={loading}
    footer={[
      <Button key="download" loading={loading} type="primary" onClick={() => handleDownload()}>
      下载
      </Button>,
      <Button key="back" onClick={() => onCancel()}>
      关闭
      </Button>,
    ]}
    centered
    visible={visible}
    onOk={() => {
      handleOk()
    }}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Spin spinning={spinning}>
        <div className="father">
        {/* {(type != 'png'||type != 'jpg') &&<div className="back"></div>}
        {(type == 'png'||type == 'jpg') && <iframe id="iframePrint"  className="iframeStyle" scrolling='no' src={path} />}
        {(type != 'png'||type != 'jpg') && <iframe id="iframePrint" className="iframeStyle" style={{top:"-30px"}}  scrolling='no' src={path} />} */}
        {pdf && <div className="back"></div>}
        <iframe id="iframePrint" className="iframeStyle" style={{top:"-30px"}}  scrolling='no' src={path+"'#toolbar=0'"} />
        </div>
      </Spin>
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
