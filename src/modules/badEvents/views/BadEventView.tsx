import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import _ from 'lodash'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'

import TopCon from './components/TopCon'
import LeftMenu from './components/LeftMenu'
import BaseLayout from './components/BaseLayout'

import EventSearch from './EventSearch/EventSearch'
import EventReport from './EventReport/EventReport'
import EventAlanysis from './EventAlanysis/EventAlanysis'
import EventFrequentOccurence from './EventFrequentOccurence/EventFrequentOccurence'

import BadEventEditorView from './BadEventEditorView'

// import { BadEventViewModal } from './BadEventViewModal'
import { appStore } from 'src/stores'
export interface Props extends RouteComponentProps<{ type?: string }> {
  payload: HorizontalMenuItem[]
}

const ROUTE_LIST = [
  {
    type: 'search',
    component: EventSearch,
    name: '不良事件查询'
  },
  {
    type: 'report',
    component: EventReport,
    name: '不良事件汇总表'
  },
  {
    type: 'frequentOccurence',
    component: EventFrequentOccurence,
    name: '不良事件发生率'
  },
  {
    type: 'alanysis',
    component: EventAlanysis,
    name: '不良事件分析报告',
    childrens: [
      {
        type: 'edit',
        component: BadEventEditorView,
        name: '不良事件编辑'
      }
    ]
  }
]

export default function BadEventView (props: Props) {
  // nurseFileDetailViewModal.nurserInfo = appStore.queryObj

  useEffect(() => {
    //
    console.log('useEffect', props, props.match.params)
  }, [])

  let currentRouteType: any = props.match.params.type || 'search'
  let CurrentRoute: any = ROUTE_LIST.find((item) => item.type === currentRouteType)

  return (
    <Wrapper>
      <MainCon>
        <LeftMenuCon>
          <LeftMenu routeList={ROUTE_LIST} type={CurrentRoute.type} />
        </LeftMenuCon>
        {/* <TopCon /> */}
        <DetailCon>{CurrentRoute && CurrentRoute.component && <CurrentRoute.component />}</DetailCon>
      </MainCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const LeftMenuCon = styled.div`
  width: 220px;
  position: relative;
  z-index: 1;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(228, 228, 228, 1);
`
const MainCon = styled.div`
  flex: 1;
  align-items: stretch;
  display: flex;
`

const DetailCon = styled.div`
  flex: 1;
  overflow: auto;
`
