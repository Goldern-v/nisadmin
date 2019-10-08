import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps, Input } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { scheduleViewModal } from '../ScheduleViewModal'
import { sexToChina } from 'src/utils/transform/sexToChina'
import service from 'src/services/api'
import { appStore } from 'src/stores'
import qs from 'qs'
export interface Props {}

export default observer(function Table() {

  //判断日期（周末为红，过去时间底色置灰）
  const isWeekEnd = (record: any) => {
    let date = record ? record.substring(5) : ''
    if (('天一二三四五六'.charAt(new Date(record).getDate()) == '天') || ('天一二三四五六'.charAt(new Date(record).getDate()) == '六')) {
      return new Date(record) < new Date() ? <div className="redColorOld">{ date }</div> : <div className="redColor">{ date }</div>
    } else {
      return new Date(record) < new Date() ? <div className="blackColorOld">{ date }</div> : <div>{ date }</div>
    }
  }
  
  const columns: ColumnProps<any>[] = [
    {
      title: '工号',
      dataIndex: 'empNo',
      width: 100,
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      width: 100,
      align: 'center'
    },
    {
      title: '时间',
      dataIndex: 'time0',
      colSpan: 11,
      width: 50,
      align: 'center',
      render (record: any) {
        return isWeekEnd(record)
      }
    },
    {
      title: '时间1',
      dataIndex: 'time1',
      colSpan: 0,
      width: 50,
      align: 'center',
      render (record: any) {
        return isWeekEnd(record)
      }
    },
    {
      title: '时间2',
      dataIndex: 'time2',
      colSpan: 0,
      width: 50,
      align: 'center',
      render (record: any) {
        return isWeekEnd(record)
      }
    },
    {
      title: '时间3',
      dataIndex: 'time3',
      colSpan: 0,
      width: 50,
      align: 'center',
      render (record: any) {
        return isWeekEnd(record)
      }
    },
    {
      title: '时间4',
      dataIndex: 'time4',
      colSpan: 0,
      width: 50,
      align: 'center',
      render (record: any) {
        return isWeekEnd(record)
      }
    },
    {
      title: '时间5',
      dataIndex: 'time5',
      colSpan: 0,
      width: 50,
      align: 'center',
      render (record: any) {
        return isWeekEnd(record)
      }
    },
    {
      title: '时间6',
      dataIndex: 'time6',
      colSpan: 0,
      width: 50,
      align: 'center',
      render (record: any) {
        return isWeekEnd(record)
      }
    },
    {
      title: '时间7',
      dataIndex: 'time7',
      colSpan: 0,
      width: 50,
      align: 'center',
      render (record: any) {
        return isWeekEnd(record)
      }
    },
    {
      title: '时间8',
      dataIndex: 'time8',
      colSpan: 0,
      width: 50,
      align: 'center',
      render (record: any) {
        return isWeekEnd(record)
      }
    },
    {
      title: '时间9',
      dataIndex: 'time9',
      colSpan: 0,
      width: 50,
      align: 'center',
      render (record: any) {
        return isWeekEnd(record)
      }
    },
    {
      title: '时间10',
      dataIndex: 'time10',
      colSpan: 0,
      width: 50,
      align: 'center',
      render (record: any) {
        return isWeekEnd(record)
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 250
    },  
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      align: 'center',
      render (status: any) {
        return status == '1' ?  '已推送' : '未推送'
      }
    }  
  ]
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
    background: #ccc;
    line-height: 29px;
  }
  .blackColorOld {
    height: 100%;
    background: #ccc;
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
