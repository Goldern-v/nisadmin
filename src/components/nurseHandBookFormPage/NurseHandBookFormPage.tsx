import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { initBodyModal } from "./function/render"
import TableTitle from "./formType/TableTitle"
import CommonHeader from "./formType/CommonHeader"
import Common from "./formType/Common"
import Remark from "./formType/Remark"
import SignModule from "./formType/SignModule"

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
  computeRow: any
  setComputeRow: Function
  isPrint: any
  beforeSetTableHeadContent:Function
  tableHeadContent:any
  setAllList:Function
  allList:any
}
export default function NurseHandBookFormPage(props: Props) {
  const { queryObj } = appStore
  let manualType = queryObj.manualType
  const masterInfo = require(`./config/${manualType}`).default
  const { bodyModal, setBodyModal, formContent, setTableTitle, tableTitle, setRemark, remark,
          showFixHeader, beforeSetTableHeadContent,tableHeadContent, computeRow, setComputeRow, isPrint,
          setAllList, allList } = props

  
  const [visible, setVisible]: any = useState(false)
  const [signList, setSignList]: any = useState({})

  useEffect(() => {
    let formDataDtoList=[
      {
        tableType:"tableHead",
        formContent:tableHeadContent,
      },
      {
        tableType: "tableContent",
        formContent: [],
      },
      {
        tableType: "tableRemark",
        formContent: [{remark:remark}],
      },
      {
        tableType: "line",
        formContent: computeRow,
      },
      {
        tableType: "complexHead",
        formContent: [],
      },
      {
        tableType: "sign",
        formContent: [signList],
      }
    ]
    setAllList(formDataDtoList)
    console.log(allList);
  }, [signList])

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
            isPrint={isPrint} 
            bodyModal={bodyModal}
            setBodyModal={setBodyModal}
            visible={visible}
            setVisible={setVisible}
            masterInfo={masterInfo}
            setComputeRow={setComputeRow}
            computeRow={computeRow}
          ></Common>
          {masterInfo.remark && <Remark masterInfo={masterInfo} setRemark={setRemark} remark={remark}></Remark>}
          {masterInfo.sign && <SignModule setSignList={setSignList}></SignModule>}
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