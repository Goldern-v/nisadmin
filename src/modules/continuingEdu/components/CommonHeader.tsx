import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'

export interface Props {

}

export default function CommonHeader(props: any) {
  const { children, title } = props;
  return <CommonHeadetStyle className="common-header-continnuing-edu">
    <span className="title">{title || ''}</span>
    <div className="float-right">{React.createElement(Fragment, null, ...children)}</div>
  </CommonHeadetStyle>
}
const CommonHeadetStyle = styled.div`
  height: 60px;
  padding: 10px 15px;
  >.title{
    line-height: 40px;
    font-size: 20px;
    font-weight: bold;
  }
  .float-right{
    float: right;
    margin-top: 5px;
    .float-item{
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      &.title{
        margin-right: 5px;
      }
      :last-of-type{
        margin-right: 0;
      }
    }
  }
`