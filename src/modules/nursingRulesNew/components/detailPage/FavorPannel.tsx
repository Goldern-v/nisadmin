import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'antd'
import { observer } from 'mobx-react-lite'
import { detailPageModel } from './../../models/detailPageModel'
export interface Props { }

export default observer(function FavorPannel() {
  const { favorList } = detailPageModel

  let formatList = () => {
    let list = [] as any;

    for (let i = 0; i < favorList.length; i++) {
      if (i % 3 == 0) {
        list.push([favorList[i]])
      } else {
        list[list.length - 1].push(favorList[i])
      }
    }

    return list
  }

  const handleItemClick = (item: any) => {
    console.log(item)
  }

  return <Wrapper>
    <Row>
      <Col span={24}><div className="h1">我的收藏</div></Col>
    </Row>
    {formatList().map((item: any, idx: number) =>
      <Row className="split" key={idx}>
        {item.map((item1: any, idx1: number) =>
          <Col span={8} key={`${idx} ${idx1}`} onClick={() => handleItemClick(item1)}>
            <div className="h2">{`${item1.nodeNum} ${item1.nodeName}`}</div>
          </Col>)}
      </Row>)}
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
    .ant-col{
      cursor: pointer;
      :hover{
        color: #00A680;
      }
    }
  }
`