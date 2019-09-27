import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { appStore } from 'src/stores'
import IndexList from './../IndexList'
import { observer } from 'mobx-react-lite'
import qs from 'qs'
import { detailPageModel } from './../../models/detailPageModel'
export interface Props { }

export default observer(function IndexPannel() {
  const { indexList, baseInfo } = detailPageModel
  const { history } = appStore

  const handleItemClick = (item: any) => {
    history.push(`nursingRulesPagePreview?${qs.stringify({
      bookId: baseInfo.bookId,
      nodeNum: item.nodeNum,
      bookName: baseInfo.bookName,
    })}`)
  }

  const viewList = indexList.filter((item: any) => item.childrenList && item.childrenList.length > 0)

  return <Wrapper>
    <IndexList indexList={viewList} onItemClick={handleItemClick} itemClass="active-item" />
    <div className="nope">{viewList.length <= 0 ? '暂无目录' : ''}</div>
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
    padding-right: 8px;
    line-height: 30px;
  }
  .ant-row{
    margin-bottom: 8px;
    &.split{
      border-bottom: 1px solid #ddd;
    }
  }
  .active-item{
    cursor: pointer;
    :hover{
      color: #00A680;
    }
  }
  .nope{
    font-size: 14px;
    line-height: 200px;
    text-align: center;
  }
`