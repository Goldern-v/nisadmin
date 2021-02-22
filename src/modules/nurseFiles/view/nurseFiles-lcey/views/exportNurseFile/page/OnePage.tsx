import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import PrintPage from "../components/PrintPage";
import User from "src/models/User";
import { appStore } from "src/stores";
export interface Props {
  baseInfo: User;
}

export default function OnePage(props: Props) {
  const { baseInfo } = props;
  return (
    <Wrapper>
      <div className="title-1 title">{appStore.HOSPITAL_Name}</div>
      <div className="title-2 title">护理人员信息档案</div>
      <div className="input-con">
        <div className="label">姓&nbsp;&nbsp;名：</div>
        <div className="input">{baseInfo.empName}</div>
      </div>
      <div className="input-con">
        <div className="label">科&nbsp;&nbsp;室：</div>
        <div className="input">{baseInfo.deptName}</div>
      </div>
      <div className="aside">{appStore.HOSPITAL_Name}</div>
    </Wrapper>
  );
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
`;
