import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { authStore, appStore, scheduleStore } from "src/stores";
import moment from "moment";

export interface Props {
  setSubmitSign: Function
  submitSign: any
  masterInfo: any
  signList: any
}
export default function SignModule(props: Props) {
  const { submitSign, setSubmitSign, masterInfo, signList } = props
  const { queryObj } = appStore
  const signNameChangeValue = (e:any,item: any) => {
    item.value = e.currentTarget.innerText
    setSubmitSign([...submitSign])
    scheduleStore.setIsSave(true)
  }

  const handlerClick = (e:any,item: any) => {
    if(item.key.includes("Time")){
      if(!item.value){
        item.value = moment().format('YYYY-MM-DD HH:mm')
        setSubmitSign([...submitSign])
        scheduleStore.setIsSave(true)
      }
    }
  }

  return (
    <Wrapper>
      <div className="sign">
        {
          submitSign.map((item:any)=> {
            return <div 
                    className="signList" 
                    style={{ 
                      width: item.width ? item.width : "50%" , 
                      visibility: item.hidden ? "hidden":"visible"
                    }}>
                      <div>{item.preName}：</div>
                      {
                        <div
                          className="signNameR"
                          suppressContentEditableWarning
                          contentEditable={queryObj.audit ? false : true}
                          onBlur={(e) => signNameChangeValue(e,item)}
                          onClick={(e) => handlerClick(e, item)}
                        >
                          {item.value}
                        </div>
                      }
                    </div>
          })
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.sign {
  font-size: 15px;
  width: 100%;
  min-height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
    .signList{
      height: 30px;
      display: flex;
      justify-content: center;
      .signNameR{
        height: 30px;
        width: 60%;
        border-bottom: 1px solid #000;
        text-align: center;
        font-size: 14px;
      }
      .signTime{
        display: flex;
        justify-content: start;
        width: 60%;
        .signTimeR{
          height: 30px;
          border-bottom: 1px solid #000;
          text-align: center;
        }
      }
    }
}
`