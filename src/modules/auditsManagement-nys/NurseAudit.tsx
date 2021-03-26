import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import _ from 'lodash'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import { appStore, authStore } from 'src/stores'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import AuditsTableDHSZ from './components/AuditsTableDHSZ'
import BaseTabs from 'src/components/BaseTabs'

interface Props {
  showType: any
  keyword: any
  needAudit: any
  setNeedAudit: any
  selectedDate: any
}

export default observer(function NurseAudit(props: Props) {
  const [activeKey, setActiveKey]: any = useState(0)
  const TABS_LIST_NURSE = [
    {
      title: '待我审核',
      component: (
        <AuditsTableDHSZ
          showType={props.showType}
          keyword={props.keyword}
          needAudit
          active={activeKey == 0}
          selectedDate={props.selectedDate}
        />
      ),
      index: 0
    },
    {
      title: '我已审核',
      component: (
        <AuditsTableDHSZ
          showType={props.showType}
          keyword={props.keyword}
          needAudit={false}
          active={activeKey == 1}
          selectedDate={props.selectedDate}
        />
      ),
      index: 1
    }
  ]
  return (
    <Wrapper>
      <MainCon>
        <BaseTabs
          config={TABS_LIST_NURSE}
          onChange={(key: any) => {
            setActiveKey(key)
            if (key == 0) {
              props.setNeedAudit(true)
            }
            if (key == 1) {
              props.setNeedAudit(false)
            }
          }}
        />
      </MainCon>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const MainCon = styled.div`
  flex: 1;
  height: calc(100vh - 137px);
  align-items: stretch;
  display: flex;
  margin: 20px;
`
