import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import ApplicationN1 from "./view/ApplicationN1";

export default observer(function PromotionTable(){
  return(
    <Wrapper>
      <div className="table-left">
        <ApplicationN1></ApplicationN1>
      </div>
      <div className="table-right">
        <div className="right-head">审核过程</div>
        <div className="right-nomains">暂无审核记录~</div>
      </div>
    </Wrapper>
  )

})

const Wrapper = styled.div`
  height: 100%;
  padding: 5px ;
  background-color: #f2f2f2;
  display: flex;
  .table-left{
    flex:1;
  }
  .table-right{
    width: 300px;
    height: 680px;
    margin-left: 7px;
    background-color: #fff;
    box-shadow: 0px 1px 5px 0px #999;
    .right-head{
      display: flex;
      align-items: center;
      font-size: 21px;
      height: 45px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      ::before{
        content: '';
        margin-left: 20px ;
        display: block;
        width: 10px;
        height: 21px;
        background-color: #00a680;
      }
    }
    .right-nomains{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ccc;
      font-size: 17px;
    }
  }
`