import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { selectViewModal } from '../viewModal/SelectViewModal'
import { observer } from 'mobx-react-lite'
import { DatePicker, Button, Select } from 'src/vendors/antd'
import { appStore } from 'src/stores'
import DeptSelect from 'src/components/DeptSelect'
import moment from 'moment'
import service from 'src/services/api'
import { scheduleStore } from 'src/stores'
import { arrangeService } from '../services/ArrangeService'

export interface Props {}

export default observer(function SelectCon() {
  const [date, setDate] = useState([] as any[])
  const [deptCode, setDeptCode] = useState()
  const [group, setGroup] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [groupList, setGroupList] = useState([])

  // 获取星期一
  let getMonday = () => {
    let today: any = new Date()
    let weekday = today.getDay()
    let dd = new Date(1000 * 60 * 60 * 24 * (1 - weekday) + today.getTime())
    let y = dd.getFullYear()
    let m: any = dd.getMonth() + 1 //获取当前月份的日期
    m = parseInt(m, 10)
    if (m < 10) {
      m = '0' + m
    }
    let d: any = dd.getDate()
    d = parseInt(d, 10)
    if (d < 10) {
      d = '0' + d
    }
    return y + '-' + m + '-' + d
  }

  // 获取星期日
  let getSunday = () => {
    var today = new Date()
    var weekday = today.getDay()
    var dd = new Date(1000 * 60 * 60 * 24 * (7 - weekday) + today.getTime())
    var y = dd.getFullYear()
    var m: any = dd.getMonth() + 1 //获取当前月份的日期
    m = parseInt(m, 10)
    if (m < 10) {
      m = '0' + m
    }
    var d: any = dd.getDate()
    d = parseInt(d, 10)
    if (d < 10) {
      d = '0' + d
    }
    return y + '-' + m + '-' + d
  }

  const handleData = (time: any) => {
    if (!time) {
      return false
    } else {
      // 大于当前日期不能选 time > moment()
      // 小于当前日期不能选 time < moment().subtract(1, "days")
      // 只能选前7后7 time < moment().subtract(7, "days") || time > moment().add(7, 'd')
      return time > moment().add(31, 'd')
    }
  }

  // 当前科室
  const handleChange = (value: any) => {
    setDeptCode(value)
    console.log(deptCode, '99999999')
  }

  // 分组
  const handleGroupChange = () => {
    let deptCode = scheduleStore.getDeptCode()
    console.log(deptCode, '666666')
    arrangeService.getByDeptCode(deptCode).then((res) => {
      console.log(res.data, '666666')
    })
  }

  //导出excel
  const exportExcel = () => {
    let data = {
      deptCode: scheduleStore.getDeptCode(),
      stratTime: moment(getMonday(), 'YYYY-MM-DD'),
      endTime: moment(getSunday(), 'YYYY-MM-DD')
    }
    arrangeService.export(data).then((res) => {
      console.log(res, '666666')
    })
  }

  const disabledDate = (currentDate: any) => {
    console.log(date, currentDate)
    return currentDate && currentDate < moment().subtract(1, 'M')
  }

  const toPath = (path: string) => {
    appStore.history.push(path)
  }

  useEffect(() => {
    handleGroupChange()
    setDate([moment(getMonday(), 'YYYY-MM-DD'), moment(getSunday(), 'YYYY-MM-DD')])
  }, [])

  return (
    <Wrapper>
      <LeftIcon>
        <div className='item'>
          <div className='label data'>日期：</div>
          <div className='content'>
            <DatePicker.RangePicker
              style={{ width: 200 }}
              defaultValue={[moment(getMonday(), 'YYYY-MM-DD'), moment(getSunday(), 'YYYY-MM-DD')]}
              disabledDate={disabledDate}
            />
          </div>
        </div>
        <div className='item'>
          <div className='label'>科室：</div>
          <div className='content'>
            <DeptSelect onChange={handleChange} />
          </div>
        </div>
        <div className='item'>
          <div className='label'>分组：</div>
          <div className='content'>
            <Select value={group} onChange={(value: any) => setGroup(value)} showSearch style={{ width: 170 }}>
              {/* {groupList.map((item: any) => (
              <Select.Option value={item.type} key={item.id}>
                {item.type}
              </Select.Option>
            ))} */}
            </Select>
          </div>
        </div>
        <div className='item'>
          <Button className='statistics'>查询</Button>
        </div>
        <div className='item'>
          <Button
            className='statistics'
            onClick={() => {
              appStore.history.push('/personnelManagement/EditArrangePage')
            }}
          >
            编辑排班
          </Button>
        </div>
        <div className='item'>
          <Button className='statistics getExcel' onClick={exportExcel}>
            导出Excel
          </Button>
        </div>
      </LeftIcon>
      <RightIcon>
        <span onClick={() => toPath('/personnelManagement/DeptBorrow')}>科室借用</span>
        <span> | </span>
        <span onClick={() => toPath('/personnelManagement/personnelSetting')}>人员分组</span>
        <span> | </span>
        <span onClick={() => toPath('/personnelManagement/nurseSetting')}>排班人员设置</span>
        <span> | </span>
        <span onClick={() => toPath('/personnelManagement/ShiftSettingView')}>班次设置</span>
        <span> | </span>
        <span onClick={() => toPath('/personnelManagement/mealSetting')}>排班套餐设置</span>
      </RightIcon>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 60px;
  padding-top: 14px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #ccc;
  .item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    & > div {
      display: inline-block;
      vertical-align: middle;
    }
  }
`
const LeftIcon = styled.div`
  float: left;
  font-size: 13px;
  .getExcel {
    margin-right: 0;
  }
  .data {
    margin-left: 10px;
  }
`

const RightIcon = styled.div`
  float: right;
  font-size: 13px;
  height: 32px;
  vertical-align: middle;
  margin-top: 5px;
  margin-right: 5px;
  span {
    cursor: pointer;
    color: #00a680;
  }
`
