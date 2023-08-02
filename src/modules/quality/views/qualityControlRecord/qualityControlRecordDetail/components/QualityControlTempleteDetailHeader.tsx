import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { appStore, authStore } from "src/stores";
const BG = require("../../../../images/顶部背景.png");
import { Button, message, Modal } from "antd";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import QcPrint from "./QcPrint";
interface Props {
  detailData: any;
  onload: any;
}

export default function QualityControlTempleteDetailHeader(props: Props) {
  const topHeaderBack = () => {
   
    appStore.history.length == 1 ? window.close() : appStore.history.goBack();
  };
  let template = props.detailData.template  || {};
 

  const [printing, setPrinting] = useState(false);


  return (
    <Con>
      <TopHeader>
        <BreadcrumbBox
          style={{
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 2,
          }}
          data={[
            {
              name: '质控模板',
              link:"/qcTemplates",
            },
            {
              name: "模板详情",
            },
          ]}
        />
        <div className="topHeaderTitle">
          <div className="title">{template.qcName}</div>
          <div className="topHeaderButton">
           
            <Button onClick={topHeaderBack}>返回</Button>
          </div>
        </div>
       
      </TopHeader>
      
      <QcPrint
        printing={printing}
        data={props.detailData}
        afterPrinting={() => setPrinting(false)}
      />
    </Con>
  );
}

const Con = styled.div` 
  box-sizing:border-box;
  height: 100%;
  width: 100%;
  /* background: url(${BG}); */
  /* background:linear-gradient(180deg,rgba(248,248,252,1) 0%,rgba(235,236,240,1) 100%); */
  padding-left: 20px;
  /* border-bottom: 1px solid #ddd; */
  position: relative;
`;
const TopHeader = styled.div`
  /* height: 26px;
  line-height: 26px; */
  .topHeaderClass {
    font-size: 14px;
    margin-top: 13px;
    color: #999;
    .topHeaderSpan1 {
      cursor: pointer;
    }
    .topHeaderSpan1:hover {
      color: #00a680;
    }
    .topHeaderSpan2 {
      cursor: pointer;
    }
    .topHeaderSpan2:hover {
      color: #00a680;
    }
  }
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    /* font-weight: bold; */
    .topHeaderButton {
      position: absolute;
      top: 45px;
      right: 20px;
      button {
        margin-left: 10px;
      }
    }
    .title {
      font-weight: bold;
      min-height: 30px;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`;
