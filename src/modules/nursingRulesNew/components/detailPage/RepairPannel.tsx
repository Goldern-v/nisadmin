import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { detailPageModel } from './../../models/detailPageModel'
// import {nursingRulesApiService} from './../../api/nursingRulesNewService'
export interface Props { }

export default observer(function RepairPannel() {
  const { repairList } = detailPageModel

  return <Wrapper>
    {repairList.map((item: any, idx: number) => <div className="item" key={idx}>
      <div className="main-title">{item.bookName}</div>
      <div className="sub">
        <div className="sub-item">
          <span className="icon">
            <img src={require('./../../assets/上传@2x.png')} alt="" />
          </span>
          <span>上传:</span>
          <span>{item.upLoadTime}</span>
          <span>{item.upLoaderEmpName}</span>
        </div>
        <div className="sub-item">
          <span className="icon">
            <img src={require('./../../assets/审核@2x.png')} alt="" />
          </span>
          <span>审核:</span>
          <span>{item.auditTime}</span>
          <span>{item.auditorEmpName}</span>
        </div>
      </div>
      <div className="desc">{item.bookBrief}</div>
    </div>)}
    <div className="nope">{repairList.length <= 0 ? '暂无修订记录' : ''}</div>
  </Wrapper>
})

const Wrapper = styled.div`
.item{
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
  .main-title{
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }
  .sub-item{
    display: inline-block;
    margin-right: 10px;
    >span{
      margin-right: 5px;
    }
  }
  .desc{
    margin-top: 5px;
  }
  .icon{
    width: 12px;
    position: relative;
    top: -2px;
  }
  .nope{
    font-size: 14px;
    line-height: 36px;
    text-align: center;
  }
`