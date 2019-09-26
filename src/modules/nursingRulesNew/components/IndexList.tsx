import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'
import { Row, Col } from 'antd'
export interface Props {
  indexList: any[],
  onItemClick?: Function
}

export default function IndexList(props: Props) {
  const { indexList, onItemClick } = props

  const handleClick = (item: any) => {
    onItemClick && onItemClick(item)
  }

  return <Wrapper className="index-list">
    {indexList.map((item0: any, idx: number) => {
      let childen = [] as any

      if (item0.childrenList)
        for (let i = 0; i < item0.childrenList.length; i++) {
          if (i % 3 == 0) {
            childen.push([item0.childrenList[i]])
          } else {
            childen[childen.length - 1].push(item0.childrenList[i])
          }
        }

      return <Fragment key={idx}>
        <Row >
          <Col span={24}><div className="h1">{item0.name}</div></Col>
        </Row>
        {childen.map((item1: any, idx1: number) =>
          <Row className="split" key={`${idx} ${idx1}`}>
            {item1.map((item2: any, idx2: number) =>
              <Col span={8} key={`${idx} ${idx1} ${idx2}`} onClick={() => handleClick(item2)}>
                <div className="h2">{`${item2.name}`}</div>
              </Col>)}
          </Row>)}
      </Fragment>
    })}
  </Wrapper>
}
const Wrapper = styled.div`
  padding: 10px;
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
`