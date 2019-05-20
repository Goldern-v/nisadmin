import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import PatientAreaMap from './components/PatientAreaMap'

export default function BedSituation () {
  // const [count, setCount] = useState(0)
  useEffect(() => {
    // console.log(count, setCount)
  })
  return (
    <div>
      <Head>
        <div className='headLeft'>患者分布</div>
        <div className='headRight'>更多></div>
      </Head>
      <Mid>
        <MidHeader>
          <div className='headerLeft'>患者合计：</div>
          <div className='headerRight'>
            <div className='headerRightItem'>按地区</div>
            <div className='headerRightItem'>按费别</div>
            <div className='headerRightItem'>按性别</div>
          </div>
        </MidHeader>
        <PatientAreaMap />
      </Mid>
    </div>
  )
}

const Head = styled.div`
  height: 37px;
  line-height: 37px;
  width: 100%;
  background-color: rgba(245, 246, 247, 1);
  .headLeft {
    padding-left: 17px;
    float: left;
    font-size: 13px;
    letter-spacing: 1px;
    color: #333333;
  }
  .headRight {
    padding-right: 14px;
    float: right;
    font-size: 13px;
    letter-spacing: 1px;
    color: #999999;
  }
`
const Mid = styled.div`
  /* padding: 0 18px; */
`
const MidHeader = styled.div`
  padding: 0 18px;
  height: 42px;
  line-height: 42px;
  display: flex;
  .headerLeft {
    width: 50%;
  }
  .headerRight {
    margin-top: 7px;
    height: 26px;
    line-height: 26px;
    width: 50%;
    text-align: center;
    color: #333333;
    background-color: rgba(241, 244, 246, 1);
    display: flex;
    z-index: 2;
    cursor: pointer;
    .headerRightItem {
      margin: -1px 0 0 -1px;
      box-sizing: border-box;
      border: 1px solid #c0cbce;
      width: 33.33%;
    }
    .headerRightItem:hover {
      border-color: #0092fe;
      color: #0092fe;
    }
  }
`
