import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import QualityControlRecordHeader from './components/QualityControlRecordHeader'
import QualityControlRecordTable from './components/QualityControlRecordTable'
import PaginationCon from './components/PaginationCon'
import { Pagination, Spin } from 'antd'
import { qualityControlRecordApi } from 'src/modules/quality/views/qualityControlRecord/api/QualityControlRecordApi'
export interface Props extends RouteComponentProps {}
/** 一行的列数 */
let rowNum: number = 5
export default function QualityControlRecord() {
  let [loading, setLoading] = useState(false)
  const testClick = () => {
    setLoading(true)
    qualityControlRecordApi.instanceGetPageByCondition().then((res: any) => {
      setLoading(false)
    })
    console.log('5555555')
  }
  return (
    <Wrapper>
      <HeaderCon>
        <QualityControlRecordHeader refreshData={testClick} />
        {/* <button onClick={testClick}>fffff</button> */}
      </HeaderCon>
      <MidCon>
        <SpinCon>
          {loading ? (
            <div className='LoadingCon'>
              <Spin size='large' spinning={loading} className='SpinLoadingClass' />
            </div>
          ) : (
            ''
          )}
        </SpinCon>
        <QualityControlRecordTable />
      </MidCon>
      {/* <PaginationContent>
        <PaginationCon rowNum={rowNum} />
      </PaginationContent> */}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  flex-direction: column;
`
const HeaderCon = styled.div`
  /* height: 66px; */
`

const MidCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  height: 0;
  margin: 0 15px 5px 15px;
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  /* padding: 20px; */
  /* padding-top: 10px; */
`
// const PaginationContent = styled.div`
//   /* margin-top: 30px; */
//   /* height: 280px; */
//   padding: 15px 30px;
//
const SpinCon = styled.div`
  .LoadingCon {
    z-index: 99;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.2);
    .SpinLoadingClass {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
