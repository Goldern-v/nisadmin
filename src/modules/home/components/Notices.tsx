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
  /* padding: 18px 18px 0 18px; */
  height: 282px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
`
const MidItem = styled.div`
  height: 38px;
  line-height: 38px;
  border-bottom: 1px solid #e3e7eb;
  display: flex;
  font-size: 13px;
  .leftItem {
    padding-left: 14px;
    width: 70%;
  }
  .rightItem {
    padding-right: 14px;
    width: 30%;
    text-align: right;
  }
`
