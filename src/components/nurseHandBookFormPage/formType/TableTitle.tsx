import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { authStore, appStore, scheduleStore } from "src/stores";

export interface Props {
  masterInfo: any
  setTableTitle: Function
  tableTitle: String
}
export default function TableTitle(props: Props) {
  const { setTableTitle, tableTitle, masterInfo } = props
  const { queryObj } = appStore

  const changeValue = (e: any, masterInfo: any) => {
    setTableTitle(e.currentTarget.innerText)
    scheduleStore.setIsSave(true)
  }

  useEffect(() => {
    if (queryObj.isAdd) {
      setTableTitle(masterInfo.tableTitle.value)
    }
  }, [])

  return (
    <Wrapper>
      <div
        className="table-title"
        style={{width:`${masterInfo.tableTitle.width}px`}}
        suppressContentEditableWarning
        contentEditable={queryObj.audit ? false : true}
        onBlur={(e) => changeValue(e, masterInfo)}
      >
        {tableTitle}  
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.table-title {
  font-size: 21px;
  padding: 10px 0;
  text-align: center;
  font-weight: 700;
  font-family: 'simsun', 'Times New Roman', 'Georgia', 'Serif'!important;
  border: 1px solid #000;
  border-bottom: 0;
  margin-right: -1px;
  margin-top: 30px;
}
`