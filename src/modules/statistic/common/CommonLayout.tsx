import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

export interface Props {
  header: any
  body: any
}

export default function CommonLayout(props: Props) {
  const { header, body } = props

  return <Wrapper>
    <HeaderCon>
      {header}
    </HeaderCon>
    <BodyCon>
      {body}
    </BodyCon>
  </Wrapper>
}
const Wrapper = styled.div`
  height: calc(100vh - 50px);
  flex-direction: column;
  display: flex;
`

const HeaderCon = styled.div`
  align-items: center;
  height: 45px;
  line-height: 45px;
  padding-left: 14px;
  background: rgba(248,248,248,1);
  box-shadow: 3px 3px 6px 0px rgba(0,0,0,0.15);
  .content-item{
    margin-right: 15px;
  }
  .lable-item{
    margin-right: 10px;
  }
`

const BodyCon = styled.div`
  flex: 1;
  height: 0;
  margin: 20px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.15);
  background-color: #fff;
  border-radius: 5px;
  overflow: auto;

  .main-title{
    margin: 0 auto;
    width: 510px;
    height: 29px;
    font-size: 21px !important;
    font-weight: bold;
    color: rgba(51,51,51,1);
    line-height: 29px;
    text-align: center;
    position: 'relative';
  }
  .sub-title{
    text-align: center;
  }
  .right-group{
    position: absolute;
    right: 15px;
    top: 2px;
  }
`

export const ChartCon = styled.div.attrs({
  height: 0
})`
  padding: 0 40px;
  min-height: ${(p) => p.height};
    position: relative;
  .no-data{
    text-align:center;
    cursor: default;
    color: #999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    i{
      font-size: 44px;
      transform: scaleX(1.2);
    }
    span{
      font-size:20px;
    color: #aaa;
    }
  }
`