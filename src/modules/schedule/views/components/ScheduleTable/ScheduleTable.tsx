import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import { scheduleStore } from '@/stores'

import { Card, Table, Tag, message } from 'antd'
const { Meta } = Card

import emitter from 'src/libs/ev'

import moment from 'moment'
import service from 'src/services/api'
import { Link } from 'react-router-dom'
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

const getTextColor = (text: any, colorName: any) =>
  text.length > 0 ? (
    <span>
      <Tag color={colorName || ''} key={text} style={{ margin: 'auto auto' }}>
        {text.toUpperCase()}
      </Tag>
    </span>
  ) : (
    ''
  )

const getWeekDay = (weekday: number) => {
  let days = ['', '一', '二', '三', '四', '五', '六', '日']
  let date = moment(scheduleStore.getStartTime())
    .add(weekday - 1, 'days')
    .format('M[月]DD[日(周]dddd[)]')
  // console.log('周', weekday, scheduleStore.getStartTime(), date)
  if (date.indexOf('Invalid date') > -1) {
    return `周${days[weekday - 1]}`
  }
  return `${date}`
}

const columns = [
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
    dataIndex: 'currentLevel',
    width: '5%'
  },
  {
    title: '职称',
    dataIndex: 'title',
    width: '5%'
  },
  {
    title: () => getWeekDay(1),
    dataIndex: 'rangeName1',
    width: '70px',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor1)
  },
  {
    title: () => getWeekDay(2),
    dataIndex: 'rangeName2',
    width: '70px',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor2)
  },
  {
    title: () => getWeekDay(3),
    dataIndex: 'rangeName3',
    width: '70px',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor3)
  },
  {
    title: () => getWeekDay(4),
    dataIndex: 'rangeName4',
    width: '70px',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor4)
  },
  {
    title: () => getWeekDay(5),
    dataIndex: 'rangeName5',
    width: '70px',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor5)
  },
  {
    title: () => getWeekDay(6),
    dataIndex: 'rangeName6',
    width: '70px',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor6)
  },
  {
    title: () => getWeekDay(7),
    dataIndex: 'rangeName7',
    width: '70px',
    render: (text: any, record: any) => getTextColor(text, record.rangeNameColor7)
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '20%'
  },
  {
    title: '本周工时(小时)',
    dataIndex: 'thisWeekHour',
    width: '7%'
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '10%'
  }
]

let tableState = {
  bordered: false,
  loading: false,
  pagination: { pageSize: 10 }
  // expandedRowRender,
  // size: 'middle',
  // title: undefined,
  // showHeader: false,
  // footer,
  // rowSelection: {},
  // scroll: undefined
  // hasData: true
}

