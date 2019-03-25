import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import service from 'src/services/api'

import { DatePicker } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'

const { RangePicker } = DatePicker
export interface Props extends RouteComponentProps {}

const dateFormat = 'YYYY-MM-DD'
export default function LeftBar () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  function onChange (date: any, dateString: any) {
    console.log(date, dateString)
    const postData = {
      deptCode: '2508', // deptCode  科室编码 // "门诊护理"
      stratTime: dateString[0], // stratTime 开始时间（刚开始由后台传给前台）
      endTime: dateString[1] // endTime   结束时间（刚开始由后台传给前台）
    }
    service.schedulingApiService
      .findShiftList(postData)
      .then((res) => {
        console.log('排班记录', res)
      })
      .catch((err) => {
        console.log('排班记录错误', err)
      })
  }
  return (
    <Wrapper>
      <label>排班记录</label>
      <SelectCon>
        <RangePicker onChange={onChange} format={dateFormat} locale={locale} />
      </SelectCon>
      <ListCon>第158周 03/01 - 03/07</ListCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const SelectCon = styled.div`
  height: 60px;
  background: #ddd;
  display: flex;
  align-items: center;
  padding: 0 5px;
`
const ListCon = styled.div`
  height: 0;
  flex: 1;
  background: #fff;
`
