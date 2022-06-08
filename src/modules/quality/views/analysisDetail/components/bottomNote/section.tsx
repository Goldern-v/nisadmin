import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
export default function Bottom() {
  useEffect(() => {})
  return (
    <Wrapper>
      <div className='bottomText'>
          <div>注：1、填写本表要求准确、清楚、不漏填项目，质控数据统计为当月</div>
          <div>2、科室护士长报表每月5日前完成，提交科护士长审查签阅后归档</div>
          <div>3、科护士长报表每月5日前完成，提交护理部审查签阅后归档</div>
          <div>4、护理部每月10日前汇总护理部报表报医院质控部</div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 60px;
  padding: 10px 60px 20px;
  position: relative;
  .titleName {
    font-size: 28px;
    text-align: center;
    color: #000;
  }
`