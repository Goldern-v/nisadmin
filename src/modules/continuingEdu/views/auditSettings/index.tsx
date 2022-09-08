import { Button } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import styled from 'styled-components'

export default observer(function AuditSettings(props) {
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>审核设置</PageTitle>
        <Place/>
        <Button type='primary'>编辑</Button>
        <Button>保存</Button>
      </PageHeader>
    </Wrapper>
  )
})

const Wrapper = styled.div`

`