import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Icon, Modal, message as Message } from 'antd'
import { appStore } from 'src/stores'
import qs from 'qs'
import { observer } from 'mobx-react-lite'
import { detailPageModel } from './../../models/detailPageModel'
export interface Props { }

export default observer(function FavorPannel() {
  const { currentVersionFavorList, baseInfo } = detailPageModel
  const { history } = appStore

  let formatList = () => {
    let sortList = [...currentVersionFavorList]

    sortList.sort((a, b) => a.nodeNum - b.nodeNum)

    let list: any[] = []

    for (let i = 0; i < sortList.length; i++) {
      if (i % 3 == 0) {
        list.push([sortList[i]])
      } else {
        list[list.length - 1].push(sortList[i])
      }
    }

    return list
  }

  const handleItemClick = (item: any) => {
    history.push(`nursingRulesPagePreview?${qs.stringify({
      bookId: baseInfo.bookId,
      nodeNum: item.nodeNum,
      bookName: baseInfo.bookName,
      viewType: 'favor'
    })}`)
  }

  const handleCancelCollect = (item: any) => {
    Modal.confirm({
      title: "提示",
      content: "是否取消收藏",
      centered: true,
      onOk: () => {
        detailPageModel.cancelFavor(item.id, () => {
          Message.success('取消收藏成功')
        })
      }
    })
  }

  return <Wrapper>
    <Row>
      <Col span={24}><div className="h1">我的收藏</div></Col>
    </Row>
    {formatList().map((item: any, idx: number) =>
      <Row className="split" key={idx}>
        {item.map((item1: any, idx1: number) =>
          <Col span={8} key={`${idx} ${idx1}`} >
            <div className="h2" onClick={() => handleItemClick(item1)}>
              <span>{item1.nodeName}</span>
            </div>
            <div className="cancel-favor" onClick={() => handleCancelCollect(item1)} title="取消收藏">
              <Icon type="close" />
            </div>
          </Col>)}
      </Row>)}
    <div className="nope">{currentVersionFavorList.length <= 0 ? '暂无收藏' : ''}</div>
  </Wrapper>
})

const Wrapper = styled.div`
  padding: 10px;
  min-height:100%;
  .h1{
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }
  .h2{
    padding-right: 30px;
    line-height: 30px;
  }
  .ant-row{
    margin-bottom: 8px;
    &.split{
      border-bottom: 1px solid #ddd;
    }
    .ant-col{
      cursor: pointer;
      position: relative;
      .cancel-favor{
        position: absolute;
        display:none;
        right: 0;
        top: 0;
        height: 30px;
        width: 30px;
        text-align: center;
        line-height: 30px;
        :hover{
          &>i{
            color: red;
          }
        }
      }
      :hover{
          color: #00A680;
          .cancel-favor{
            display: block;
          }
        }
    }
  }
  .version{
    color:#999;
  }
`