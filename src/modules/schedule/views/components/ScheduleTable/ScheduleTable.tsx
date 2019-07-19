import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import { scheduleStore, authStore } from 'src/stores'

import { Card, Table, Tag, message } from 'antd'
const { Meta } = Card

import emitter from 'src/libs/ev'

import moment from 'moment'
import service from 'src/services/api'
import { Link } from 'react-router-dom'
import BaseTable from 'src/components/BaseTable'
// import { Link } from 'react-router-dom'
moment.locale('zh-cn', {
  weekdays: '日_一_二_三_四_五_六'.split('_')
})

const dateFormat = 'YYYY-MM-DD'

export interface Props extends RouteComponentProps {}

export interface ThItem {
  key?: string
  value: string
  width?: string
  style?: any
}

export interface TdItem {
  key: string
  value: string
}

const newImg = require('src/modules/schedule/views/components/images/new.png')

const getTextColor = (text: any, colorName: any) =>
  text && text.length > 0 ? (
    <span>
      <span color={colorName || ''} key={text} style={{ margin: 'auto auto', color: colorName }}>
        {text.toUpperCase()}
      </span>
    </span>
  ) : (
    ''
  )

const getWeekDay_1 = (weekday: number) => {
  let days = ['', '一', '二', '三', '四', '五', '六', '日']
  let date = moment(scheduleStore.getStartTime())
    .add(weekday - 1, 'days')
    .format('MM[月]DD[日]')
  let result: any = null
  let color: any = weekday > 5 ? 'red' : ''
  if (date.indexOf('Invalid date') > -1) {
    return `周${days[weekday - 1]}`
  }
  return (
    <div style={{ padding: '3px 0', color: color }}>
      {date}
      <br />
      (周{days[weekday]})
    </div>
  )
}
const getWeekDay_2 = (weekday: number) => {
  scheduleStore.getStartTime()
  let days = ['', '一', '二', '三', '四', '五', '六', '日', '一', '二', '三', '四', '五', '六', '日']
  let date = moment(scheduleStore.getStartTime())
    .add(weekday - 1, 'days')
    .format('DD')
  let result: any = null
  let color: any = days[weekday] == '六' || days[weekday] == '日' ? 'red' : ''
  if (date.indexOf('Invalid date') > -1) {
    return `周${days[weekday - 1]}`
  }
  return (
    <div style={{ padding: '3px 0', color: color }}>
      {date}
      <br />
      {days[weekday]}
    </div>
  )
}

