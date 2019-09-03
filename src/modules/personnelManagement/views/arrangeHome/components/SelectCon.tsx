import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { selectViewModal } from '../viewModal/SelectViewModal'
import { observer } from 'mobx-react-lite'
import { DatePicker, Button, Select, message } from 'src/vendors/antd'
import { fileDownload } from 'src/utils/file/file'
import { appStore } from 'src/stores'
import DeptSelect from 'src/components/DeptSelect'
import moment from 'moment'
import { scheduleStore } from 'src/stores'
import { arrangeService } from '../services/ArrangeService'
import { sheetViewModal } from '../viewModal/SheetViewModal'

export interface Props {}

export default observer(function SelectCon() {
  const [isInit, setIsInit] = useState(true)
  const [date, setDate] = useState([] as any[])
  const [deptCode, setDeptCode] = useState()
  const [group, setGroup] = useState('')
  const [groupList, setGroupList] = useState([])

  /** 日期*/
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
  // 日期变化函数
  const dateChange = (dates: any, dateString: any) => {
    if (dates && dates[0] && dates[1]) {
      let isOk = dates[1]._d.getTime() - dates[0]._d.getTime() > 2592000000
      if (isOk) {
        dates[1]._d = new Date(dates[0]._d.getTime() + 2592000000)
        message.warning('日期范围不能超过31天！')
      }
      setDate(dates)
      console.log(date)
      selectViewModal.setParams('startTime', moment(dates[0]._d).format('YYYY-MM-DD'))
      selectViewModal.setParams('endTime', moment(dates[1]._d).format('YYYY-MM-DD'))
    }
  }

  // 科室
  const handleChange = (value: any) => {
    setDeptCode(value)
    selectViewModal.setParams('deptCode', value)
  }

  // 分组变化数据
  const groupChange = (value: any) => {
    setGroup(value)
    selectViewModal.setParams('group', value)
  }

  // 分组数据
  const handleGroupChange = () => {
    arrangeService.getByDeptCode(deptCode).then((res) => {
      setGroupList(res.data)
    })
  }

  // 导出Excel
  const exportExcel = () => {
    let data = {
      deptCode: scheduleStore.getDeptCode(),
      startTime: moment(date[0]._d).format('YYYY-MM-DD'),
      endTime: moment(date[1]._d).format('YYYY-MM-DD')
    }
    arrangeService.export(data).then((res) => {
      fileDownload(res)
    })
  }

  let handleStatusChange = () => {
    setDate([moment(getMonday(), 'YYYY-MM-DD'), moment(getSunday(), 'YYYY-MM-DD')])
    selectViewModal.setParams('startTime', moment(getMonday(), 'YYYY-MM-DD').format('YYYY-MM-DD'))
    selectViewModal.setParams('endTime', moment(getSunday(), 'YYYY-MM-DD').format('YYYY-MM-DD'))
    setIsInit(false)
  }

  useEffect(() => {
    if (isInit) {
      handleStatusChange()
    }
  })

  const toPath = (path: string) => {
    appStore.history.push(path)
  }

  return (
    <Wrapper>
      <LeftIcon>
        <div className='item'>
          <div className='label data'>日期：</div>
          <div className='content'>
            <DatePicker.RangePicker
              ranges={{
                本月: [moment().startOf('month'), moment().endOf('month')],
                上月: [
                  moment()
                    .month(moment().month() - 1)
                    .startOf('month'),
                  moment()
                    .month(moment().month() - 1)
                    .endOf('month')
                ],
                下月: [
                  moment()
                    .month(moment().month() + 1)
                    .startOf('month'),
                  moment()
                    .month(moment().month() + 1)
                    .endOf('month')
                ]
              }}
              style={{ width: 200 }}
              value={date}
              onChange={dateChange}
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
            <Select value={group} onChange={groupChange} showSearch style={{ width: 170 }}>
              <Select.Option key='' value=''>
                全部
              </Select.Option>
              {groupList.map((item: any) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.groupName}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className='item'>
          <Button onClick={() => sheetViewModal.getSheetTableData()} className='statistics'>
            查询
          </Button>
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
      {/* <RightIcon>
        <span onClick={() => toPath('/personnelManagement/DeptBorrow')}>科室借用</span>
        <span> | </span>
        <span onClick={() => toPath('/personnelManagement/personnelSetting')}>人员分组</span>
        <span> | </span>
        <span onClick={() => toPath('/personnelManagement/nurseSetting')}>排班人员设置</span>
        <span> | </span>
        <span onClick={() => toPath('/personnelManagement/ShiftSettingView')}>班次设置</span>
        <span> | </span>
        <span onClick={() => toPath('/personnelManagement/mealSetting')}>排班套餐设置</span>
      </RightIcon> */}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 50px;
  padding-top: 9px;
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
