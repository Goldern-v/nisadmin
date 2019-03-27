import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export default function BedSituation () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <div>
      <Head>
        <div className='headLeft'>通知公告</div>
        <div className='headRight'>更多></div>
      </Head>
      <Mid>
        <MidItem>
          <div className='leftItem'>2019年度新护士标准化培训 </div>
          <div className='rightItem'>2019-01-10</div>
        </MidItem>
        <MidItem>
          <div className='leftItem'>2019年度新护士标准化培训 </div>
          <div className='rightItem'>2019-01-10</div>
        </MidItem>
        <MidItem>
          <div className='leftItem'>2019年度新护士标准化培训 </div>
          <div className='rightItem'>2019-01-10</div>
        </MidItem>
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
  padding: 18px 18px 0 18px;
`
const MidItem = styled.div`
  height: 26px;
  line-height: 26px;
  display: flex;
  .leftItem {
    width: 75%;
  }
  .rightItem {
    width: 25%;
    text-align: right;
  }
`
