import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
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
import WardCodeEmpName from './components/WardCodeEmpName'
import emitter from 'src/libs/ev'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import BedSituationJmfy from './components/BedSituationJmfy'

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
      component: appStore.hisMatch({
        map: {
          jmfy: <BedSituationJmfy />,
          other: <BedSituation />
        }
      })
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
    wardCodeEmpName: {
      name: '科室在岗人员',
      component: <WardCodeEmpName />
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
  /** 根据需要屏蔽面板 */
  const visibleListJmfy = visibleListDefault.filter((key) => !['performChart'].includes(key))

  const visibleListDghl = visibleListDefault.filter((key) => !['performChart', 'wardCodeEmpName'].includes(key))

  const visibleListFqfybjy = visibleListDefault.filter((key) => !['performChart', 'wardCodeEmpName', 'bedSituation'].includes(key))

  const visibleListWjgdszd = visibleListDefault.filter((key) => !['patientSituation', 'wardSituation', 'wardCodeEmpName'].includes(key))

  const visibleListdgxg = visibleListDefault.filter((key) => !['performChart'].includes(key))

  const visibleListOther = visibleListDefault.filter((key) => !['wardCodeEmpName'].includes(key))

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
          dghl: visibleListDghl,
          fqfybjy: visibleListFqfybjy,
          wjgdszd: visibleListWjgdszd,
          dgxg: visibleListdgxg,
          other: visibleListOther,
        }
      }))}
    </Wrapper>
  )
})
const Wrapper = styled.div`
  padding:20px 10px;
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
`
const HomeDetailItem = styled.div`
  box-sizing: border-box;
  margin: 0.8416%;
  padding: 0;
  width: 31.65%;
  height: 320px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.$shadow};
  overflow: hidden;
`
