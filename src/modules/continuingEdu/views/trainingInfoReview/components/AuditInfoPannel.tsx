import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Icon } from 'antd'
export interface Props { }
import { trainingInfoReviewModel } from './../model/TrainingInfoReviewModel'
import { observer } from 'mobx-react-lite'

function AuditInfoPannel() {
  const { auditInfo, auditLoading, taskTypeName } = trainingInfoReviewModel

  // console.log(JSON.parse(JSON.stringify(auditInfo)))

  return <Wrapper>
    <div className="audit-title">审核过程</div>
    <div className="audit-list">
      {auditInfo.map((item: any, idx: number) =>
        <div className="audit-item" key={idx}>
          <div className="emp-img">
            <img src={item.nearImageUrl} alt="" />
            {!!item.flag && (item.taskType == 4 ? <Icon type="close-circle" theme="filled" className="step-status error" /> : <Icon type="check-circle" theme="filled" className="step-status success" />)}
          </div>
          <div className="info">
            <div className="step-title">
              <span>{item.taskDesc}</span>
              {item.taskType == 4 && <span> ({taskTypeName(item.taskType)})</span>}
            </div>
            <div className="emp-name">{item.handlerEmpName}</div>
            {item.flag == 1 && <div className="emp-name">{item.handleTime}({item.handleDayOfWeek})</div>}
            {item.flag !== 1 && <div className="emp-name">审核中 耗时{item.takeTimeDesc}</div>}
            {item.handleRemark && <div className="desc">{item.handleRemark}</div>}
          </div>
        </div>)}
    </div>
  </Wrapper>
}

export default observer(AuditInfoPannel)

const Wrapper = styled.div`
  background: #fff;
  border-left: 1px solid #ddd;
  padding: 10px 15px;
  width: 270px;
  height: 100%;
  float: right;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eaeaea;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #c2c2c2;
  }
  ::-webkit-scrollbar-track {
    border-radius: 50px;
    background-color: #eaeaea;
  }
  .audit-title{
    font-size: 14px;
    margin: 10px 0;
    ::before{
      content:'';
      display: inline-block;
      height: 18px;
      width: 5px;
      background: rgba(112, 182, 3, 1);
      vertical-align: sub;
      margin-right: 10px;
    }
  }
  .audit-item{
    color: #666;
    padding-top: 10px;
    position: relative;
    &::before{
      position: absolute;
      content: '';
      width:1px;
      height: 100%;
      background: #ddd;
      top: 0;
      left: 20px;
    }
    &:first-of-type{
      padding-top:0;
    }
    &:last-of-type{
      &::before{
        height:40px;
      }
    }
    .emp-img{
      width: 40px;
      position: relative;
      float: left;
      img{
        height: 40px;
        width: 40px;
        background: #ddd;
        border-radius: 50%;
        object-fit: cover;
        display:inline-block;
        background: url('${require('src/assets/护士默认头像.png')}');
        background-size: 100%;
      }
      .step-status{
        position:absolute;
        right: 0;
        bottom: 0;
        background: #fff;
        border-radius: 50%;
        &.error{
          color: red;
        }
        &.success{
          color: rgb(2, 159, 123);
        }
      }
    }
    .info{
      font-size: 13px;
      padding-left: 45px;
      .desc{
        padding: 5px;
        border-radius: 3px;
        background: #eee;
      }
    }
  }
`