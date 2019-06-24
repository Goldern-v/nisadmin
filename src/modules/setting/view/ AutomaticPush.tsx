import React, { Component } from 'react'
import styled from 'styled-components'
//引入头部组件
import SelectCon from './components/SelectCon'
//引入选项卡
import PushAudit from './components/PushAudit'


export default class CategoryDictionary extends Component {
  public render () {
    return (
      <Wrapper>
        <SelectCon/>
        <Background>
          <PushAudit/>
        </Background>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding:0 30px;
`
const Background = styled.div`
  /* background:#fff; */
  width:100%;
  height:100%
`

