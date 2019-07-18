import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import QualityControlRecordDetailHeader from './components/QualityControlRecordDetailHeader'
import QualityControlRecordDetailMidLeft from './components/QualityControlRecordDetailMidLeft'
import MidRightQualityControlRecordDetail from './components/MidRightQualityControlRecordDetail'
export default function qualityControlRecordDetail() {
  return (
    <Con>
      <HeaderCon>
        <QualityControlRecordDetailHeader />
      </HeaderCon>
      <MidCon>
        <MidConScrollCon>
          <MidLeftCon>
            <QualityControlRecordDetailMidLeft />
          </MidLeftCon>
          <MidRightCon>
            <MidRightQualityControlRecordDetail />
          </MidRightCon>
        </MidConScrollCon>
      </MidCon>
    </Con>
  )
}

const Con = styled.div`
  height: 100%;
  width: 100%；;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`
const HeaderCon = styled.div`
  height: 104px;
  /* background: rgba(255, 255, 255, 1); */
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15); */
  /* border-bottom: 1px solid gray; */
`
const MidCon = styled.div`
  flex: 1;
  height: 0;
`
const MidConScrollCon = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
  overflow-y: auto;
  /* background-color: #fff; */
  /* height: 150%; */
  flex-basis: auto;
`
const MidLeftCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  width: 0;
  min-height: 100%;
  /* height: auto; */
  /* border-right: 1px solid gray; */
  background-color: #fff;
  align-items: stretch;
  .QualityControlRecordDetailMidLeft__Con-sc-1yldaue-0 {
    border-right: 1px solid #e8f6f1;
    /* #EEEEEE */
  }
`
const MidRightCon = styled.div`
  width: 388px;
  min-height: 100%;
  /* background-color: gray; */
  align-items: stretch;
`
