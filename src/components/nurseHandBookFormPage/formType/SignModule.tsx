import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { authStore, appStore, scheduleStore } from "src/stores";

export interface Props {
  setSignName: Function
  setSignTime: Function
  signName: String
  signTime: any
}
export default function SignModule(props: Props) {
  const { signName, setSignName, signTime } = props
  const { queryObj } = appStore
  let [year,month,date] = signTime.split("-")
  const signNameChangeValue = (e: any) => {
    setSignName(e.currentTarget.innerText)
    scheduleStore.setIsSave(true)
  }
  // 限制字数函数
  const subString = (e:any,strNum:any) => {
    if(e.currentTarget.innerText.length>=strNum && e.keyCode != '8'){ // 达到限制的字数后只允许删除
      let str = e.currentTarget.innerText // 获取当前元素文本内容
      e.currentTarget.innerText = str.substring(0,strNum) // 按照传入的字数进行切割
      let selection:any = getSelection() // 获取光标对象
      selection.extend(e.currentTarget,1) // 选中当前元素
      selection.collapseToEnd() // 将光标聚焦到当前元素末尾
    }
  }
  return (
    <Wrapper>
      <div className="sign">
        <div className="signName">
          <div>记录人:</div>
          <div
            className="signNameR" 
            suppressContentEditableWarning
            contentEditable
            onBlur={(e) => signNameChangeValue(e)}
          >
            {signName}
          </div>
        </div>
        <div className="signTime">
          <div>记录时间:</div>
          <div
            className="signTimeR"
            style={{width:"50px"}} 
            suppressContentEditableWarning
            onKeyUp={(e:any)=>subString(e,4)}
            contentEditable
          >{year}</div>年
          <div
            className="signTimeR" 
            style={{width:"35px"}} 
            suppressContentEditableWarning
            onKeyUp={(e:any)=>subString(e,2)}
            contentEditable
          >{month}</div>月
          <div
            className="signTimeR" 
            style={{width:"35px"}} 
            suppressContentEditableWarning
            onKeyUp={(e:any)=>subString(e,2)}
            contentEditable
          >{date}</div>日
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