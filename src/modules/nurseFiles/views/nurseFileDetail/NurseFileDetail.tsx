import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import _ from 'lodash'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import TopCon from './components/TopCon'
import LeftMenu from './components/LeftMenu'
import BaseInfo from './views/BaseInfo'
import WorkHistory from './views/WorkHistory'
import SpecialCard from './views/SpecialCard'
import EducationalExperience from './views/EducationalExperience'
export interface Props extends RouteComponentProps<{ type?: string }> {
  payload: HorizontalMenuItem[]
}

const ROUTE_LIST = [
  {
    type: 'baseInfo',
    component: BaseInfo,
    name: '基本信息'
  },
  {
    type: 'workHistory',
    component: WorkHistory,
    name: '工作经历'
  },
  {
    type: 'specialCard',
    component: SpecialCard,
    name: '特殊资格证'
  },
  {
    type: 'educationalExperience',
    component: EducationalExperience,
    name: '教育经历'
  }
]

export default function NurseFileDetail (props: Props) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
    console.log(props, 'props')
  })
  let currentRouteType = props.match.params.type
  let CurrentRoute = ROUTE_LIST.find((item) => item.type === currentRouteType)

  return (
    <Wrapper>
      <TopCon />
      <MainCon>
        <LeftMenuCon>
          <LeftMenu routeList={ROUTE_LIST} />
        </LeftMenuCon>
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
  width: 160px;
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
