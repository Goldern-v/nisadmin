import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { authStore, appStore, scheduleStore } from "src/stores";

export interface Props {
  masterInfo: any
}
export default function SignModule(props: Props) {
  const { masterInfo } = props
  const { queryObj } = appStore

  return (
    <Wrapper>
      <div className="sign">
        <div className="signName">
          <div>记录人:</div>
          <div
            className="signNameR" 
            suppressContentEditableWarning
            contentEditable
          >

          </div>
        </div>
        <div className="signTime">
          <div>记录时间:</div>
          <div
            className="signTimeR"
            style={{width:"50px"}} 
            suppressContentEditableWarning
            contentEditable
          ></div>年
          <div
            className="signTimeR" 
            style={{width:"35px"}} 
            suppressContentEditableWarning
            contentEditable
          ></div>月
          <div
            className="signTimeR" 
            style={{width:"35px"}} 
            suppressContentEditableWarning
            contentEditable
          ></div>日
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.sign {
  font-size: 16px;
  width: 100%;
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  .signName{
    width: 50%;
    display: flex;
    justify-content: center;
    .signNameR{
      height: 30px;
      width: 50%;
      border-bottom: 1px solid #000;
      text-align: center;
    }
  }
  .signTime{
    width: 50%;
    display: flex;
    justify-content: center;
    .signTimeR{
      height: 30px;
      border-bottom: 1px solid #000;
      text-align: center;
    }
  }
}
`