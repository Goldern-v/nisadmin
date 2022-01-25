import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { initBodyModal, noSaveBodyModal } from "./function/render"
import TableTitle from "./formType/TableTitle"
import ComplexHeader from "./formType/ComplexHeader"
import CommonHeader from "./formType/CommonHeader"
import Common from "./formType/Common"
import Remark from "./formType/Remark"
import SignModule from "./formType/SignModule"
import { Button, Modal, message, Spin } from 'antd'
import { authStore, appStore, scheduleStore } from "src/stores";
import { Prompt } from 'react-router-dom'
import moment from "moment"
export interface Props {
  complexHeaderContent:any
  bodyModal: any
  setBodyModal: Function
  setTableTitle: Function
  date: any
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
  signList: any
  setSubmitSign: Function
  submitSign: any
  setComplexHeadList: Function
  complexHeadList: any
  setOnScroll: Function
  synchronousData: Array<any>
}
export default function NurseHandBookFormPage(props: Props) {
  const { queryObj } = appStore
  const [copyRow, setCopyRow] = useState({})
  const [menuType, setMenuType] = useState('select')
  let manualType = queryObj.manualType
  let HOSPITAL_ID = appStore.HOSPITAL_ID
  let masterInfo:any = []
  try{
    masterInfo = require(`./config/${HOSPITAL_ID}/${manualType}`).default
	}catch(err){				
		masterInfo = require(`./config/jmfy/jm_launchPlan`).default
	}
  
  const { bodyModal, setBodyModal, formContent, synchronousData, setTableTitle, tableTitle, remark, setRemark, date,
          showFixHeader, beforeSetTableHeadContent,tableHeadContent, computeRow, setComputeRow, isPrint,
          signList, setSubmitSign, submitSign, setComplexHeadList, complexHeadList,complexHeaderContent,setOnScroll} = props

  const [visible, setVisible]: any = useState([])
  const [complexSelectVisible, setComplexSelectVisible]: any = useState(false)

  //控制滚动事件
  if(masterInfo.hiddenFixHeader){
    setOnScroll(false)
  }else{
    setOnScroll(true)
  }

  let templeVisible = masterInfo.tBody.map((item:any)=>false)
  // 取代失焦事件,用来关闭弹窗
  const closeSelect = (e: any) => {
    let targetClass = [...e.target.classList]
    
    if (!targetClass.includes("common")) {
      setVisible(templeVisible)
    }
    if (!targetClass.includes("complexHeaderRight")) {
      setComplexSelectVisible(false)
    }
  }
  useEffect(() => {
    if (!queryObj.isAdd) {
      initBodyModal(masterInfo, setBodyModal, formContent)
    } else {
      initBodyModal(masterInfo, setBodyModal, [])
    }
  }, [formContent])
  
  useEffect(() => {
    if(synchronousData.length != 0){
      noSaveBodyModal(masterInfo, setBodyModal, synchronousData)
    }
  }, [synchronousData])
  
  useEffect(() => {
    if (!queryObj.isAdd) {
      setSubmitSign(signList)
    } else {
      setSubmitSign(Object.values(JSON.parse(JSON.stringify(masterInfo.sign||[]))))
    }
  }, [signList])

  useEffect(() => {
    setVisible(templeVisible)
  }, [])


  const CommonProps = {
    
  }

  return (
    <Wrapper onClickCapture={closeSelect}>
      <div className="page" id="print-content">
        <div className="space-div"></div>
        <div className="pageBox">
          <TableTitle masterInfo={masterInfo} setTableTitle={setTableTitle} tableTitle={tableTitle} date={date}></TableTitle>
          {masterInfo.complexHead && <ComplexHeader setMenuType={setMenuType} menuType={menuType} setComplexSelectVisible={setComplexSelectVisible} complexSelectVisible={complexSelectVisible} complexHeaderContent={complexHeaderContent} masterInfo={masterInfo} setComplexHeadList={setComplexHeadList} complexHeadList={complexHeadList}></ComplexHeader>}
          {masterInfo.tBody.map((body:any,idx:any)=>{
            return (
            <div key={idx}>
              {masterInfo.tHead && masterInfo.tHead[idx] && <CommonHeader 
                isPrint={isPrint} 
                showFixHeader={masterInfo.hiddenFixHeader?false:showFixHeader} 
                tHead={masterInfo.tHead[idx]}
                beforeSetTableHeadContent={beforeSetTableHeadContent} 
                tableHeadContent={tableHeadContent}
              ></CommonHeader>}
              {<Common 
                isPrint={isPrint} 
                bodyModal={bodyModal}
                bodyIdx={idx}
                menuType={menuType}
                setMenuType={setMenuType}
                setBodyModal={setBodyModal} 
                visible={visible} 
                setVisible = {setVisible}
                masterInfo ={masterInfo}
                setComputeRow = {setComputeRow}
                computeRow = {computeRow}
                templeVisible = {templeVisible}
                copyRow={copyRow}
                setCopyRow={setCopyRow}
              ></Common>}
            </div>)
          })}
          {masterInfo.remark && <Remark masterInfo={masterInfo} setRemark={setRemark} remark={remark}></Remark>}
          {masterInfo.borderMessage &&<div className='borderMessage' style={{width:masterInfo.tableTitle.width}}>{masterInfo.borderMessage}</div>}
          {masterInfo.sign && <SignModule masterInfo={masterInfo} setSubmitSign={setSubmitSign} submitSign={submitSign} signList={signList}></SignModule>}
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
  .borderMessage{
    min-height: 20px;
    font-size: 15px;
    margin-right:-1px; 
    margin-bottom:-1px;
  }
}
`