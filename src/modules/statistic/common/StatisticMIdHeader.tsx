import styled from 'styled-components'
import React from 'react'
// import React, { useState, useEffect } from 'react'

export default function BedSituation () {
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   console.log(count, setCount)
  // })
  return (
    <Con>
      <div className='firstTitle'>神经内科护理单元护士休假统计</div>
      <div className='secondTitle'>日期：2019年1月 至 2019年12月</div>
    </Con>
  )
}

const Con = styled.div`
  margin-bottom: 8px;
  width: 100%;
  text-align: center;
  .firstTitle {
    margin: 0 auto;
    width: 510px;
    height: 29px;
    font-size: 21px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 29px;
    letter-spacing: 1px;
  }
  .secondTitle {
    margin: 0 auto;
    width: 221px;
    height: 18px;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
  }
`
