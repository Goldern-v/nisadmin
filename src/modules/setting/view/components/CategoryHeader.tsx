import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
export interface Props {
  setIsShow: any
}
// 类别字典设置头部组件
export default function CategoryHeader (props: Props) {
  console.log(props)
  return (
    <HeaderModular>
      <WorldCon>类别字典设置</WorldCon>
      <RightButton onClick={props.setIsShow}>添加</RightButton>
    </HeaderModular>
  )
}

const HeaderModular = styled.div`
  width:100%;
  height: 80px;
  border-bottom:1px solid #ccc;
  text-align:center;
  line-height:80px;
  padding:0 20px;
  box-sizing:border-box;
`
const WorldCon = styled.div`
  font-size:20px;
  font-weight:600;
  float:left;
`
const RightButton = styled(Button)`
  float:right;
  margin-top:25px;
`
