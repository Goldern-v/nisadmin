import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import { Card, Table, Tag } from 'antd'
const { Meta } = Card

import emitter from 'src/libs/ev'

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

const getTextColor = (text: any) =>
  text.indexOf('N') > -1 ? (
    <span>
      <Tag color={'red'} key={text}>
        {text.toUpperCase()}
      </Tag>
    </span>
  ) : text.indexOf('休') > -1 ? (
    <span>
      <Tag color={'blue'} key={text}>
        {text.toUpperCase()}
      </Tag>
    </span>
  ) : (
    <span>{text}</span>
  )

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
    title: '周一',
    dataIndex: 'rangeName1',
    width: '6%',
    render: (text: any) => getTextColor(text)
  },
  {
    title: '周二',
    dataIndex: 'rangeName2',
    width: '6%',
    render: (text: any) => getTextColor(text)
  },
  {
    title: '周三',
    dataIndex: 'rangeName3',
    width: '6%',
    render: (text: any) => getTextColor(text)
  },
  {
    title: '周四',
    dataIndex: 'rangeName4',
    width: '6%',
    render: (text: any) => getTextColor(text)
  },
  {
    title: '周五',
    dataIndex: 'rangeName5',
    width: '6%',
    render: (text: any) => getTextColor(text)
  },
  {
    title: '周六',
    dataIndex: 'rangeName6',
    width: '6%',
    render: (text: any) => getTextColor(text)
  },
  {
    title: '周日',
    dataIndex: 'rangeName7',
    width: '6%',
    render: (text: any) => getTextColor(text)
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

export default function ScheduleTable () {
  const [count, setCount] = useState(0)
  const [footer, setFooter] = useState('')
  const [scheduleList, setScheduleList] = useState([])

  useEffect(() => {
    console.log(count, setCount)
    setScheduleList([])
    setFooter('排班小计')

    let eventEmitterClean = emitter.addListener('清空排班记录', () => {
      setScheduleList([])
    })

    let eventEmitter = emitter.addListener('本周排班记录', (scheduleData) => {
      console.log('接收:本周排班记录event', scheduleData, scheduleList)
      // schShiftUser
      let tr = {}
      let newList = new Array()
      scheduleData.schShiftUser.map((nurse: any, shcIndex: number) => {
        console.log('nurse', shcIndex, nurse.empName, nurse)
        let getRangeName = (range: any, i: number) => {
          let result = ''
          try {
            result = range[i].rangeName
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
          rangeName1: getRangeName(nurse.settingDtos, 0) || '',
          rangeName2: getRangeName(nurse.settingDtos, 1) || '',
          rangeName3: getRangeName(nurse.settingDtos, 2) || '',
          rangeName4: getRangeName(nurse.settingDtos, 3) || '',
          rangeName5: getRangeName(nurse.settingDtos, 4) || '',
          rangeName6: getRangeName(nurse.settingDtos, 5) || '',
          rangeName7: getRangeName(nurse.settingDtos, 6) || '',
          remark: nurse.remark || '',
          thisWeekHour: nurse.thisWeekHour || '',
          status: getStatus() || ''
        }
        // console.log('tr', tr)
        newList.push(tr as any)
      })
      // 统计
      statisticFooter(newList)
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
            remark: '',
            thisWeekHour: '',
            status: ''
          })
        }
      }
      setScheduleList(newList as any)
    })
    console.log('eventEmitter', eventEmitter, eventEmitterClean)
  }, [])

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
      {scheduleList.length > 0 && (
        <ScheduleCon>
          <ScheduleTableCon>
            <Table columns={columns} dataSource={scheduleList} pagination={{ pageSize: 10 }} footer={() => footer} />
          </ScheduleTableCon>
        </ScheduleCon>
      )}
      {scheduleList.length === 0 && (
        <NoScheduleCon>
          <CardBox>
            <Card hoverable style={{ width: 240 }} cover={<img alt='' src='#' />}>
              <Meta style={{ textAlign: 'center' }} title='创建排班' />
            </Card>
          </CardBox>
        </NoScheduleCon>
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
  height: calc(100vh - 300px);
  overflow: auto;
  margin-top: 0px;
  background: #fff;
`

const ScheduleTableCon = styled.div`
  height: calc(100vh - 300px);
  overflow: auto;
  margin-top: 0px;
  background: #fff;
  /* background: red; */
`
