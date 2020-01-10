import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {
  labelWidth?: number
}

export default function BaseSetting(props: Props) {
  const { labelWidth } = props
  const _labelWidth = labelWidth ? `${labelWidth}px` : '110px'

  return <Wrapper>
    <div className="content-item-title">基本设置</div>
    <div className="row">
      <div className="label" style={{ width: _labelWidth }}>培训开始时间：</div>
      <div className="content">2019-01-01 00:00</div>
    </div>
    <div className="row">
      <div className="label" style={{ width: _labelWidth }}>培训开放时间：</div>
      <div className="content">5小时  （即2019-01-01 05:00结束）</div>
    </div>
    <div className="row">
      <div className="label" style={{ width: _labelWidth }}>组织方式：</div>
      <div className="content">线下</div>
    </div>
    <div className="row">
      <div className="label" style={{ width: _labelWidth }}>通知详情：</div>
      <div className="content">这是一段通知详情这是一段通知详情这是一段通知详情这是一段通知详情这是一段通知详情这是一段通知详情这是一段通知详情</div>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  .row{
    margin-bottom: 5px;
    width: 100%;
    font-size: 13px;
    overflow: hidden;
    .label{
      float: left;
      text-align: right;
    }
    .content{
      overflow: hidden;
      padding-right: 50px;
    }
  }
`