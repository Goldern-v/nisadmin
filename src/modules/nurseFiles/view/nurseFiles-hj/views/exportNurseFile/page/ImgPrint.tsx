import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import PrintPage from "../components/PrintPage";
import { appStore } from "src/stores";

export interface Props {
  imgObj: {
    filterData:any[],
    content:""
  },
  startPage:any[],
  startIndex:0
}

export default function OnePage(props: Props) {
  const { imgObj,startPage,startIndex } = props;
  const showImage = imgObj.filterData.map((item:any,index:any)=>{
    return (
      <PrintPage key={index} pageIndex={startPage[startIndex]+index}>
        <div className="NavTlt">职称证书</div>
        <div className="title">{imgObj.content}{imgObj.filterData.length>1&&index+1}</div>
        <img src={item}/>
      </PrintPage>
    )
  })
  return (
    <Wrapper>
      {showImage}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .NavTlt{
    font-size: 32px;
    padding: 15px 40px;
    font-weight: bold; 
    font-family: "黑体" !important;
  }
  .title{
    font-size: 30px;
    text-align: center;
    padding: 0 100px 15px;
    font-weight: bold;
    font-family: "黑体" !important;
  }
  img{
    width:80%;
    max-width:80%;
    position:relative;
    left:50%;
    transform: translateX(-50%);
  }
`;
