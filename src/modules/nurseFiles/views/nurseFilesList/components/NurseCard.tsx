import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import store from '@/stores'
export interface Props {
  rowNum: number
}

const DEFALT_HEADIMG = require('../../../images/护士默认头像.png')

export default function NurseCard (props: Props) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  let { rowNum } = props
  let history = store.appStore.history
  return (
    <Padding rowNum={rowNum}>
      <Wrapper onClick={() => history.push('/nurseFileDetail')}>
        <TriangleLabel />
        <SquareLabel>离职</SquareLabel>
        <HeadImg src={DEFALT_HEADIMG} />
        <Name>张晓红</Name>
        <span>培训护士 | N3</span>
        <span>神经内科护理单元</span>
      </Wrapper>
    </Padding>
  )
}

const Padding = styled.div<{ rowNum: number }>`
  box-sizing: border-box;
  padding: 10px;
  float: left;
  width: ${(p) => 100 / p.rowNum}%;
`

const Wrapper = styled.div`
  height: 200px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(198, 198, 198, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #666666;
  position: relative;
  overflow: hidden;
`

const HeadImg = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
`

const Name = styled.div`
  font-size: 15px;
  color: #333;
  margin-top: 12px;
  margin-bottom: 4px;
`

const TriangleLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-width: 31px 31px 0 0;
  border-style: solid;
  border-color: red transparent;
`
const SquareLabel = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  width: 23px;
  height: 47px;
  background: #d8d8d8;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 13px;
  color: #333;
`
