import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import _ from 'lodash'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import { appStore, authStore } from 'src/stores'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import EventTable from './EventTable'
import AdviseTable from './AdviseTable'
import OperationTable from './OperationTable'
import DiagnosisTable from './DiagnosisTable'
import ChannelTable from './ChannelTable'
import BaseTabs from 'src/components/BaseTabs'
import HealthPropagandaView from 'src/modules/healthPropaganda/HealthPropagandaView'
// import { Modal, Input, message, Popconfirm, Select } from 'antd'
// import service from 'src/services/api'
export interface Props {
  isShow: any
}

// import EventBar from './EventBar';
import emitter from '../../../../libs/ev'
export default observer(function PushAudit(props: Props) {
  let type = appStore.queryObj.type || '0'
  const [activeKey, setActiveKey] = useState(type)
  const TABS_LIST_NURSE = [
    {
      title: '事件',
      component: <EventTable isShow={props.isShow} />,
      children: [
        {
          title: '类别字典设置',
          path: '/setting/健康宣教字典详情',
          component: <HealthPropagandaView />
        }
      ]
    },
    {
      title: '医嘱',
      component: <AdviseTable isShow={props.isShow} />
    },
    {
      title: '手术',
      component: <OperationTable isShow={props.isShow} />
    },
    {
      title: '诊断',
      component: <DiagnosisTable isShow={props.isShow} />
    },
    {
      title: '途径',
      component: <ChannelTable isShow={props.isShow} />
    }
  ]
  emitter.removeAllListeners('自动推送设置-添加')
  emitter.addListener('自动推送设置-添加', () => {
    if (activeKey === '0') {
      emitter.emit('自动推送设置-添加-事件')
    } else if (activeKey === '1') {
      emitter.emit('自动推送设置-添加-医嘱')
    } else if (activeKey === '2') {
      emitter.emit('自动推送设置-添加-手术')
    }else if (activeKey === '3') {
      emitter.emit('自动推送设置-添加-诊断')
    }else if (activeKey === '4') {
      emitter.emit('自动推送设置-添加-途径')
    }
  })

  emitter.removeAllListeners('自动推送设置-刷新')
  emitter.addListener('自动推送设置-刷新', () => {
    if (activeKey === '0') {
      emitter.emit('自动推送设置-刷新-事件')
    } else if (activeKey === '1') {
      emitter.emit('自动推送设置-刷新-医嘱')
    } else if (activeKey === '2') {
      emitter.emit('自动推送设置-刷新-手术')
    }else if (activeKey === '3') {
      emitter.emit('自动推送设置-刷新-诊断')
    }else if (activeKey === '4') {
      emitter.emit('自动推送设置-刷新-途径')
    }
  })

  return (
    <Wrapper>
      <MainCon>
        <BaseTabs
          defaultActiveKey={type}
          config={TABS_LIST_NURSE}
          onChange={(activeKey) => {
            setActiveKey(activeKey)
          }}
        />
      </MainCon>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const MainCon = styled.div`
  flex: 1;
  height: calc(100vh - 125px);
  align-items: stretch;
  display: flex;
  /* margin: 20px; */
`
const DivMargin = styled.div``
