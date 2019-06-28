import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import _ from 'lodash'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import { appStore, authStore } from 'src/stores'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import AuditsTableDHSZ from 'src/modules/auditsManagement/components/AuditsTableDHSZ'
import EventTable from './EventTable'
import AdviseTable from './AdviseTable'
import OperationTable from './OperationTable'
import BaseTabs from 'src/components/BaseTabs'
// import { Modal, Input, message, Popconfirm, Select } from 'antd'
// import service from 'src/services/api'
export interface Props {
  isShow: any,
}

// import EventBar from './EventBar';
export default observer(function PushAudit (props: Props) {
  const TABS_LIST_NURSE = [
    {
      title: '事件',
      // component: <EventTable isShow={props.isShow}/>
      component: <OperationTable isShow={props.isShow}/>

    },
    {
      title: '医嘱',
      component: <AdviseTable isShow={props.isShow}/>
    },
    {
      title: '手术',
      component: <EventTable isShow={props.isShow}/>
    }
  ]
  
  const TABS_LIST_NURSING = [
    {
      title: '事件',
      component: <AuditsTableDHSZ type='waitAuditedDepartment' needAudit />
    },
    {
      title: '待护士长审核',
      component: <AuditsTableDHSZ type='waitAuditedNurse' needAudit={false} />
    },
    {
      title: '审核通过',
      component: <AuditsTableDHSZ type='auditedSuccessDepartment' needAudit={false} />
    }
  ]
  const tabShow = () => {
    if (authStore.post === '护长') {
      return TABS_LIST_NURSE
    } else if (authStore.post === '护理部') {
      return TABS_LIST_NURSING
    } else {
      return []
    }
  }
  return (
    <Wrapper>
      <MainCon>
        <BaseTabs config={tabShow()} />
      </MainCon>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
`

const MainCon = styled.div`
  flex: 1;
  height: calc(100vh - 230px);
  align-items: stretch;
  display: flex;
  /* margin: 20px; */
`
const DivMargin = styled.div`
`
