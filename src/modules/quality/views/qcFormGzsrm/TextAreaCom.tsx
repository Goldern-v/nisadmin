import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { qcFormGzsrmService } from './api/qcFormGzsrmService'
import { message as Message } from 'antd'

export interface Props {
  text: string,
  label: string,
  qcMasterId: Number,
  input: Function,
}
export default function TextAreaCom(props: Props) {
  const save = () => {
    qcFormGzsrmService[props.label]({
      qcMasterId: props.qcMasterId,
      [props.label]: props.text
    }).then((res: any) => {
      Message.success('保存成功')
    }).catch((err: any) => {
      Message.warning(err)
    })
  }
  return <Wrapper>
    <textarea value={props.text} onInput={(e) => props.input(e.currentTarget.value)}></textarea>
    <div className="btn-box">
      <button onClick={save}>保存</button>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  textarea{
    resize:none;
    overflow-y:auto;
    width:100%;
    outline:none;
    border:none;
    background:none;
  }
  .btn-box{
    border-top:1px solid #ccc;
  }
  button{
    background:none;
    outline:none;
    border:none;
    cursor:pointer;
  }
  button:hover{
    color:#00a680;
  }
`