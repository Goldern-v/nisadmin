import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import emitter from 'src/libs/ev'
import { Button, Modal} from 'antd'

export interface Props extends RouteComponentProps {}

export default function ToolBar() {
  const add = () => {
    emitter.emit('添加人员分组')
    console.log(1111111111111)
  }

  return (
    <Wrapper>
      <Title>班次设置</Title>
      <div style={{ flex: 1 }} />
        <Button onClick={add} style={{ marginLeft: 5, marginRight: 5 }}>
          添加分组
        </Button>

      <Button style={{ marginLeft: 5, marginRight: 5 }}>
        保存
      </Button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: auto;
  padding: 0 20px 20px 20px;
  display: inline-flex;
  width: 100%;
  align-items: flex-end;
  /* form.Item {
    width: '250px';
  } */
`
const Title = styled.div`
  font-size: 20px;
`
