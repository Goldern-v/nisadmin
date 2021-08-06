import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Icon, Input, InputNumber } from 'antd'
import { numToRmb } from './../utils/numToRmb'
import { oneTableDataSumUp } from '../utils/sumUpMethods'

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
    "moneyN": 0,
    "timeN": "",
    "standardP": 0,
    "daysP": 0,
    "empName": "",
    "standardN": 0,
    "timeP": "",
    "daysN": 0,
    "totalAll": 0,
    "sort": 0,
    "moneyP": 0,
    "key": `${new Date().getTime()}-${parseInt((Math.random() * 1000000).toString())}`
  } as any
}

export default function OneEditTable(props: Props) {
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
      newRecord.moneyP = newRecord.standardP * newRecord.daysP
      newRecord.moneyP = parseInt((newRecord.moneyP * 100).toString()) / 100
      newRecord.moneyN = newRecord.standardN * newRecord.daysN
      newRecord.moneyN = parseInt((newRecord.moneyN * 100).toString()) / 100
      newRecord.totalAll = newRecord.moneyP + newRecord.moneyN
      newRecord.totalAll = parseInt((newRecord.totalAll * 100).toString()) / 100

      newList2 = oneTableDataSumUp(newList1, newList2)
    }

    onDataChange({
      list1: newList1,
      list2: oneTableDataSumUp(newList1, list2),
      schNightTotalModel
    })
  }

  return <Wrapper>
    <div className="sub-info">
      <div>科室：{deptName}</div>
      <div style={{ textAlign: 'center' }}>一值P班</div>
      <div style={{ textAlign: 'right' }}>一值N班</div>
      <div style={{ textAlign: 'right' }}>{dateStr}</div>
    </div>
    <div className="table-container">
      <table className="show-type-0-table">
        <colgroup>
          <col width="60" />
          <col width="80" />
          <col />
          <col width="80" />
          <col width="80" />
          <col width="80" />
          <col />
          <col width="80" />
          <col width="80" />
          <col width="80" />
          <col width="80" />
        </colgroup>
        <tbody>
          <tr className="header">
            <td>序号</td>
            <td className="border-right-blue">姓名</td>
            <td className="border-blue">起止</td>
            <td className="border-blue">天数</td>
            <td className="border-blue">标准</td>
            <td className="border-blue border-right-red">金额</td>
            <td className="border-red">起止</td>
            <td className="border-red">天数</td>
            <td className="border-red">标准</td>
            <td className="border-red">金额</td>
            <td className="relative">
              <span>总金额</span>
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
              <td className="border-right-blue">
                <Input
                  value={record.empName}
                  onChange={(e: any) =>
                    handleRecordChange({ ...record, empName: e.target.value }, idx)}
                />
              </td>
              <td className="border-blue">
                <Input.TextArea
                  autosize={{ minRows: 1 }}
                  value={record.timeP}
                  onChange={(e: any) =>
                    handleRecordChange({ ...record, timeP: e.target.value }, idx)}
                />
              </td>
              <td className="border-blue">
                <InputNumber
                  value={record.daysP}
                  min={0}
                  onChange={(daysP: any) =>
                    handleRecordChange({ ...record, daysP }, idx, true)} />
              </td>
              <td className="border-blue">
                <InputNumber
                  value={record.standardP}
                  min={0}
                  precision={2}
                  onChange={(standardP: any) =>
                    handleRecordChange({ ...record, standardP }, idx, true)} />
              </td>
              <td className="border-blue border-right-red">
                {record.moneyP}
              </td>
              <td className="border-red">
                <Input.TextArea
                  autosize={{ minRows: 1 }}
                  value={record.timeN}
                  onChange={(e: any) =>
                    handleRecordChange({ ...record, timeN: e.target.value }, idx)}
                />
              </td>
              <td className="border-red">
                <InputNumber
                  value={record.daysN}
                  min={0}
                  onChange={(daysN: any) =>
                    handleRecordChange({ ...record, daysN }, idx, true)} />
              </td>
              <td className="border-red">
                <InputNumber
                  value={record.standardN}
                  min={0}
                  precision={2}
                  onChange={(standardN: any) =>
                    handleRecordChange({ ...record, standardN }, idx, true)} />
              </td>
              <td className="border-red">
                {record.moneyN}
              </td>
              <td className="relative">
                {record.totalAll}
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
            <td colSpan={2} className="align-left spacing-4">合计（小写）</td>
            <td>{list2.allDaysP || 0}</td>
            <td></td>
            <td>{list2.allMoneySimpleP || 0}</td>
            <td className="align-left spacing-4">合计（小写）</td>
            <td>{list2.allDaysN}</td>
            <td></td>
            <td>{list2.allMoneySimpleN || 0}</td>
            <td>{list2.allMoney || 0}</td>
          </tr>
          <tr>
            <td colSpan={6} className="align-left spacing-4">
              {`合计（大写）${list2.allMoneyComplexP || '零元整'}`}
            </td>
            <td colSpan={5} className="align-left spacing-4">
              {`合计（大写）${list2.allMoneyComplexN || '零元整'}`}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>制表日期：</td>
            <td>
              <Input
                value={list2.signerP}
                onChange={(e: any) =>
                  handleList2Change({ ...list2, signerP: e.target.value })}
              />
            </td>
            <td>填表人：</td>
            <td>
              <Input
                value={list2.creatorP}
                onChange={(e: any) =>
                  handleList2Change({ ...list2, creatorP: e.target.value })}
              />
            </td>
            <td>制表日期：</td>
            <td>
              <Input
                value={list2.signerN}
                onChange={(e: any) =>
                  handleList2Change({ ...list2, signerN: e.target.value })}
              />
            </td>
            <td>填表人：</td>
            <td>
              <Input
                value={list2.creatorN}
                onChange={(e: any) =>
                  handleList2Change({ ...list2, creatorN: e.target.value })}
              />
            </td>
            <td colSpan={2}></td>
          </tr>
        </tbody>
      </table>
    </div>
  </Wrapper >
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
    &.show-type-0-table{
      td.border-right-blue{
        border-right-color: rgb(145, 217, 249);
      }
      td.border-blue{
        border-color: rgb(145, 217, 249);
      }
      td.border-right-red{
        border-right-color: rgb(239, 143, 154);
      }
      td.border-red{
        border-color: rgb(239, 143, 154);
      }
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