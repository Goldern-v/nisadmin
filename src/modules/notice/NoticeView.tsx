import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import Null from 'src/components/null/Null'
import LeftMenu from './components/LeftMenu/LeftMenu'
import InfoList from './components/InfoList/InfoList'
import MainDetail from './components/MainDetail/MainDetail'
import { noticeViewModel } from './NoticeViewModel'
import EditCon from './components/EditCon/EditCon'
import { observer } from 'mobx-react-lite'
import { appStore } from 'src/stores'
export interface Props extends RouteComponentProps {}

export default observer(function NoticeView() {
  useEffect(() => {
    noticeViewModel.init(appStore.queryObj.selectedMenu, appStore.queryObj.id)
    appStore.history.replace('/notice')
  }, [])
  return (
    <Wrapper>
      <LeftMenu />
      <InfoList />
      <MainDetail />
      {noticeViewModel.isMenuEdit && <EditCon />}
    </Wrapper>
  )
})
const Wrapper = styled.div``
