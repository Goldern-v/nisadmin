import styled from 'styled-components'
// import React from 'react'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
import React, { useState, useEffect } from 'react'
import { authStore, appStore } from 'src/stores/index'
import emitter from 'src/libs/ev'
import { observer } from 'mobx-react-lite'

export default observer(function StatisticMIdHeader () {
  const [title, setTitle] = useState(() => {
    let deptName = authStore.selectedDeptName || ''
    statisticViewModel.deptName = deptName
    statisticViewModel.setTitle('护士休假统计')
    return statisticViewModel.getTitle
  })
  const [startDate, setStartDate] = useState(statisticViewModel.getStartDateByQuarter)
  const [endDate, setEndDate] = useState(statisticViewModel.getEndDateByQuarter)
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
    let nowMonth = value.slice(5,7)
    let arrStar = ""
    let arrEnd = ""
    if(nowMonth == "01" || nowMonth == "02" || nowMonth == "03") {
      arrStar = value.substr(0, 5) + "01-01"
      arrEnd = value.substr(0, 5) + "03-31"
    }
    if(nowMonth == "04" || nowMonth == "05" || nowMonth == "06") {
      arrStar = value.substr(0, 5) + "04-01"
      arrEnd = value.substr(0, 5) + "06-30"
    }
    if(nowMonth == "07" || nowMonth == "08" || nowMonth == "09") {
      arrStar = value.substr(0, 5) + "07-01"
      arrEnd = value.substr(0, 5) + "09-30"
    }
    if(nowMonth == "10" || nowMonth == "11" || nowMonth == "12") {
      arrStar = value.substr(0, 5) + "10-01"
      arrEnd = value.substr(0, 5) + "12-31"
    }
    setStartDate(arrStar)
    setEndDate(arrEnd)
  })
  return (
    <Con>
      {/* {authStore.selectedDeptName} */}
      <div className='firstTitle'>{appStore.match.params.name}</div>
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
    font-size: 21px;
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
