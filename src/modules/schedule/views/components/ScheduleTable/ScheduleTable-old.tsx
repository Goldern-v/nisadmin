import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import Th from './Th'
import Tr from './Tr'
import Col from './Col'

import { Card } from 'antd'
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

interface TableData {
  th: ThItem[]
  tr: TdItem[]
}
const tableData: TableData = {
  th: [
    {
      value: '序号',
      width: '5%'
    },
    {
      value: '工号',
      width: '5%'
    },
    {
      value: '姓名',
      width: '5%'
    },
    {
      value: '层级',
      width: '5%'
    },
    {
      value: '职称',
      width: '5%'
    },
    {
      value: '周一',
      width: '6%'
    },
    {
      value: '周二',
      width: '6%'
    },
    {
      value: '周三',
      width: '6%'
    },
    {
      value: '周四',
      width: '6%'
    },
    {
      value: '周五',
      width: '6%'
    },
    {
      value: '周六',
      width: '6%'
    },
    {
      value: '周日',
      width: '6%'
    },
    {
      value: '备注',
      width: '20%'
    },
    {
      value: '本周工时(小时)',
      width: '7%'
    },
    {
      value: '状态',
      width: '10%'
    }
  ],
  tr: [
    {
      key: 'id',
      value: 'id'
    },
    {
      key: 'empNo',
      value: 'empNo'
    },
    {
      key: 'empName',
      value: 'empName'
    },
    {
      key: 'currentLevel',
      value: 'currentLevel'
    },
    {
      key: 'title',
      value: 'title'
    },
    {
      key: 'rangeName1',
      value: 'rangeName1'
    },
    {
      key: 'rangeName2',
      value: 'rangeName2'
    },
    {
      key: 'rangeName3',
      value: 'rangeName3'
    },
    {
      key: 'rangeName4',
      value: 'rangeName4'
    },
    {
      key: 'rangeName5',
      value: 'rangeName5'
    },
    {
      key: 'rangeName6',
      value: 'rangeName6'
    },
    {
      key: 'rangeName7',
      value: 'rangeName7'
    },
    {
      key: 'remark',
      value: 'remark'
    },
    {
      key: 'thisWeekHour',
      value: 'thisWeekHour'
    },
    {
      key: 'status',
      value: 'status'
    }
  ]
}

export default function ScheduleTable () {
  const [count, setCount] = useState(0)
  const [scheduleList, setscheduleList] = useState([
    [
      {
        key: '',
        value: ''
      }
    ]
  ])
  useEffect(() => {
    console.log(count, setCount)
    setscheduleList([])

    emitter.removeAllListeners('清空排班记录')
    emitter.removeAllListeners('本周排班记录')

    let eventEmitterClean = emitter.addListener('清空排班记录', () => {
      setscheduleList([])
    })

    let eventEmitter = emitter.addListener('本周排班记录', (scheduleData) => {
      console.log('接收:本周排班记录event', scheduleData, scheduleList)
      // schShiftUser
      let trobj = {}
      let newList = [[]]
      newList = []
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
        trobj = {
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
          status: nurse.status || ''
        }
        let tr = []
        for (let key in trobj) {
          if (trobj.hasOwnProperty(key)) {
            let value = (trobj as any)[key]
            tr.push({ key: key, value: value })
          }
        }
        console.log('tr', tr, newList)
        newList.push(tr as any)
      })
      // 补空行
      let diff = 50 - newList.length
      if (diff > 0) {
        for (let j = 0; j < diff; j++) {
          let tr = []
          for (let i = 0; i < 15; i++) {
            tr.push({ key: '', value: '' })
          }
          newList.push(tr as any)
        }
      }
      setscheduleList(newList)
    })
    console.log('eventEmitter', eventEmitter, eventEmitterClean)
  }, [])
  return (
    <Wrapper>
      {scheduleList.length > 0 && (
        <ScheduleCon>
          <ScheduleTableCon>
            <table>
              <Col th={tableData.th} />
              <Th th={tableData.th} />
              {scheduleList.map((nurse, index) => (
                <Tr tr={nurse} />
              ))}
            </table>
          </ScheduleTableCon>
          <div>排班小计：A1(3) 、A2(2)、N1(2)、...............，工时40小时。</div>
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
  height: calc(100vh - 10px);
  overflow: auto;
  margin-top: -1px;
  background: #fff;
`

const ScheduleTableCon = styled.div`
  height: calc(100vh - 300px);
  overflow: auto;
  margin-top: -1px;
  background: #fff;
  border-top: 1px solid #d9d8d8;
  border-bottom: 1px solid #d9d8d8;
`
