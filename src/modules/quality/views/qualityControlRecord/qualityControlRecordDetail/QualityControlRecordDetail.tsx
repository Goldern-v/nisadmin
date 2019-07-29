import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import QualityControlRecordDetailHeader from './components/QualityControlRecordDetailHeader'
import QualityControlRecordDetailMidLeft from './components/QualityControlRecordDetailMidLeft'
import MidRightQualityControlRecordDetail from './components/MidRightQualityControlRecordDetail'
import { qualityControlRecordApi } from 'src/modules/quality/views/qualityControlRecord/api/QualityControlRecordApi'
import { Spin } from 'antd'
import { ScrollBox } from 'src/components/common'
import { appStore } from 'src/stores'
export default function qualityControlRecordDetail() {
  let [detailData, setDetailData]: any = useState([])
  let [loading, setLoading] = useState(false)

  const onload = () => {
    let id = appStore.match.params.id
    setLoading(true)
    qualityControlRecordApi.qcItemInstanceGet(id).then((res) => {
      setDetailData(res.data)
      setLoading(false)
    })
  }
  useEffect(() => {
    onload()
  }, [])

  return (
    <Con>
      <HeaderCon>
        <QualityControlRecordDetailHeader detailData={detailData} onload={onload} />
      </HeaderCon>
      <MidCon>
        <MidConScrollCon>
          <SpinCon>
            {loading ? (
              <div className='LoadingCon'>
                <Spin spinning={loading} className='SpinLoadingClass' />
              </div>
            ) : (
              ''
            )}
          </SpinCon>
          <MidLeftCon>
            {/* <button onClick={testClick}>testClick</button> */}
            <QualityControlRecordDetailMidLeft detailData={detailData} />
          </MidLeftCon>
          <MidRightCon>
            <MidRightQualityControlRecordDetail detailData={detailData} />
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
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15); */
  /* border-bottom: 1px solid gray; */
`
const MidCon = styled.div`
  flex: 1;
  height: calc(100vh - 145px);
`
const MidConScrollCon = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  position: relative;

  /* background-color: #fff;
  /* height: 150%; */
  /* flex-basis: auto; */
`
const MidLeftCon = styled(ScrollBox)`
  box-sizing: border-box;
  /* padding: 20px 153px; */
  padding: 20px 0;
  flex: 1;
  width: 0;
  height: 100%;

  /* height: auto; */
  /* border-right: 1px solid gray; */
  background-color: #eeeeee;
  align-items: stretch;
  
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
const SpinCon = styled.div`
  .LoadingCon {
    z-index: 99;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .SpinLoadingClass {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
