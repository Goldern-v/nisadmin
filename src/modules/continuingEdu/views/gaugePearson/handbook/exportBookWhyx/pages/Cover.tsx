import styled from 'styled-components'
import React from 'react'
import { appStore } from 'src/stores'
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model";
export default function Cover() {
  const { info } = handbookModel
  return <Wrapper>
    <div className="title-1 title">{appStore.HOSPITAL_Name}</div>
    <div className="title-2 title">规培生手册</div>
    <div className="input-con">
      <div className="label">姓&nbsp;&nbsp;名：</div>
      <div className="input">{info.name}</div>
    </div>
    <div className="input-con">
      <div className="label">科&nbsp;&nbsp;室：</div>
      <div className="input">{info.studyDeptName}</div>
    </div>
    <div className="aside">{appStore.HOSPITAL_Name}</div>
  </Wrapper>
}
const Wrapper = styled.div`
  .title {
    font-size: 46px;
    text-align: center;
    font-weight: bold;
    font-family: "黑体" !important;
  }
  .title-1 {
    padding-top: 100px;
  }
  .title-2 {
    padding-top: 50px;
    padding-bottom: 300px;
  }
  .input-con {
    text-align: center;
    margin-bottom: 5px;
  }
  .label {
    font-size: 25px;
    font-weight: bold;
    display: inline-block;
  }
  .input {
    display: inline-block;
    width: 220px;
    height: 30px;
    border-bottom: 1px solid #000;
    font-size: 20px;
  }
  .aside {
    font-size: 20px;
    text-align: center;
    margin-top: 135px;
  }
`