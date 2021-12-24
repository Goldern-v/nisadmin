import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { authStore, appStore, scheduleStore } from "src/stores";

export interface Props {
  setSubmitSign: Function
  submitSign: any
  masterInfo: any
  signList: any
}
export default function SignModule(props: Props) {
  const { submitSign, setSubmitSign, masterInfo, signList } = props
  const [time,setTime] = useState({year:'',month:'',date:''})
  const { queryObj } = appStore
  const signNameChangeValue = (e: any) => {
    submitSign[0].value = e.currentTarget.innerText
    setSubmitSign([...submitSign])
    scheduleStore.setIsSave(true)
  }
  useEffect(()=>{
    if(signList[1]?.value){
      let timeList = signList[1].value.split('-')
      time.year = timeList[0]
      time.month = timeList[1]
      time.date = timeList[2]
      setTime({...time})
    }
  },[signList])
  useEffect(()=>{
    submitSign[1] && time && (submitSign[1].value = `${time.year}-${time.month}-${time.date}`)
    setSubmitSign([...submitSign])
  },[time])
  // 限制字数函数
  const subString = (e:any,strNum:any,type:any) => {
    if([37,38,39,40].includes(e.keyCode))return
    if(e.currentTarget.innerText.length>=strNum && e.keyCode != '8'){ // 达到限制的字数后只允许删除
      let str = e.currentTarget.innerText // 获取当前元素文本内容
      e.currentTarget.innerText = str.substring(0,strNum) // 按照传入的字数进行切割
    }
    time[type] = e.currentTarget.innerText
    setTime({...time})
    if(!e.currentTarget.innerText)return
    let selection:any = getSelection() // 获取光标对象
    selection.extend(e.currentTarget,1) // 选中当前元素
    selection.collapseToEnd() // 将光标聚焦到当前元素末尾
  }
  return (
    <Wrapper>
      <div className="sign">
        { submitSign[0] && (
          <div className="signName">
            <div>{submitSign[0].preName}：</div>
            <div
              className="signNameR" 
              suppressContentEditableWarning
              contentEditable={queryObj.audit ? false : true}
              onBlur={(e) => signNameChangeValue(e)}
            >
              {submitSign[0].value}
            </div>
          </div>
          )
        }
        { submitSign[1] && (
            <div className="signTime">
              <div>{submitSign[1].preName}：</div>
              <div
                className="signTimeR"
                style={{width:"50px"}} 
                suppressContentEditableWarning
                onKeyUp={(e:any)=>subString(e,4,'year')}
                contentEditable={queryObj.audit ? false : true}
              >{time.year}</div>年
              <div
                className="signTimeR" 
                style={{width:"35px"}} 
                suppressContentEditableWarning
                onKeyUp={(e:any)=>subString(e,2,'month')}
                contentEditable={queryObj.audit ? false : true}
              >{time.month}</div>月
              <div
                className="signTimeR" 
                style={{width:"35px"}} 
                suppressContentEditableWarning
                onKeyUp={(e:any)=>subString(e,2,'date')}
                contentEditable={queryObj.audit ? false : true}
              >{time.date}</div>日
            </div>
           )
        }
        
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