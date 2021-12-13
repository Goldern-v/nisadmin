import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { initBodyModal } from "./function/render"
import TableTitle from "./formType/TableTitle"
import ComplexHeader from "./formType/ComplexHeader"
import CommonHeader from "./formType/CommonHeader"
import Common from "./formType/Common"
import Remark from "./formType/Remark"
import SignModule from "./formType/SignModule"

import { Input } from 'src/vendors/antd'
import { authStore, appStore, scheduleStore } from "src/stores";
import { Prompt } from 'react-router-dom'
import moment from "moment"
export interface Props {
  bodyModal: any
  setBodyModal: Function
  setTableTitle: Function
  formContent: any
  tableTitle: String
  setRemark: Function
  remark: String
  showFixHeader: boolean
  computeRow: any
  setComputeRow: Function
  isPrint: any
  beforeSetTableHeadContent: Function
  tableHeadContent: any
  signName: String
  setSignName: Function
  signTime: String
  setSignTime: Function
}
export default function NurseHandBookFormPage(props: Props) {
  const { queryObj } = appStore
  let manualType = queryObj.manualType
  const masterInfo = require(`./config/${manualType}`).default
  const { bodyModal, setBodyModal, formContent, setTableTitle, tableTitle, remark, setRemark,
          showFixHeader, beforeSetTableHeadContent,tableHeadContent, computeRow, setComputeRow, isPrint,
          signName, setSignName, signTime, setSignTime} = props

  const [visible, setVisible]: any = useState(false)
  

  // 取代失焦事件,用来关闭弹窗
  const closeSelect = (e: any) => {
    let targetClass = [...e.target.classList]
    if (!targetClass.includes("common")) {
      setVisible(false)
    }
  }
  useEffect(() => {
    if (!queryObj.isAdd) {
      initBodyModal(masterInfo, setBodyModal, formContent)
    } else {
      initBodyModal(masterInfo, setBodyModal, [])
    }
  }, [props.formContent])

  const CommonHeaderProps = {
    isPrint,showFixHeader,masterInfo,beforeSetTableHeadContent,tableHeadContent
  }

  const CommonProps = {
    isPrint,bodyModal,setBodyModal,visible,setVisible,masterInfo,setComputeRow,computeRow
  }

  return (
    <Wrapper onClickCapture={closeSelect}>
      <div className="page" id="print-content">
        <div className="space-div"></div>
        <div className="pageBox">
          <TableTitle masterInfo={masterInfo} setTableTitle={setTableTitle} tableTitle={tableTitle}></TableTitle>
          <ComplexHeader masterInfo={masterInfo}></ComplexHeader>
          <CommonHeader {...CommonHeaderProps}></CommonHeader>
          <Common {...CommonProps}></Common>
          {masterInfo.remark && <Remark masterInfo={masterInfo} setRemark={setRemark} remark={remark}></Remark>}
          {masterInfo.sign && <SignModule setSignName={setSignName} setSignTime={setSignTime} signName={signName} signTime={signTime}></SignModule>}
        </div>
        <div className="space-div"></div>
      </div>
    </Wrapper >
  )
}

const Wrapper = styled.div`
.page {
  margin: 20px auto;
  padding: 30px;
  padding-top: 0px;
  display: flex;
  background-color: #fff;
  width: fit-content;
  .space-div{
    width:1px;
  }
}
`