import styled from 'styled-components'
// import React from 'react'
import React, { useState, useEffect } from 'react'
import { appStore, authStore } from 'src/stores/index'
import emitter from 'src/libs/ev'
import { observer } from 'mobx-react-lite'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
export default observer(function BedSituation () {
  const [title, setTitle] = useState(() => {
    let deptName = authStore.selectedDeptName || ''
    statisticViewModel.deptName = deptName
    statisticViewModel.setTitle('护士休假统计')
    return statisticViewModel.getTitle
  })
  const [typeGet, setTypeGet] = useState('在院')
  const [startDate, setStartDate] = useState(statisticViewModel.getStartDate)
  const [endDate, setEndDate] = useState(statisticViewModel.getEndDate)
  useEffect(() => {
    let getTitleByAuthStore = statisticViewModel.deptName
    setTitle(getTitleByAuthStore)
  }, [])
  emitter.removeAllListeners('设置统计页日期')
  emitter.addListener('设置统计页日期', (value: any) => {
    setStartDate(value[0])
    setEndDate(value[1])
  })
  // emitter.removeAllListeners('住院病人认知情况统计表类型')
  emitter.addListener('住院病人认知情况统计表类型', (value: any) => {
    setTypeGet(value)
  })
  return (
    <Con>
      <div className='hospitalTitle'>东莞市厚街医院</div>
      <div className='tableTitle'>{appStore.match.params.name}</div>
      <ConditionCon>
        <div className='divisionCon'>科室：{authStore.selectedDeptNameOnly}</div>
        <div className='dataCon'>
          统计日期：{startDate} 至 {endDate}
        </div>
        <div className='typeCon'>类型:{typeGet}</div>
      </ConditionCon>
    </Con>
  )
})

const Con = styled.div`
  height: 100%;
  width: 100%;
  font-family: simsun, Times New Roman, Georgia, Serif !important;
  .hospitalTitle {
    font-size: 17px;
    font-family: simsun, Times New Roman, Georgia, Serif !important;
    text-align: center;
  }
  .tableTitle {
    margin-top: 8px;
    font-size: 21px;
    font-family: simsun, Times New Roman, Georgia, Serif !important;
    text-align: center;
  }
  .divisionCon {
    width: 180px;
    font-size: 14px;
    font-family: simsun, Times New Roman, Georgia, Serif !important;
  }
  .dataCon {
    margin: 0 auto;
    height: 18px;
    font-size: 14px;
    font-family: simsun, Times New Roman, Georgia, Serif !important;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
  }
  .typeCon {
    width: 180px;
    text-align: right;
    font-size: 14px;
    font-family: simsun, Times New Roman, Georgia, Serif !important;
  }
`
const ConditionCon = styled.div`
  margin-top: 15px;
  height: 20px;
  /* background-color: red; */
  display: flex;
`
