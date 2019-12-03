import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'
import { Row, Col } from 'antd'
export interface Props {
  indexList: any[],
  onItemClick?: Function,
  onParentItemClick?: Function,
  itemClass?: string,
  parentItemClass?: string
}

export default function IndexList(props: Props) {
  const { indexList, onItemClick, itemClass, onParentItemClick, parentItemClass } = props

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
          <Col
            span={24}
            onClick={() => onParentItemClick && onParentItemClick(item0)}>
            <div
              className={[
                'h1',
                item0.urls && item0.urls.length > 0 ? 'has-urls' : '',
                childen.length > 0 ? 'has-children' : '',
                parentItemClass
              ].join(' ')}>
              {item0.name}
            </div>
          </Col>
        </Row>
        {childen.map((item1: any, idx1: number) =>
          <Row className="split" key={`${idx} ${idx1}`}>
            {item1.map((item2: any, idx2: number) =>
              <Col span={8} key={`${idx} ${idx1} ${idx2}`} onClick={() => handleClick(item2)} className={itemClass || ''}>
                <span className="circle"></span>
                <div className="h2">
                  <span>{item2.name}</span>
                  {!item2.isFileUploaded && <span style={{ color: '#999' }}>(未上传)</span>}
                  {item2.isFileUploaded == 1 && item2.fileStatus == 1 && <span style={{ color: '#00A680' }}>(待审核)</span>}
                </div>
              </Col>)}
          </Row>)}
      </Fragment>
    })}
  </Wrapper>
}
const Wrapper = styled.div`
  padding: 10px;
  .h1{
    font-size: 14px;
    font-weight: bold;
    color: #000;
  }
  .h2{
    padding-right: 8px;
    line-height: 30px;
    font-size: 13px;
    display: inline-block;
    vertical-align: top;
  }
  .circle{
      width: 4px;
      height: 4px;
      display: inline-block;
      vertical-align: top;
      background: rgba(204,204,204,1);
      margin: 13px;
      border-radius: 50%;
    }
  .ant-row{
    margin-bottom: 8px;
    &.split{
      border-bottom: 1px solid #ddd;
    }
  }
`