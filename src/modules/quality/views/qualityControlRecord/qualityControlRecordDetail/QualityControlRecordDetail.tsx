import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import QualityControlRecordDetailHeader from './components/QualityControlRecordDetailHeader'
import QualityControlRecordDetailMidLeft from './components/QualityControlRecordDetailMidLeft'
import MidRightQualityControlRecordDetail from './components/MidRightQualityControlRecordDetail'
import { qualityControlRecordApi } from 'src/modules/quality/views/qualityControlRecord/api/QualityControlRecordApi'
import { Spin } from 'antd'
export default function qualityControlRecordDetail() {
  let [detailData, setDetailData]: any = useState([])
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    qualityControlRecordApi.qcItemInstanceGet().then((res) => {
      setDetailData(res.data)
      setLoading(false)
    })
  }, [])
  const testClick = () => {
    qualityControlRecordApi.qcItemInstanceGet().then((res) => {
      // setDetailData(res.data)
    })
  }
  return (
    <Con>
      <HeaderCon>
        <QualityControlRecordDetailHeader />
      </HeaderCon>
      <MidCon>
        <MidConScrollCon>
          <MidLeftCon>
            <button onClick={testClick}>testClick</button>
            <QualityControlRecordDetailMidLeft detailData={detailData} />
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
  height: 95px;
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
  overflow: hidden;
  /* background-color: #fff; */
  /* height: 150%; */
  /* flex-basis: auto; */
`
const MidLeftCon = styled.div`
  box-sizing: border-box;
  padding: 20px 153px;
  flex: 1;
  width: 0;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
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

  /* height: auto; */
  /* border-right: 1px solid gray; */
  background-color: #eeeeee;
  align-items: stretch;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
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
  .QualityControlRecordDetailMidLeft__Con-sc-1yldaue-0 {
    /* border-right: 1px solid #e8f6f1; */
    /* background-color: #eeeeee; */
    /* #EEEEEE */
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  }
`
const MidRightCon = styled.div`
  width: 317px;
  height: 100%;
  /* background-color: gray; */
  align-items: stretch;
  background: rgba(247, 250, 250, 1);
  overflow-y: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
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
