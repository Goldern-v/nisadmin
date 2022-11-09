import { Button, Spin } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { PageContainer, PageHeader, PageTitle, Place } from 'src/components/common'
import styled from 'styled-components'
import SearchCon from './components/search-con'
import AuditDetail from './components/audit-detail'
import { auditSettingsModel as model } from './model'
import { cloneDeep } from 'lodash'
// 资质准入
export default observer(function AuditSettings(props) {
  
  const handleClickItem = (e: any) => {
    model.curItem = e.moduleCode 
  }

  useEffect(() => {
    model.getModuleList()
  }, [])
  
  useEffect(() => {
    model.getDetailByModuleCode()
  }, [model.curItem])
  useEffect(() => {
    model.editContentData = cloneDeep(model.contentData)
  }, [model.contentData, model.isEdit])

  
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>审核设置</PageTitle>
        <Place />
        <Button type='primary' onClick={() => model.isEdit = !model.isEdit}>编辑</Button>
        <Button loading={model.loading} disabled={!model.isEdit} onClick={model.onSave}>保存</Button>
      </PageHeader>
      <Content>
        <Spin spinning={model.loading}>
          <SearchCon list={model.moduleList} curItem={model.curItem} handleClick={handleClickItem} />
          <AuditDetail />
        </Spin>
      </Content>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
`
const Content = styled(PageContainer)`
  flex: 1;
  .ant-spin-container {
    display: flex;
  }
`