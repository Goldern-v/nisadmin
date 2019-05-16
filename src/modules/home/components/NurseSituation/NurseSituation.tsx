import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import JobTitleMap from './components/JobTitleMap'
import { Button, Radio, Icon } from 'antd'

export default function BedSituation () {
  const [count, setCount] = useState(0)
  const [titleBy, setTitleBy] = useState('按职称')
  useEffect(() => {
    console.log(count, setCount)
  })
  // const selectChange = () => {}
  const choose1 = () => {
    setTitleBy('按职称')
  }
  const choose2 = () => {
    setTitleBy('按层级')
  }
  const choose3 = () => {
    setTitleBy('按工龄')
  }
  return (
    <div>
      <Head>
        <div className='headLeft'>护理人员情况</div>
        <div className='headRight'>更多 ></div>
      </Head>
      <Mid>
        <MidHeader>
          <div className='headerLeft'>护理人员合计：</div>
          <div className='headerRight'>
            <div className='headerRightItem' onClick={choose1}>
              按职称
            </div>
            <div className='headerRightItem' onClick={choose2}>
              按层级
            </div>
            <div className='headerRightItem' onClick={choose3}>
              按工龄
            </div>
            {/* <Radio.Group defaultValue='按职称' size='small' onChange={selectChange}>
              <Radio.Button value='按职称'>按职称</Radio.Button>
              <Radio.Button value='按层级'>按层级</Radio.Button>
              <Radio.Button value='按工龄'>按工龄</Radio.Button>
            </Radio.Group> */}
          </div>
        </MidHeader>
        <JobTitleMap titleByGet={titleBy} />
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
    .ant-radio-button-wrapper {
      background-color: red !important;
    }
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
    width: 50%;
    height: 26px;
    line-height: 26px;
    text-align: center;
    display: flex;
    color: #333333;
    background-color: rgba(241, 244, 246, 1);
    /* border: 1px solid #c0cbce; */
    cursor: pointer;
    .headerRightItem {
      margin: -1px 0 0 -1px;
      box-sizing: border-box;
      height: 100%;
      width: 33.33%;
      border: 1px solid #c0cbce;
    }
    .headerRightItem:hover {
      border-color: #0092fe;
      color: #0092fe;
      /* background-color: #5bbe98; */
    }
  }
`
