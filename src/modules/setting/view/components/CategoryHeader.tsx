import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
export interface Props {
  setIsShow: any
}
// 类别字典设置头部组件
export default function CategoryHeader(props: Props) {
  return (
    <HeaderModular>
      <WorldCon>类别字典设置</WorldCon>
      <RightButton onClick={props.setIsShow}>添加</RightButton>
    </HeaderModular>
  )
}

const HeaderModular = styled.div`
  width: 100%;
  height: 60px;
  text-align: center;
  box-sizing: border-box;
  background: #eeeeee;
  line-height: 60px;
`
const WorldCon = styled.div`
  font-size: 20px;
  font-weight: 600;
  float: left;
  margin-left: 20px;
  font-weight: bold;
  color: #000;
  line-height: 60px;
`
const RightButton = styled(Button)`
  float: right;
  margin-top: 15px;
  margin-right: 20px;
`