const columns_1: any = [
  {
    title: '序号',
    dataIndex: 'id',
    width: '5%'
  },
  {
    title: '工号',
    dataIndex: 'empNo',
    width: '5%'
  },
  {
    title: '姓名',
    dataIndex: 'empName',
    width: '5%'
  },
  {
    title: '层级',
    dataIndex: 'nurseHierarchy',
    width: '5%'
  },
  {
    title: '职称',
    dataIndex: 'newTitle',
    width: '8%'
  },
  {
    title: () => getWeekDay_1(1),
    dataIndex: 'rangeName1',
    width: '8%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor1)
  },
  {
    title: () => getWeekDay_1(2),
    dataIndex: 'rangeName2',
    width: '8%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor2)
  },
  {
    title: () => getWeekDay_1(3),
    dataIndex: 'rangeName3',
    width: '8%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor3)
  },
  {
    title: () => getWeekDay_1(4),
    dataIndex: 'rangeName4',
    width: '8%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor4)
  },
  {
    title: () => getWeekDay_1(5),
    dataIndex: 'rangeName5',
    width: '8%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor5)
  },
  {
    title: () => getWeekDay_1(6),
    dataIndex: 'rangeName6',
    width: '8%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor6)
  },
  {
    title: () => getWeekDay_1(7),
    dataIndex: 'rangeName7',
    width: '8%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor7)
  },
  {
    title: () => {
      return (
        <span>
          本周工时
          <br />
          (小时)
        </span>
      )
    },
    dataIndex: 'thisWeekHour',
    width: '7%'
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '10%'
  }
]
const columns_2: any = [
  {
    title: '序号',
    dataIndex: 'id',
    width: '4%'
  },
  {
    title: '工号',
    dataIndex: 'empNo',
    width: '5%'
  },
  {
    title: '姓名',
    dataIndex: 'empName',
    width: '5%'
  },
  {
    title: '层级',
    dataIndex: 'nurseHierarchy',
    width: '4%'
  },
  {
    title: '职称',
    dataIndex: 'newTitle',
    width: '5%'
  },
  {
    title: () => getWeekDay_2(1),
    dataIndex: 'rangeName1',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor1)
  },
  {
    title: () => getWeekDay_2(2),
    dataIndex: 'rangeName2',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor2)
  },
  {
    title: () => getWeekDay_2(3),
    dataIndex: 'rangeName3',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor3)
  },
  {
    title: () => getWeekDay_2(4),
    dataIndex: 'rangeName4',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor4)
  },
  {
    title: () => getWeekDay_2(5),
    dataIndex: 'rangeName5',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor5)
  },
  {
    title: () => getWeekDay_2(6),
    dataIndex: 'rangeName6',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor6)
  },
  {
    title: () => getWeekDay_2(7),
    dataIndex: 'rangeName7',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor7)
  },
  {
    title: () => getWeekDay_2(8),
    dataIndex: 'rangeName8',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor8)
  },
  {
    title: () => getWeekDay_2(9),
    dataIndex: 'rangeName9',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor9)
  },
  {
    title: () => getWeekDay_2(10),
    dataIndex: 'rangeName10',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor10)
  },
  {
    title: () => getWeekDay_2(11),
    dataIndex: 'rangeName11',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor11)
  },
  {
    title: () => getWeekDay_2(12),
    dataIndex: 'rangeName12',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor12)
  },
  {
    title: () => getWeekDay_2(13),
    dataIndex: 'rangeName13',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor13)
  },
  {
    title: () => getWeekDay_2(14),
    dataIndex: 'rangeName14',
    width: '4%',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor14)
  },
  {
    title: () => {
      return (
        <span>
          本周工时
          <br />
          (小时)
        </span>
      )
    },
    dataIndex: 'thisWeekHour',
    width: '7%'
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '5%'
  }
]

