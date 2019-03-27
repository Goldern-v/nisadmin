import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import service from 'src/services/api'
import emitter from 'src/libs/ev'

import { Menu, Icon, DatePicker } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'

import moment from 'moment'
import { scheduleStore } from '@/stores'
moment.locale('zh-cn')

const { RangePicker } = DatePicker
export interface Props extends RouteComponentProps {}

const dateFormat = 'YYYY-MM-DD'
// const SubMenu = Menu.SubMenu
const ItemMenu = Menu.Item

export default function LeftBar () {
  const [count, setCount] = useState(0)
  const [monthStart, setMonthStart] = useState(() => {
    let date = new Date()
    let firstDay = date.setDate(1)
    return moment(firstDay).format(dateFormat)
  })
  const [shiftList, setShiftList] = useState([
    {
      mondy: '',
      status: '',
      sundy: '',
      week: 0
    }
  ])

  useEffect(() => {
    console.log(count, setCount)
    setShiftList([])
    // 默认获取最近一月排班
    let date = new Date()
    let firstDay = date.setDate(1)
    // 接口请求参数
    const postData = {
      deptCode: '2508', // deptCode  科室编码 // "门诊护理"
      stratTime: moment(firstDay).format(dateFormat), // stratTime 开始时间（刚开始由后台传给前台）
      endTime: moment().format(dateFormat) // endTime   结束时间（刚开始由后台传给前台）
    }
    setMonthStart(moment(firstDay).format(dateFormat))
    updateWeekList(postData.stratTime, postData.endTime, (time: any) => {
      handleItem(time[0])
    })
  }, [])
  // 选择日期间段发生改变时执行
  function onChange (date: any, dateString: any) {
    console.log(date, dateString)
    updateWeekList(dateString[0], dateString[1])
  }

  function updateWeekList (stratTime: string, endTime: string, callBack: any = null) {
    // 接口请求参数
    const postData = {
      deptCode: '2508' || scheduleStore.getDepartment().deptCode, // deptCode  科室编码 // "门诊护理"
      stratTime: stratTime, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: endTime // endTime   结束时间（刚开始由后台传给前台）
    }
    service.schedulingApiService
      .findTimeList(postData)
      .then((res) => {
        console.log('排班周列表', res)
        //
        setShiftList(res.data.data)
        if (callBack) {
          callBack(res.data.data)
        }
      })
      .catch((err) => {
        console.log('排班周列表错误', err)
      })
  }

  function handleItem (time: any) {
    console.log('排班', time)
    // 接口请求参数
    const postData = {
      deptCode: '2508' || scheduleStore.getDepartment().deptCode, // deptCode  科室编码 // "门诊护理"
      stratTime: time.mondy, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: time.sundy // endTime   结束时间（刚开始由后台传给前台）
    }
    service.schedulingApiService
      .findShiftList(postData)
      .then((res) => {
        console.log('发出：排班记录，从组件LeftBar', res)
        // todo ... emitter 将数据传递给表格组件进行下一步数据渲染
        emitter.emit('本周排班记录', res.data.data)
      })
      .catch((err) => {
        console.log('排班记录错误', err)
      })
  }
  return (
    <Wrapper>
      <Menu mode='inline' style={{ width: '100%', height: 'auto', minHeight: '100vh' }}>
        <ItemMenu onClick={(e) => emitter.emit('清空排班记录')} key='sub1'>
          <span>
            <Icon type='calendar' />
            <span>排班记录</span>
          </span>
        </ItemMenu>
        <SelectCon>
          <RangePicker
            defaultValue={[moment(monthStart, dateFormat), moment(new Date(), dateFormat)]}
            onChange={onChange}
            format={dateFormat}
            locale={locale}
          />
        </SelectCon>
        {shiftList.map((time, index) => (
          <ItemMenu onClick={(e) => handleItem(time)} key={index}>
            <CircleCon color={time.status} />
            {`第${moment(time.mondy || new Date()).format('w') || time.week}周 ${moment(
              time.mondy || new Date()
            ).format('MM/DD')} - ${moment(time.sundy || new Date()).format('MM/DD')}`}
          </ItemMenu>
        ))}
      </Menu>
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
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 5px;
`
const CircleCon = styled.div`
  height: 10px;
  width: 10px;
  display: inline-block;
  border-radius: 5px;
  margin-right: 5px;
  background: ${(props) => (props.color === '1' ? 'green' : props.color === '0' ? 'red' : 'gray')};
`
// 0代表暂存红，1代表发布绿, 其他灰色
