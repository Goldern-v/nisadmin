import styled from 'styled-components'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import emitter from 'src/libs/ev'
import { Button } from 'antd'
import { appStore } from 'src/stores/index'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'

export interface Props extends RouteComponentProps {}

export default function ToolBar() {
  const add = () => {
    emitter.emit('添加人员分组')
  }

  const toNew = () => {
    emitter.emit('刷新人员分组')
  }

  return (
    <div>
      <BreadcrumbBox
        data={[
          {
            name: '排班管理',
            link: '/personnelManagement/arrangeHome'
          },
          {
            name: '人员分组'
          }
        ]}
      />

      <Wrapper>
        <Title>人员分组</Title>
        <div style={{ flex: 1 }} />
        <Button onClick={add} style={{ marginLeft: 5, marginRight: 5 }}>
          添加分组
        </Button>
        <Button onClick={toNew} style={{ marginLeft: 5, marginRight: 5 }}>
          刷新
        </Button>
        <Button
          onClick={() => {
            appStore.history.push('/personnelManagement/arrangeHome')
          }}
          style={{ marginLeft: 5, marginRight: 5 }}
        >
          返回
        </Button>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  height: auto;
  padding: 0 20px 20px 20px;
  display: inline-flex;
  width: 100%;
  align-items: flex-end;
`
const Title = styled.div`
  font-size: 20px;
`
