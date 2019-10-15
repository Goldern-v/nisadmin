import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps, Input } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { scheduleViewModal } from '../ScheduleViewModal'
import { appStore } from 'src/stores'
import moment from 'moment'
export interface Props {}

export default observer(function Table() {
  const [columns, setColumns] = useState([])
  const initConfigData = (length: any = 11) => {
    let index = length + 4
    let array: any = []
    for (let i = 0; i < index; i++) {
      let data = {
        title: `时间`,
        dataIndex: `time${i - 2}`,
        width: 50,
        colSpan: i === 2 ? length : 0,
        render: (record: any) => {
          return isWeekEnd(record)
        },
        align: 'center'
      }
      switch (i) {
        case 0:
          data.title = '工号'
          data.dataIndex = 'empNo'
          data.width = 100
          data.render = (record: any) => {
            return record
          }
          delete data.colSpan
          break
        case 1:
          data.title = '姓名'
          data.dataIndex = 'empName'
          data.width = 100
          data.render = (record: any) => {
            return record
          }
          data.colSpan = 1
          break
        case index - 2:
          data.title = '备注'
          data.dataIndex = 'remark'
          data.width = 250
          data.render = (record: any) => {
            return record
          }
          data.colSpan = 1
          break
        case index - 1:
          data.title = '状态'
          data.dataIndex = 'status'
          data.width = 100
          data.render = (record: any): any => {
            return record == "1" ? "已推送" : (record == "0" ? "未推送" : "")
          }
          data.colSpan = 1
          break
        default:
      }
      array.push(data)
    }
    setColumns(array)
  }

  useEffect(() => {
    initConfigData(scheduleViewModal.tableTimeAll.length)
  });

  //判断日期（周末为红，过去时间底色置灰）
  const isWeekEnd = (record: any) => {
    let date = record ? record.substring(5) : ''
    let time = moment(record).format('d')
    if (time == '0' || time == '6') {
      return new Date(record) < new Date() ? <div className="redColorOld">{ date }</div> : <div className="redColor">{ date }</div>
    } else {
      return new Date(record) < new Date() ? <div className="blackColorOld">{ date }</div> : <div>{ date }</div>
    }
  }

  return (
    <Wrapper>
      <Title>{scheduleViewModal.tableTime}护理{scheduleViewModal.tableName}计划表</Title>
      {/* <Time>日期：{scheduleViewModal.tableTime}</Time> */}
      <BaseTable
        loading={scheduleViewModal.tableLoading}
        dataSource={scheduleViewModal.tableList}
        columns={columns}
        type={['spaceRow']}
        surplusHeight={230}
        surplusWidth={300}
        onChange={() => {
          scheduleViewModal.onload()
        }}
        tip={scheduleViewModal.tableRemark}
      />
    </Wrapper>
  )
})
const Wrapper = styled(TabledCon)`
  overflow: hidden;
  .redColor {
    color: red;
    line-height: 29px;
  }
  .redColorOld {
    color: red;
    height: 100%;
    width: 100%;
    background: #F2F2F2;
    line-height: 29px;
  }
  .blackColorOld {
    height: 100%;
    background: #F2F2F2;
    line-height: 29px;
  }
  td {
    padding: 0 !important;
  }
`
const Title = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-top: 15px;
`
const Time = styled.div`
  font-size: 16px;
  color: #333;
  text-align: center;
  margin-top: 10px;
`
