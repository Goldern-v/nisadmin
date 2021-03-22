import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
// import { Select, Button } from 'antd'
import SelectCommon from './common/SelectCommon'
import BedSituation from './components/BedSituation'
import MissionToday from './components/MissionToday'
import MyAudit from './components/MyAudit'
import WardSituation from './components/WardSituation'
import PatientSituation from './components/PatientSituation'
import Notices from './components/Notices'
import PerformChart from './components/PerformChart'
import NurseSituation from './components/NurseSituation/NurseSituation'
import PatientDistribute from './components/PatientDistribute/PatientDistribute'
import emitter from 'src/libs/ev'
import { appStore, authStore } from '../../stores/index'
import { observer } from 'mobx-react-lite'
import FullPageLoading from 'src/components/loading/FullPageLoading'
// export interface Props extends RouteComponentProps {}

// const Option = Select.Option

// function handleChange (value: any) {
//   console.log(`selected ${value}`)
// }

interface PannelItem {
  name: string,
  component: JSX.Element
}

export default observer(function HomeView() {
  const [page, setPage] = useState(['本页'])
  useEffect(() => { })
  emitter.removeAllListeners('首页查询')
  emitter.addListener('首页查询', () => {
    setPage(['查询'])
  })

  /** 首页面板集合 */
  const pannelAll = {
    bedSituation: {
      name: '床位情况',
      component: <BedSituation />
    },
    missionToday: {
      name: '今日任务',
      component: <MissionToday />
    },
    myAudit: {
      name: '待我审核',
      component: <MyAudit />
    },
    wardSituation: {
      name: '病区流转情况',
      component: <WardSituation />
    },
    patientSituation: {
      name: '患者情况',
      component: <PatientSituation />
    },
    notices: {
      name: '通知公告',
      component: <Notices />
    },
    performChart: {
      name: '执行单情况',
      component: <PerformChart />
    },
    nurseSituation: {
      name: '护理人员情况',
      component: <NurseSituation />
    },
    patientDistribute: {
      name: '患者分布',
      component: <PatientDistribute />
    },
  } as { [key: string]: PannelItem }

  /** 默认显示全部面板 */
  const visibleListDefault = Object.keys(pannelAll)

  const visibleListJmfy = visibleListDefault.filter((key) => ['performChart'].indexOf(key) < 0)

  const visibleCon = (visibleList: string[]) => {
    return <HomeDetail>
      {visibleList.map((key: string) => (
        <HomeDetailItem key={key}>
          {pannelAll[key].component || null}
        </HomeDetailItem>
      ))}
    </HomeDetail>
  }

  return (
    <Wrapper>
      <SelectCon>
        <SelectCommon />
      </SelectCon>
      {visibleCon(appStore.hisMatch({
        map: {
          jmfy: visibleListJmfy,
          other: visibleListDefault
        }
      }))}
    </Wrapper>
  )
})
const Wrapper = styled.div`
  padding:20px 10px;
  /* padding: ${(p) => p.theme.$mcp}; */
  /* 全局背景 */
  background-color:  ${(p) => p.theme.$bgBody};
`

const SelectCon = styled.div`
  padding: 0 10px;
`
const HomeDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* background-color: red; */
`
const HomeDetailItem = styled.div`
  box-sizing: border-box;
  margin: 0.8416%;
  padding: 0;
  width: 31.65%;
  height: 320px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  /* border: 1px solid rgba(161, 175, 179, 1); */
  box-shadow: ${(p) => p.theme.$shadow};
  overflow: hidden;
`
