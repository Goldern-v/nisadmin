import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import TrainingApi from '../api/TrainingApi'

export default function leftList() {
  const [listData, useListData]: any = useState([])
  useEffect(() => {}, [])
  const cacheListData = [
    '人员管理',
    '院内学习班',
    '教学计划',
    '练习管理',
    '考试管理',
    '视频学习',
    '题库管理',
    '培训管理',
    '晋级设置'
  ]
  useListData(cacheListData)
  const LeftDom = listData.map((item: string) => {
    return <div>{item}</div>
  })
  return (
    <Con>
      <div />
    </Con>
  )
}

const Con = styled.div`
  height: 100%;
  width: 100%;
`
