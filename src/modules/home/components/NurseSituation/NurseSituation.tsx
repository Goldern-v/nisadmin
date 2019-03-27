import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import JobTitleMap from './components/JobTitleMap'

export default function BedSituation () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <div>
      <Head>
        <div className='headLeft'>护理人员情况</div>
        <div className='headRight'>更多></div>
      </Head>
      <Mid>
        <MidHeader>
          <div className='headerLeft'>护理人员合计：</div>
          <div className='headerRight'>
            <div className='headerRightItem'>按职称</div>
            <div className='headerRightItem'>按层级</div>
            <div className='headerRightItem'>按工龄</div>
          </div>
        </MidHeader>
        <JobTitleMap />
      </Mid>
    </div>
  )
}

const Head = styled.div`
  height: 32px;
  line-height: 32px;
  width: 100%;
  background-color: #3493dd;
  .headLeft {
    padding-left: 14px;
    float: left;
    font-size: 16px;
    color: #ffffff;
  }
  .headRight {
    padding-right: 14px;
    float: right;
    font-size: 14px;
    color: #ffffff;
  }
`
const Mid = styled.div`
  padding: 0 18px;
`
const MidHeader = styled.div`
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
    display: flex;
    cursor: pointer;
    .headerRightItem {
      border: 1px solid #a1a1a1;
      width: 33.33%;
    }
    .headerRightItem:hover {
      background-color: #bcbcbc;
    }
  }
`
