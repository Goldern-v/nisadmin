import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { initBodyModal } from "./function/render"
import TableTitle from "./formType/TableTitle"
import ComplexHeader from "./formType/ComplexHeader"
import CommonHeader from "./formType/CommonHeader"
import LeftHeader from "./formType/LeftHeader"
import Common from "./formType/Common"
import Remark from "./formType/Remark"
import SignModule from "./formType/SignModule"

import { Input } from 'src/vendors/antd'
import { authStore, appStore, scheduleStore } from "src/stores";
import { Prompt } from 'react-router-dom'
import moment from "moment"
export interface Props {
  complexHeaderContent:any
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
  signList: any
  setSubmitSign: Function
  submitSign: any
  setComplexHeadList: Function
  complexHeadList: any
  setOnScroll: Function
}
export default function NurseHandBookFormPage(props: Props) {
  const { queryObj } = appStore
  const [copyRow, setCopyRow] = useState({})
  const [menuType, setMenuType] = useState('select')

  let manualType = queryObj.manualType
  let masterInfo:any = []
  try{
    masterInfo = require(`./config/${manualType}`).default
	}catch(err){				
		masterInfo = require(`./config/jm_arrange`).default
	}
  
  const { bodyModal, setBodyModal, formContent, setTableTitle, tableTitle, remark, setRemark,
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
    console.log(targetClass);
    
    if (!targetClass.includes("common")) {
      setVisible(templeVisible)
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
          <TableTitle masterInfo={masterInfo} setTableTitle={setTableTitle} tableTitle={tableTitle}></TableTitle>
          {masterInfo.complexHead && <ComplexHeader setMenuType={setMenuType} menuType={menuType} setComplexSelectVisible={setComplexSelectVisible} complexSelectVisible={complexSelectVisible} complexHeaderContent={complexHeaderContent} masterInfo={masterInfo} setComplexHeadList={setComplexHeadList} complexHeadList={complexHeadList}></ComplexHeader>}
          {masterInfo.tBody.map((body:any,idx:any)=>{
            return (
            <div key={idx}>
              {/* {masterInfo.leftHead && <LeftHeader masterInfo={masterInfo}></LeftHeader>} */}
              {masterInfo.tHead && masterInfo.tHead[idx] && <CommonHeader 
                isPrint={isPrint} 
                showFixHeader={masterInfo.hiddenFixHeader?false:showFixHeader} 
                tHead={masterInfo.tHead[idx]}
                beforeSetTableHeadContent={beforeSetTableHeadContent} 
                tableHeadContent
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
}
`