export default function ScheduleTable() {
  const [columns, setColumns] = useState([])
  const [footer, setFooter] = useState('<span></span>')
  const [loading, setLoading] = useState(false)
  const [scheduleList, setScheduleList] = useState([])
  // const [startTime, setstartTime] = useState('')

  useEffect(() => {
    setScheduleList([])
    setFooter('<span>排班小计: 空</span>')
  }, [])
  let eventList = ['动画载入表格中', '动画载入表格完成', '清空排班记录', '空白排班记录', '本周排班记录', '二周排班记录']
  eventList.map((ename) => emitter.removeAllListeners(ename))

  emitter.addListener('动画载入表格中', () => {
    setLoading(true)
  })

  emitter.addListener('动画载入表格完成', () => {
    setLoading(false)
  })

  emitter.addListener('清空排班记录', () => {
    setScheduleList([])
  })

  emitter.addListener('空白排班记录', () => {
    let newList = new Array()
    // genEmptyTable(newList)
    setScheduleList(newList as any)
    // setFooter('排班小计: 空')
    setFooter('<span>排班小计: 空</span>')
    // newSchedule
    let deptCode = scheduleStore.getDeptCode()
    let startTime = scheduleStore.getStartTime()
    let endTime = scheduleStore.getEndTime()

    const postData = {
      deptCode: deptCode, // deptCode  科室编码
      startTime: startTime, // startTime 开始时间
      endTime: endTime // endTime   结束时间
    }
    service.schedulingApiService.newSchedule(postData).then((res) => {
      emitter.emit('本周排班记录', res.data)
      if (res && res.data) {
        let userList = res.data.schShiftUser
        let postDataArray: any = new Array()
        let postLine: any = new Array()

        userList.map((user: any) => {
          for (let index = 0; index < 7; index++) {
            // 自动新建保存空白内容
            postLine = {
              id: {
                userId: user.id,
                workDate: moment(startTime)
                  .add('d', index)
                  .format(dateFormat)
              },
              // rangeId: '',
              status: '0',
              thisWeekHour: '0',
              rangeName: '',
              remark: ''
            }
            // console.log(key, element, shift, postLine)
            postDataArray.push(JSON.parse(JSON.stringify(postLine)))
          }
        })

        let weekRange = {
          startTime: scheduleStore.getStartTime(),
          endTime: scheduleStore.getEndTime()
        }

        service.schedulingApiService
          .update(postDataArray, weekRange, authStore.selectedDeptCode)
          .then((result: any) => {
            message.success(result.data.desc || '新建成功')

            emitter.emit('禁止工具按钮', false)
          })
      }
    })
  })
  emitter.addListener('本周排班记录', (scheduleData) => {
    let tr = {}
    let newList = new Array()
    scheduleData.schShiftUser.map((nurse: any, shcIndex: number) => {
      let getRangeObj = (user: any, keyname: any, i: number) => {
        let result = ''
        try {
          result = user[i][keyname] // .rangeName
          // range[i].range.nameColor
        } catch (error) {
          return ''
        }
        return result
      }
      let getStatus = () => {
        // status   0代表暂存，1代表发布
        switch (nurse.status) {
          case '0':
            return '暂存'
          case '1':
            return '发布'
          default:
            return '未设置排班'
        }
      }

      tr = {
        id: shcIndex + 1 || '',
        empNo: nurse.empNo || '',
        empName: nurse.empName || '',
        currentLevel: nurse.currentLevel || '',
        title: nurse.title || '',
        newTitle: nurse.newTitle || '',
        nurseHierarchy: nurse.nurseHierarchy || '',
        rangeName1: getRangeObj(nurse.settingDtos, 'rangeName', 0) || '',
        rangeName2: getRangeObj(nurse.settingDtos, 'rangeName', 1) || '',
        rangeName3: getRangeObj(nurse.settingDtos, 'rangeName', 2) || '',
        rangeName4: getRangeObj(nurse.settingDtos, 'rangeName', 3) || '',
        rangeName5: getRangeObj(nurse.settingDtos, 'rangeName', 4) || '',
        rangeName6: getRangeObj(nurse.settingDtos, 'rangeName', 5) || '',
        rangeName7: getRangeObj(nurse.settingDtos, 'rangeName', 6) || '',
        rangeNameCode1: getRangeObj(nurse.settingDtos, 'rangeNameCode', 0) || '',
        rangeNameCode2: getRangeObj(nurse.settingDtos, 'rangeNameCode', 1) || '',
        rangeNameCode3: getRangeObj(nurse.settingDtos, 'rangeNameCode', 2) || '',
        rangeNameCode4: getRangeObj(nurse.settingDtos, 'rangeNameCode', 3) || '',
        rangeNameCode5: getRangeObj(nurse.settingDtos, 'rangeNameCode', 4) || '',
        rangeNameCode6: getRangeObj(nurse.settingDtos, 'rangeNameCode', 5) || '',
        rangeNameCode7: getRangeObj(nurse.settingDtos, 'rangeNameCode', 6) || '',
        rangeNameColor1: getRangeObj(nurse.settingDtos, 'nameColor', 0) || '',
        rangeNameColor2: getRangeObj(nurse.settingDtos, 'nameColor', 1) || '',
        rangeNameColor3: getRangeObj(nurse.settingDtos, 'nameColor', 2) || '',
        rangeNameColor4: getRangeObj(nurse.settingDtos, 'nameColor', 3) || '',
        rangeNameColor5: getRangeObj(nurse.settingDtos, 'nameColor', 4) || '',
        rangeNameColor6: getRangeObj(nurse.settingDtos, 'nameColor', 5) || '',
        rangeNameColor7: getRangeObj(nurse.settingDtos, 'nameColor', 6) || '',
        remark: nurse.remark || '',
        thisWeekHour: Number(nurse.thisWeekHour || 0).toFixed(2),
        status: getStatus() || ''
      }

      newList.push(tr as any)
    })

    statisticFooter(newList)
    setLoading(false)
    setScheduleList(newList as any)
    setColumns(columns_1)
  })

  emitter.addListener('二周排班记录', (scheduleData) => {
    let tr = {}
    let newList = new Array()
    scheduleData.schShiftUser.map((nurse: any, shcIndex: number) => {
      let getRangeObj = (user: any, keyname: any, i: number) => {
        let result = ''
        try {
          result = user[i][keyname]
        } catch (error) {
          return ''
        }
        return result
      }
      let getStatus = () => {
        switch (nurse.status) {
          case '0':
            return '暂存'
          case '1':
            return '发布'
          default:
            return '未设置排班'
        }
      }

      tr = {
        id: shcIndex + 1 || '',
        empNo: nurse.empNo || '',
        empName: nurse.empName || '',
        currentLevel: nurse.currentLevel || '',
        title: nurse.title || '',
        newTitle: nurse.newTitle || '',
        nurseHierarchy: nurse.nurseHierarchy || '',
        rangeName1: getRangeObj(nurse.settingDtos, 'rangeName', 0) || '',
        rangeName2: getRangeObj(nurse.settingDtos, 'rangeName', 1) || '',
        rangeName3: getRangeObj(nurse.settingDtos, 'rangeName', 2) || '',
        rangeName4: getRangeObj(nurse.settingDtos, 'rangeName', 3) || '',
        rangeName5: getRangeObj(nurse.settingDtos, 'rangeName', 4) || '',
        rangeName6: getRangeObj(nurse.settingDtos, 'rangeName', 5) || '',
        rangeName7: getRangeObj(nurse.settingDtos, 'rangeName', 6) || '',
        rangeName8: getRangeObj(nurse.settingDtos, 'rangeName', 7) || '',
        rangeName9: getRangeObj(nurse.settingDtos, 'rangeName', 8) || '',
        rangeName10: getRangeObj(nurse.settingDtos, 'rangeName', 9) || '',
        rangeName11: getRangeObj(nurse.settingDtos, 'rangeName', 10) || '',
        rangeName12: getRangeObj(nurse.settingDtos, 'rangeName', 11) || '',
        rangeName13: getRangeObj(nurse.settingDtos, 'rangeName', 12) || '',
        rangeName14: getRangeObj(nurse.settingDtos, 'rangeName', 13) || '',
        rangeNameCode1: getRangeObj(nurse.settingDtos, 'rangeNameCode', 0) || '',
        rangeNameCode2: getRangeObj(nurse.settingDtos, 'rangeNameCode', 1) || '',
        rangeNameCode3: getRangeObj(nurse.settingDtos, 'rangeNameCode', 2) || '',
        rangeNameCode4: getRangeObj(nurse.settingDtos, 'rangeNameCode', 3) || '',
        rangeNameCode5: getRangeObj(nurse.settingDtos, 'rangeNameCode', 4) || '',
        rangeNameCode6: getRangeObj(nurse.settingDtos, 'rangeNameCode', 5) || '',
        rangeNameCode7: getRangeObj(nurse.settingDtos, 'rangeNameCode', 6) || '',
        rangeNameCode8: getRangeObj(nurse.settingDtos, 'rangeNameCode', 7) || '',
        rangeNameCode9: getRangeObj(nurse.settingDtos, 'rangeNameCode', 8) || '',
        rangeNameCode10: getRangeObj(nurse.settingDtos, 'rangeNameCode', 9) || '',
        rangeNameCode11: getRangeObj(nurse.settingDtos, 'rangeNameCode', 10) || '',
        rangeNameCode12: getRangeObj(nurse.settingDtos, 'rangeNameCode', 11) || '',
        rangeNameCode13: getRangeObj(nurse.settingDtos, 'rangeNameCode', 12) || '',
        rangeNameCode14: getRangeObj(nurse.settingDtos, 'rangeNameCode', 13) || '',
        rangeNameColor1: getRangeObj(nurse.settingDtos, 'nameColor', 0) || '',
        rangeNameColor2: getRangeObj(nurse.settingDtos, 'nameColor', 1) || '',
        rangeNameColor3: getRangeObj(nurse.settingDtos, 'nameColor', 2) || '',
        rangeNameColor4: getRangeObj(nurse.settingDtos, 'nameColor', 3) || '',
        rangeNameColor5: getRangeObj(nurse.settingDtos, 'nameColor', 4) || '',
        rangeNameColor6: getRangeObj(nurse.settingDtos, 'nameColor', 5) || '',
        rangeNameColor7: getRangeObj(nurse.settingDtos, 'nameColor', 6) || '',
        rangeNameColor8: getRangeObj(nurse.settingDtos, 'nameColor', 7) || '',
        rangeNameColor9: getRangeObj(nurse.settingDtos, 'nameColor', 8) || '',
        rangeNameColor10: getRangeObj(nurse.settingDtos, 'nameColor', 9) || '',
        rangeNameColor11: getRangeObj(nurse.settingDtos, 'nameColor', 10) || '',
        rangeNameColor12: getRangeObj(nurse.settingDtos, 'nameColor', 11) || '',
        rangeNameColor13: getRangeObj(nurse.settingDtos, 'nameColor', 12) || '',
        rangeNameColor14: getRangeObj(nurse.settingDtos, 'nameColor', 13) || '',
        remark: nurse.remark || '',
        thisWeekHour: Number(nurse.thisWeekHour || 0).toFixed(2),
        status: getStatus() || ''
      }

      newList.push(tr as any)
    })

    // 补空行
    // 统计
    statisticFooter(newList)
    setLoading(false)
    setScheduleList(newList as any)
    setColumns(columns_2)
  })

  function statisticFooter(list: any) {
    let workhour = 0
    let rangeNames = new Array()
    let rangeObj = new Object()
    let remark = '空'

    list.map((item: any) => {
      if (item.thisWeekHour) {
        workhour += !isNaN(Number(item.thisWeekHour)) ? Number(item.thisWeekHour) : 0
      }
      if (!remark || remark === '空') {
        remark = item.remark
      }
      for (let ii = 1; ii < 8; ii++) {
        let element = (item as any)['rangeNameCode' + ii] || (item as any)['rangeName' + ii]
        if (element && element.length > 0) {
          if (rangeNames.indexOf(element) === -1) {
            //
            ;(rangeObj as any)[element] = 1
          } else {
            ;(rangeObj as any)[element] += 1
          }
          rangeNames.push(element)
        }
      }
    })

    let rangeSum = ''
    for (const key in rangeObj) {
      if (rangeObj.hasOwnProperty(key)) {
        const element = (rangeObj as any)[key]
        rangeSum += `${key}(${element})，`
      }
    }
    rangeSum = rangeSum.trim()

    // 排班小计：A1(3) 、A2(2)、N1(2)、...............，工时40小时。
    let totle = `排班小计：${rangeSum}工时${Number(workhour).toFixed(2)}小时。`
    // remark = `备注：${remark||'空'}`
    let result = `<span>排班备注：${remark}</span>`

    setFooter(result)
    return ''
  }

  return (
    <Wrapper>
      {scheduleList.length === 0 ? (
        <NoScheduleCon>
          <CardBox
            onClick={() => {
              message.success('创建排班')
              // emitter.emit('空白排班记录')
            }}
          >
            <Link to='/scheduleSetting'>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img alt='' src={newImg} style={{ width: '72px', margin: 'auto auto', padding: '10px 0 0 0' }} />
                }
              >
                <Meta style={{ textAlign: 'center' }} title='创建排班' />
              </Card>
            </Link>
          </CardBox>
        </NoScheduleCon>
      ) : (
        <ScheduleCon>
          <ScheduleTableCon>
            <BaseTable
              loading={loading}
              columns={columns}
              dataSource={scheduleList}
              tip={footer}
              wrapperStyle={{ padding: 5 }}
              pagination={false}
              surplusHeight={180}
              style={{ padding: 0 }}
            />
          </ScheduleTableCon>
        </ScheduleCon>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: #fff;
  table {
    width: 100%;
    border-collapse: collapse;
  }
`
const NoScheduleCon = styled.div`
  height: calc(100vh - 300px);
  overflow: auto;
  margin-top: -1px;
  background: #fff;
`

const CardBox = styled.div`
  width: 200px;
  margin: auto auto;
  position: relative;
  top: 35%;
  background: green;
`

const ScheduleCon = styled.div`
  /* height: calc(100vh - 200px); */
  overflow: auto;
  margin-top: 0px;
  background: #fff;
`

const ScheduleTableCon = styled.div`
  height: auto; /* calc(100vh - 300px); */
  overflow: auto;
  margin-top: 0px;
  background: #fff;
  /* background: red; */

  th,
  td {
    text-align: center !important;
    padding: 0px !important;
  }
`
