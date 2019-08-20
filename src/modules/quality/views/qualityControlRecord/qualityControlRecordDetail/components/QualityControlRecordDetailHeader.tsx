import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { appStore } from 'src/stores'
const BG = require('../../../../images/顶部背景.png')
import { Button } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import createModal from 'src/libs/createModal'
import BqclModal from '../modal/BqclModal'
import HlbModal from '../modal/HlbModal'

interface Props {
  detailData: any
  onload: any
}

export default function qualityControlRecordDetailHeader(props: Props) {
  const topHeaderBack = () => {
    appStore.history.push(`/quality/qualityControlRecord?noRefresh=1`)
  }
  let master = props.detailData.master || {}
  let nodeDataList = JSON.parse(JSON.stringify(props.detailData.nodeDataList || []))
  nodeDataList.reverse()
  let currentNodeIndex = nodeDataList.findIndex((item: any) => item.status == '1') || 0
  /** 当前 */
  let currentNode = nodeDataList[currentNodeIndex] || {}
  /** 下一个 */
  let nextNode = nodeDataList[currentNodeIndex - 1] || {}

  const bqclModal = createModal(BqclModal)
  const hlbModal = createModal(HlbModal)

  const onAduit = (nodeName: string) => {
    switch (nodeName) {
      case '病区处理':
        bqclModal.show({
          id: appStore.match.params.id,
          nodeCode: nextNode.nodeCode,
          onOkCallBack: props.onload
        })
        break
      case '质控组组长审核':
        {
          hlbModal.show({
            id: appStore.match.params.id,
            nodeCode: nextNode.nodeCode,
            title: '质控组组长审核',
            onOkCallBack: props.onload
          })
        }
        break
      case '科护士长审核':
        {
          hlbModal.show({
            id: appStore.match.params.id,
            nodeCode: nextNode.nodeCode,
            title: '科护士长审核',
            onOkCallBack: props.onload
          })
        }
        break
      case '护理部审核':
        {
          hlbModal.show({
            id: appStore.match.params.id,
            nodeCode: nextNode.nodeCode,
            title: '护理部审核',
            onOkCallBack: props.onload
          })
        }

        break
      case '追踪评价':
        {
          hlbModal.show({
            id: appStore.match.params.id,
            nodeCode: nextNode.nodeCode,
            title: '追踪评价',
            onOkCallBack: props.onload
          })
        }

        break
    }
  }
  return (
    <Con>
      <TopHeader>
        <BreadcrumbBox
          style={{
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 2
          }}
          data={[
            {
              name: '质控记录',
              link: '/quality/qualityControlRecord'
            },
            {
              name: '记录详情'
            }
          ]}
        />
        <div className='topHeaderTitle'>
          <div className='title'>{master.qcName}</div>
          <div className='topHeaderButton'>
            {nextNode.nodeName && (
              <Button onClick={() => onAduit(nextNode.nodeName)} type='primary' disabled={!nextNode.canHandle}>
                {nextNode.nodeName}
              </Button>
            )}
            <Button onClick={topHeaderBack}>返回</Button>
          </div>
        </div>
        <div className='topHeaderStatus'>
          状态：<span style={{ color: '#6767ff' }}>{master.status == '1' ? '已完成' : master.nextNodePendingName}</span>
        </div>
      </TopHeader>
      <bqclModal.Component />
      <hlbModal.Component />
    </Con>
  )
}

const Con = styled.div` 
  box-sizing:border-box;
  height: 100%;
  width: 100%;
  /* background: url(${BG}); */
  /* background:linear-gradient(180deg,rgba(248,248,252,1) 0%,rgba(235,236,240,1) 100%); */
  padding-left: 20px;
  /* border-bottom: 1px solid #ddd; */
  position: relative;
`
const TopHeader = styled.div`
  /* height: 26px;
  line-height: 26px; */
  .topHeaderClass {
    font-size: 14px;
    margin-top: 13px;
    color: #999;
    .topHeaderSpan1 {
      cursor: pointer;
    }
    .topHeaderSpan1:hover {
      color: #00a680;
    }
    .topHeaderSpan2 {
      cursor: pointer;
    }
    .topHeaderSpan2:hover {
      color: #00a680;
    }
  }
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    /* font-weight: bold; */
    .topHeaderButton {
      position: absolute;
      top: 45px;
      right: 20px;
      button {
        margin-left: 10px;
      }
    }
    .title {
      font-weight: bold;
      min-height: 30px;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`
