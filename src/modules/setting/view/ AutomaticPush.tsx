import React, { Component } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
//引入头部组件
import HealthSelectCon from './components/HealthSelectCon'
//引入选项卡
import PushAudit from './components/PushAudit'
export interface Props extends RouteComponentProps {}


export default class CategoryDictionary extends Component {
  state = {
    isShow: false
  }
  public setIsShow = () => {
    this.setState({
      isShow: !this.state.isShow
    })
  }
  public render () {
    return (
      <Wrapper>
        <HealthSelectCon />
        <PushAudit isShow={this.state.isShow}/>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding:0 20px;
`
// const SelectCon = styled.div``

