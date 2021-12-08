import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { initBodyModal } from "./function/render"
import Common from "./formType/Common"
import CommonHeader from "./formType/CommonHeader"
import { Input } from 'src/vendors/antd'
import { authStore, appStore, scheduleStore } from "src/stores";
import { Prompt } from 'react-router-dom'

export interface Props {
  bodyModal: any
  setBodyModal: Function
  setTableTitle: Function
  formContent: any
  tableTitle: String
}
export default function NurseHandBookFormPage(props: Props) {
  const { queryObj } = appStore
  let manualType = queryObj.manualType
  const masterInfo = require(`./config/${manualType}`).default
  const { bodyModal, setBodyModal, formContent, setTableTitle, tableTitle } = props
  const [visible, setVisible]: any = useState(false)
  let isSave = scheduleStore.getIsSave()

  // 取代失焦事件,用来关闭弹窗
  const closeSelect = (e: any) => {
    let targetClass = [...e.target.classList]
    if (!targetClass.includes("common")) {
      setVisible(false)
    }
  }

  const changeValue = (e: any, item: any) => {
    setTableTitle(e.currentTarget.innerText)
    scheduleStore.setIsSave(false)
    // filterList(item, item.value)
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
      <Prompt when={!isSave} message={() => '数据还未保存，是否要离开？'} />
      <div className="page">
        <div className="space-div"></div>
        <div className="pageBox">
          <div
            className="table-head"
            suppressContentEditableWarning
            contentEditable
            onInput={(e) => changeValue(e, masterInfo)}
          >
            {tableTitle || masterInfo.tableTitle}
          </div>
          <CommonHeader masterInfo={masterInfo}></CommonHeader>
          <Common
            bodyModal={bodyModal}
            setBodyModal={setBodyModal}
            visible={visible}
            setVisible={setVisible}
            masterInfo={masterInfo}
          ></Common>
        </div>
        <div className="space-div"></div>
      </div>
    </Wrapper >
  )
}

const Wrapper = styled.div`
  .page {
    margin: 20px auto;
    padding: 50px;
    padding-top: 0px;
    display: flex;
    background-color: #fff;
    width: fit-content;
  }
  .space-div{
  }
  .pageBox{
    .table-head {
      font-size: 21px;
      padding: 20px 0;
      text-align: center;
      font-weight: 700;
      font-family: 'simsun', 'Times New Roman', 'Georgia', 'Serif'!important;
    }
  }
  
`