export default function ScheduleTable () {
  const [count, setCount] = useState(0)
  const [footer, setFooter] = useState('')
  const [scheduleList, setScheduleList] = useState([])
  // const [stratTime, setStratTime] = useState('')

  useEffect(() => {
    console.log(count, setCount)
    setScheduleList([])
    setFooter('排班小计')

    let eventList = ['动画载入表格中', '动画载入表格完成', '清空排班记录', '空白排班记录', '本周排班记录']
    eventList.map((ename) => emitter.removeAllListeners(ename))
    //
    // emitter.removeAllListeners('动画载入表格中')
    // emitter.removeAllListeners('动画载入表格完成')
    // emitter.removeAllListeners('清空排班记录')
    // emitter.removeAllListeners('空白排班记录')
    // emitter.removeAllListeners('本周排班记录')

    emitter.addListener('动画载入表格中', () => {
      tableState.loading = true
    })

    emitter.addListener('动画载入表格完成', () => {
      tableState.loading = false
    })

    emitter.addListener('清空排班记录', () => {
      setScheduleList([])
    })

    emitter.addListener('空白排班记录', () => {
      let newList = new Array()
      genEmptyTable(newList)
      setScheduleList(newList as any)
      setFooter('排班小计: 空')
      // newSchedule
      let deptCode = scheduleStore.getDeptCode()
      let stratTime = scheduleStore.getStartTime()
      let endTime = scheduleStore.getEndTime()
      console.log(deptCode, stratTime, endTime)
      const postData = {
        deptCode: deptCode, // deptCode  科室编码
        stratTime: stratTime, // stratTime 开始时间
        endTime: endTime // endTime   结束时间
      }
      service.schedulingApiService.newSchedule(postData).then((res) => {
        console.log('新建成功', res)
        emitter.emit('本周排班记录', res.data.data)
        if (res && res.data.data) {
          console.log('postDataArray', res)
          let userList = res.data.data.schShiftUser
          let postDataArray: any = new Array()
          let postLine: any = new Array()
          let startTime = scheduleStore.getStartTime()

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
                rangeId: '',
                status: '0',
                thisWeekHour: '0',
                rangeName: '',
                remark: ''
              }
              // console.log(key, element, shift, postLine)
              postDataArray.push(JSON.parse(JSON.stringify(postLine)))
            }
          })
          console.log('postDataArray', postDataArray)
          service.schedulingApiService.update(postDataArray).then((result: any) => {
            message.success(result.data.desc || '新建成功')
            console.log('新建成功result', result)
            emitter.emit('禁止工具按钮', false)
          })
        }
      })
    })

    emitter.addListener('本周排班记录', (scheduleData) => {
      console.log('接收:本周排班记录event', scheduleData, scheduleList)

      scheduleStore.setStartTime(scheduleData.stratTime)
      scheduleStore.setEndTime(scheduleData.endTime)

      let tr = {}
      let newList = new Array()
      scheduleData.schShiftUser.map((nurse: any, shcIndex: number) => {
        console.log('nurse', shcIndex, nurse.empName, nurse)
        let getRangeObj = (user: any, keyname: any, i: number) => {
          let result = ''
          try {
            result = user[i].range[keyname] // .rangeName
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
          rangeName1: getRangeObj(nurse.settingDtos, 'name', 0) || '',
          rangeName2: getRangeObj(nurse.settingDtos, 'name', 1) || '',
          rangeName3: getRangeObj(nurse.settingDtos, 'name', 2) || '',
          rangeName4: getRangeObj(nurse.settingDtos, 'name', 3) || '',
          rangeName5: getRangeObj(nurse.settingDtos, 'name', 4) || '',
          rangeName6: getRangeObj(nurse.settingDtos, 'name', 5) || '',
          rangeName7: getRangeObj(nurse.settingDtos, 'name', 6) || '',
          rangeNameColor1: getRangeObj(nurse.settingDtos, 'nameColor', 0) || '',
          rangeNameColor2: getRangeObj(nurse.settingDtos, 'nameColor', 1) || '',
          rangeNameColor3: getRangeObj(nurse.settingDtos, 'nameColor', 2) || '',
          rangeNameColor4: getRangeObj(nurse.settingDtos, 'nameColor', 3) || '',
          rangeNameColor5: getRangeObj(nurse.settingDtos, 'nameColor', 4) || '',
          rangeNameColor6: getRangeObj(nurse.settingDtos, 'nameColor', 5) || '',
          rangeNameColor7: getRangeObj(nurse.settingDtos, 'nameColor', 6) || '',
          remark: nurse.remark || '',
          thisWeekHour: nurse.thisWeekHour || '',
          status: getStatus() || ''
        }
        // console.log('tr', tr)
        newList.push(tr as any)
      })
      //
      // 补空行
      genEmptyTable(newList)
      // 统计
      statisticFooter(newList)

      tableState.loading = false
      setScheduleList(newList as any)
    })
    // console.log(
    //   'eventEmitter',
    //   eventEmitter,
    //   eventEmitterClean,
    //   eventEmitterLoading,
    //   eventEmitterLoaded,
    //   eventEmitterEmptyTable
    // )
  }, [])

  function genEmptyTable (newList: any) {
    // 补空行
    let diff = 10 - newList.length
    if (diff > 0) {
      for (let j = 0; j < diff; j++) {
        newList.push({
          id: '',
          empNo: '',
          empName: '',
          currentLevel: '',
          title: '',
          rangeName1: '',
          rangeName2: '',
          rangeName3: '',
          rangeName4: '',
          rangeName5: '',
          rangeName6: '',
          rangeName7: '',
          rangeNameColor1: '',
          rangeNameColor2: '',
          rangeNameColor3: '',
          rangeNameColor4: '',
          rangeNameColor5: '',
          rangeNameColor6: '',
          rangeNameColor7: '',
          remark: '',
          thisWeekHour: '',
          status: ''
        })
      }
    }
  }

  function statisticFooter (list: any) {
    console.log('统计', list)
    let workhour = 0
    let rangeNames = new Array()
    let rangeObj = new Object()

    list.map((item: any) => {
      if (item.thisWeekHour) {
        workhour += item.thisWeekHour
      }
      for (let ii = 1; ii < 8; ii++) {
        let element = (item as any)['rangeName' + ii]
        if (element && element.length > 0) {
          if (rangeNames.indexOf(element) === -1) {
            //
            (rangeObj as any)[element] = 1
          } else {
            (rangeObj as any)[element] += 1
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

    console.log('统计', workhour, rangeNames, rangeObj)
    // 排班小计：A1(3) 、A2(2)、N1(2)、...............，工时40小时。
    setFooter(`排班小计：${rangeSum}工时${workhour}小时。`)
    return ''
  }

  return (
    <Wrapper>
      {scheduleList.length === 0 ? (
        <NoScheduleCon>
          <CardBox
            onClick={() => {
              message.info('创建排班')
              // emitter.emit('空白排班记录')
            }}
          >
            <Link to='/scheduleSetting'>
              <Card hoverable style={{ width: 240 }} cover={<img alt='' src='#' />}>
                <Meta style={{ textAlign: 'center' }} title='创建排班' />
              </Card>
            </Link>
          </CardBox>
        </NoScheduleCon>
      ) : (
        <ScheduleCon>
          <ScheduleTableCon>
            <Table {...tableState} size='middle' columns={columns} dataSource={scheduleList} footer={() => footer} />
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
  table,
  td,
  tr,
  th {
    border: 1px solid #d9d8d8;
    min-height: 30px;
    text-align: center;
    height: 30px;
  }
  th {
    background: #f8f8f8;
    padding: 5px 0;
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
  height: calc(100vh - 200px);
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
