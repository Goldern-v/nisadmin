import React, { Component } from 'react'
import styled from 'styled-components'
// 引入头部组件
import CategoryHeader from './components/CategoryHeader'
// 引入内容表格
import CategoryTable from './components/CategoryTable'

export default class CategoryDictionary extends Component {
  state = {
    isShow: false
  }
  public setIsShow = () => {
    this.setState({
      isShow: true
    })
  }
  public setNoShow = () => {
    this.setState({
      isShow: false
    })
  }
  public render () {
    return (
      <Wrapper>
        <CategoryHeader setIsShow={this.setIsShow}/>
        <CategoryTable isShow={this.state.isShow} setNoShow={this.setNoShow}/>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
width:100%;
height:100%;
background:#fff;
`

const WhirBack = styled.div`
/* width:100%;
height:100%;
background:#fff; */
`
