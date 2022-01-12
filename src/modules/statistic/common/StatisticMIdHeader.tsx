import styled from 'styled-components'
// import React from 'react'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
import React, { useState, useEffect } from 'react'
import { authStore } from 'src/stores/index'
import emitter from 'src/libs/ev'
import { observer } from 'mobx-react-lite'

export default observer(function StatisticMIdHeader() {
  const [title, setTitle] = useState(() => {
    let deptName = authStore.selectedDeptName || ''
    statisticViewModel.deptName = deptName
    statisticViewModel.setTitle('护士休假统计')
    return statisticViewModel.getTitle
  })
  const [startDate, setStartDate] = useState(statisticViewModel.getStartDate)
  const [endDate, setEndDate] = useState(statisticViewModel.getEndDate)
  useEffect(() => {
    let getTitleByAuthStore = statisticViewModel.deptName + '护士休假统计'
    setTitle(getTitleByAuthStore)
    // emitter.removeAllListeners('设置统计页标题')
  }, [])
  emitter.removeAllListeners('设置统计页日期')
  // emitter.addListener('设置统计页标题', (titleName: any) => {
  //   settitle(titleName)
  // })
  emitter.addListener('设置统计页日期', (value: any) => {
    setStartDate(value[0])
    setEndDate(value[1])
  })
  return (
    <Con>
      {/* {authStore.selectedDeptName} */}
      <div className='firstTitle'>{authStore.selectedDeptNameAdd || '全院'}</div>
      <div className='secondTitle'>
        日期：{startDate} 至 {endDate}
      </div>
    </Con>
  )
})

const Con = styled.div`
  width: 100%;
  text-align: center;
  .firstTitle {
    margin: 0 auto;
    width: 510px;
    height: 29px;
    font-size: 21px !important;
    font-family: PingFangSC-Medium;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 29px;
    letter-spacing: 1px;
  }
  .secondTitle {
    margin-top: 8px;
    margin-bottom: 32px;
    padding-right: 16px;
    /* margin: 0 auto; */
    width: 100%;
    height: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
  }
`
