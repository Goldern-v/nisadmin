import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
// import PrintPage from "../components/PrintPage";
import User from "src/models/User";
import { appStore } from "src/stores";
export interface Props {
  baseInfo: User;
}

export default function OnePage(props: Props) {
  const { baseInfo } = props;
  // 根据层级获取职级
  const getOfficialRank = (val: any) => {
    const nurseHierarchyObj: any = {
      N0: "轮科护士",
      N1: "初级责任护士",
      N2: "初级责任护士",
      N3: "高级责任护士",
      N4: "高级责任护士",
      N5: "专科护士",
    };
    return nurseHierarchyObj[val];
  };
  return (
    <Wrapper>
      <div className="logo">
        <img
          src={require("../../../../../../assets/images/厚街logo.png")}
          alt=""
        />
      </div>
      <div
        className={[
          "title",
          appStore.HOSPITAL_ID == "hj" ? "none" : "title-1",
        ].join(" ")}
      >
        {appStore.HOSPITAL_Name}
      </div>
      {appStore.HOSPITAL_ID == "hj" ? (
        <div className="title-hj">
          <div className="title">护理人员层级培训实施手册</div>
          <p className="title-bottom">(个人使用)</p>
        </div>
      ) : (
        <div className="title-2 title">护理人员信息档案</div>
      )}
      <div className="input-con">
        <div className="label">姓&nbsp;&nbsp;名：</div>
        <div className="input">{baseInfo.empName}</div>
      </div>
      <div className="input-con">
        <div className="label">科&nbsp;&nbsp;室：</div>
        <div className="input">{baseInfo.deptName}</div>
      </div>
      {appStore.HOSPITAL_ID == "hj" && (
        <div>
          <div className="input-con">
            <div className="label">所在层级：</div>
            <div className="input">
              {getOfficialRank(baseInfo.nurseHierarchy)}
            </div>
          </div>
          <div className="input-con">
            <div className="label">毕业时间：</div>
            <div className="input" />
          </div>
          <div className="input-con">
            <div className="label">启用时间：</div>
            <div className="input" />
          </div>
        </div>
      )}
      <div className="aside">
        {appStore.HOSPITAL_ID == "hj" ? "护理部编制" : appStore.HOSPITAL_Name}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .logo {
    height: 180px;
  }
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
  .title-hj {
    padding-bottom: 220px;
  }
  .title-bottom {
    font-size: 22px;
    text-align: center;
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
