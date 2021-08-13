import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

export interface Props { }

export default function 脑卒中高危人群院内综合干预量表(props: any) {

  return <PageGroup>
    <div className="page-item">
      <div className="form-title">
        <div>脑卒中高危人群院内综合干预量表</div>
        <div>（随访部分）</div>
      </div>
      <div
        className="align-center"
        style={{
          margin: '20px 0px'
        }}>
        （适用于国家脑卒中防治基地医院开展住院人群出院1、6、12个月随访和健康管理）
      </div>
      <div className="sub-title">一、随访基本信息</div>
      <div className="form-area">
        <div className="data-row">
          <span className="row-title">本次随访时间：</span>
          <input
            className="underline align-center"
            type="text"
            style={{ width: 80 }} />
          <span>年</span>
          <input
            className="underline align-center"
            type="text"
            style={{ width: 80 }} />
          <span>月</span>
          <input
            className="underline align-center"
            type="text"
            style={{ width: 80 }} />
          <span>日</span>
        </div>
        <div className="data-row">
          <span className="row-title">随访方式：</span>
        </div>
      </div>
    </div>
  </PageGroup>
}
const PageGroup = styled.div`
  .page-item{
    padding: 30px 40px!important;
  }
  .sub-title{
    font-size:14px;
    font-weight: bold;
    line-height: 24px;
  }
  .row-title{
    font-weight: bold;
  }
  .form-area{
    border: 1px solid #000;
    padding: 5px;
  }
`