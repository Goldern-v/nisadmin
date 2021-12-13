import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { authStore, appStore, scheduleStore } from "src/stores";

export interface Props {
  masterInfo: any
  setRemark: Function
  remark: String
}
export default function Remark(props: Props) {
  const { queryObj } = appStore
  const { setRemark, remark, masterInfo } = props

  const changeValue = (e: any, masterInfo: any) => {
    setRemark(e.currentTarget.innerText)
    scheduleStore.setIsSave(true)
  }

  useEffect(() => {
    setRemark(masterInfo.remark.value)
  }, [])

  return (
    <Wrapper>
      {masterInfo.remark && <div
        className="table-remark"
        style={{width:`${masterInfo.remark.width-(masterInfo.tBody.length-1)}px`}}
        suppressContentEditableWarning
        contentEditable={queryObj.audit ? false : true}
        onBlur={(e) => changeValue(e, masterInfo)}
      >
        {remark}  
      </div>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
.table-remark {
  font-size: 16px;
  min-height: 100px;
  text-align: left;
  border: 1px solid #000;
  border-top: 0;
  margin-right: -1px;
  -webkit-box-pack: start; 
  box-pack: start;
  -webkit-box-align: center; 
  box-align: center;
}
`