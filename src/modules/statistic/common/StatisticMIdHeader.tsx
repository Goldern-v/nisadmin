import styled from 'styled-components'
// import React from 'react'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
import React, { useState, useEffect } from 'react'
import { authStore } from 'src/stores/index'
import emitter from 'src/libs/ev'

export default function StatisticMIdHeader () {
  const [title, settitle] = useState(() => {
    let deptName = authStore.getUser().deptName || ''
    console.log('deptName', deptName, authStore.getUser())
    statisticViewModel.deptName = deptName
    statisticViewModel.setTitle('护士休假统计')
    return statisticViewModel.getTitle
  })
  useEffect(() => {
    console.log(title, settitle)

    emitter.removeAllListeners('设置统计页标题')
    emitter.addListener('设置统计页标题', (titleName: any) => {
      settitle(titleName)
    })
  })
  return (
    <Con>
      <div className='firstTitle'>{title}</div>
      <div className='secondTitle'>
        日期：{statisticViewModel.startDate} 至 {statisticViewModel.endDate}
      </div>
    </Con>
  )
}

const Con = styled.div`
  margin-bottom: 8px;
  width: 100%;
  text-align: center;
  .firstTitle {
    margin: 0 auto;
    width: 510px;
    height: 29px;
    font-size: 21px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 29px;
    letter-spacing: 1px;
  }
  .secondTitle {
    margin: 0 auto;
    width: 100%;
    height: 18px;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
  }
`
