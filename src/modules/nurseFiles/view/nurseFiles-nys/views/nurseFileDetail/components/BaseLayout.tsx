import styled from 'styled-components'
import React, { ReactNode, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Place } from 'src/components/common'
import { Button } from 'antd'

export interface Props {
  children?: ReactNode
  title: string,
  extra?: JSX.Element,
  btnList?: BtnType[]
}

interface BtnType {
  label: string
  onClick?: () => void
}

export default function BaseLayout(props: Props) {
  let { title, btnList, extra } = props
  return (
    <Wrapper>
      <Head>
        <Title>{title}</Title>
        <Place />
        {extra}
        {btnList &&
          btnList.map((item: BtnType) => (
            <Button key={item.label} onClick={item.onClick}>
              {item.label}
            </Button>
          ))}
      </Head>
      <MainCon>{props.children}</MainCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: calc(100vh - 190px);
  /* background: #f8f8f8; */
  overflow: auto;
  /* padding: 20px 30px; */
  padding: 10px 15px 0;
`
const Head = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  position: fixed;
  left: 174px;
  top: 192px;
  right: 20px;
  .ant-btn {
    margin-left: 10px;
  }
`
const Title = styled.div`
  font-size: 18px;
  color: #333;
  font-weight: bold;
`
const MainCon = styled.div`
  margin-top: 35px;
`
