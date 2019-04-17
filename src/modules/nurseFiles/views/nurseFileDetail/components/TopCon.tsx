import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Breadcrumb } from 'antd'
import store from 'src/stores'
export interface Props extends RouteComponentProps {}

const BG = require('../../../images/顶部背景.png')

export default function TopCon () {
  let history = store.appStore.history
  return (
    <Wrapper>
      <BreadcrumbCon>
        <Breadcrumb>
          <Breadcrumb.Item>
            <A onClick={() => history.push('/nurseFilesList')}>护士档案</A>
          </Breadcrumb.Item>
          <Breadcrumb.Item>档案详情</Breadcrumb.Item>
        </Breadcrumb>
      </BreadcrumbCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 135px;
  background: url(${BG});
  background-size: cover;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #dbe0e4;
  font-size: 13px;
`
const BreadcrumbCon = styled.div`
  padding: 12px 15px;
`

const A = styled.span`
  color: #666666;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`
