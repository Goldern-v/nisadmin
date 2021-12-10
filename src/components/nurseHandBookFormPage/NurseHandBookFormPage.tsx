import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { initBodyModal } from "./function/render"
import TableTitle from "./formType/TableTitle"
import CommonHeader from "./formType/CommonHeader"
import Common from "./formType/Common"
import Remark from "./formType/Remark"

import { Input } from 'src/vendors/antd'
import { authStore, appStore, scheduleStore } from "src/stores";
import { Prompt } from 'react-router-dom'

export interface Props {
  bodyModal: any
  setBodyModal: Function
  setTableTitle: Function
  formContent: any
  tableTitle: String
  showFixHeader: boolean
  remark: String
  setRemark: Function
  isPrint: any
  beforeSetTableHeadContent:Function
  tableHeadContent:any
}
export default function NurseHandBookFormPage(props: Props) {
  const { queryObj } = appStore
  let manualType = queryObj.manualType
  const masterInfo = require(`./config/${manualType}`).default
  const { bodyModal, setBodyModal, formContent, setTableTitle, tableTitle, 
          showFixHeader, setRemark, remark, isPrint, beforeSetTableHeadContent,tableHeadContent,
        } = props
  const [visible, setVisible]: any = useState(false)

  // 取代失焦事件,用来关闭弹窗
  const closeSelect = (e: any) => {
    let targetClass = [...e.target.classList]
    if (!targetClass.includes("common")) {
      setVisible(false)
    }
  }
  useEffect(() => {
    if (queryObj.isAdd) {
      setTableTitle(masterInfo.tableTitle)
    } 
  }, [])

  useEffect(() => {
    if (!queryObj.isAdd) {
      initBodyModal(masterInfo, setBodyModal, formContent)
    } else {
      initBodyModal(masterInfo, setBodyModal, [])
    }
  }, [props.formContent])

  return (
    <Wrapper onClickCapture={closeSelect}>
      <div className="page" id="print-content">
        <div className="space-div"></div>
        <div className="pageBox">
          <TableTitle masterInfo={masterInfo} setTableTitle={setTableTitle} tableTitle={tableTitle}></TableTitle>
          <CommonHeader 
            isPrint={isPrint} 
            showFixHeader={showFixHeader} 
            masterInfo={masterInfo}
            beforeSetTableHeadContent={beforeSetTableHeadContent}
            tableHeadContent={tableHeadContent}
            ></CommonHeader>
          <Common
            bodyModal={bodyModal}
            setBodyModal={setBodyModal}
            visible={visible}
            setVisible={setVisible}
            masterInfo={masterInfo}
          ></Common>
          {masterInfo.remark && <Remark masterInfo={masterInfo} setRemark={setRemark} remark={remark}></Remark>}
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