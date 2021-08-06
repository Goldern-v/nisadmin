import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Icon, Input, InputNumber } from 'antd'
import { numToRmb } from './../utils/numToRmb'
import { twoTableDataSumUp } from '../utils/sumUpMethods'

export interface Props {
  deptName: string,
  dateStr: string,
  data: {
    schNightTotalModel: any,
    list1: any[],
    list2: any,
  },
  onDataChange: Function,
}

const getDefaultRowData = () => {
  return {
    "empName": "",
    "time": "",
    "sort": "",
    "days": 0,
    "money": 0,
    "standard": 0,
    "key": `${new Date().getTime()}-${parseInt((Math.random() * 1000000).toString())}`
  }
}

export default function TwoEditTable(props: Props) {
  const { deptName, dateStr, data, onDataChange } = props
  const { schNightTotalModel, list1, list2 } = data

  const handleAddRow = () => {
    let newRow = getDefaultRowData()
    let newList1 = [...list1, newRow]

    onDataChange({
      list1: newList1,
      list2,
      schNightTotalModel
    })
  }

  const handleDeleteRow = (idx: number) => {
    let newList1 = [...list1]
    newList1.splice(idx, 1)

    onDataChange({
      list1: newList1,
      list2,
      schNightTotalModel
    })
  }

  const handleList2Change = (newList2: any) => {
    onDataChange({
      list1,
      list2: newList2,
      schNightTotalModel
    })
  }

  const handleRecordChange = (newRecord: any, idx: number, needSum?: boolean) => {
    let newList1 = [...list1]
    let newList2 = { ...list2 }

    newList1[idx] = newRecord

    if (needSum) {
      newRecord.money = newRecord.standard * newRecord.days
      newRecord.money = parseInt((newRecord.money * 100).toString()) / 100

      newList2 = twoTableDataSumUp(newList1, newList2)
    }

    onDataChange({
      list1: newList1,
      list2: newList2,
      schNightTotalModel
    })
  }

  return <Wrapper>
    <div className="sub-info">
      <div>科室：{deptName}</div>
      <div></div>
      <div>突发回院</div>
      <div style={{ textAlign: 'right' }}>{dateStr}</div>
    </div>
    <table>
      <colgroup>
        <col width="80" />
        <col width="120" />
        <col />
        <col width="120" />
        <col width="120" />
        <col width="120" />
        <col />
      </colgroup>
      <tbody>
        <tr className="header">
          <td>序号</td>
          <td>姓名</td>
          <td>起止</td>
          <td>天数</td>
          <td>标准</td>
          <td className="relative">
            <span>金额</span>
            {list1.length <= 0 && (
              <span
                className="extra-icon"
                title="添加一行"
                onClick={() => handleAddRow()}>
                <Icon type="plus-square" className="success" />
              </span>
            )}
          </td>
        </tr>
        {list1.map((record: any, idx: number) => (
          <tr key={record.key}>
            <td>{idx + 1}</td>
            <td>
              <Input
                value={record.empName}
                onChange={(e: any) =>
                  handleRecordChange({ ...record, empName: e.target.value }, idx)}
              />
            </td>
            <td>
              <Input.TextArea
                autosize={{ minRows: 1 }}
                value={record.time}
                onChange={(e: any) =>
                  handleRecordChange({ ...record, time: e.target.value }, idx)}
              />
            </td>
            <td>
              <InputNumber
                value={record.days}
                min={0}
                onChange={(days: any) =>
                  handleRecordChange({ ...record, days }, idx, true)} />
            </td>
            <td>
              <InputNumber
                value={record.standard}
                min={0}
                precision={2}
                onChange={(standard: any) =>
                  handleRecordChange({ ...record, standard }, idx, true)} />
            </td>
            <td className="relative">
              {record.money}
              <span className="extra-icon">
                <Icon
                  type="close-square"
                  className="error"
                  title="删除"
                  onClick={() => handleDeleteRow(idx)} />
                {idx == list1.length - 1 && (
                  <Icon
                    type="plus-square"
                    className="success"
                    title="添加一行"
                    onClick={() => handleAddRow()} />
                )}
              </span>
            </td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td className="align-left spacing-4">
            合计（小写）
          </td>
          <td></td>
          <td>{list2.allDays || 0}</td>
          <td></td>
          <td>{list2.allMoneySimple || 0}</td>
        </tr>
        <tr>
          <td colSpan={6} className="align-left">
            {`合计（大写）${list2.allMoneyComplex || '零元整'}`}
          </td>
        </tr>
        <tr>
          <td colSpan={2}>制表日期：</td>
          <td>
            <Input
              value={list2.signer}
              onChange={(e: any) =>
                handleList2Change({ ...list2, signer: e.target.value })}
            />
          </td>
          <td>填表人：</td>
          <td colSpan={2}>
            <Input
              value={list2.creator}
              onChange={(e: any) =>
                handleList2Change({ ...list2, creator: e.target.value })}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </Wrapper>
}
const Wrapper = styled.div`
  .sub-info{
    margin-top: 45px;
    display: flex;
    &>*{
      flex: 1;
    }
  }

  td.align-left{
    padding: 0 4px;
    text-align: left;
  }

  .spacing-4{
    letter-spacing: 4px;
  }

  textarea{
    resize: none;
  }

  table{
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    position: relative;
    tr{
      td{
        border: 1px solid rgb(180, 180, 180);
      }
    }
    .header{
      font-weight: bold;
    }

    .relative{
      position: relative;
      .extra-icon{
        position: absolute;
        top: 4px;
        left: 100%;
        min-width: 50px;
        text-align: left;
        &>*{
          cursor: pointer;
          margin-left: 5px;
        }
        .success:hover{
          color: #1db38b;
        }
        .error:hover{
          color: red;
        }
      }
    }
  }
`