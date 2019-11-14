import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Select, ColumnProps, AutoComplete, message } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare } from '../../types'
import { safetyCheckEditModel } from '../../model/SafetyCheckEditModel'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { qcOneSelectViewModal } from './../../../../QcOneSelectViewModal'
import service from 'src/services/api'
import qs from 'qs'
const commonApi = service.commonApiService

const Option = Select.Option
const TextArea = Input.TextArea

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default observer(function 安全隐患排查弹窗(props: Props) {
  const { location, history } = appStore
  const search = qs.parse(location.search.replace('?', ''))
  const wardInfo = authStore.deptList.find((item: any) => item.code == search.wardCode)
  const wardName = wardInfo && wardInfo.name || ''

  const { sectionId, setData, data } = props

  let cloneData: any = cloneJson(
    data || {
      safetyCheckRecordList: [],
      safetyCheckList: []
    }
  )

  const wtzlList = qcOneSelectViewModal.wtzlList || []

  const defaultItem = {
    "id": "",
    "reportCode": "qc_safety_check",
    "wardCode": search.wardCode,
    "year": search.year,
    "month": search.month,
    "indexNo": 0,
    "wardName": wardName,
    "contentType": "",
    "content": ""
  } as any

  const defaultRecordItem = {
    "id": "",
    "reportCode": "qc_safety_check",
    "wardCode": search.wardCode,
    "year": search.year,
    "month": search.month,
    "indexNo": cloneData.safetyCheckRecordList.length || 0,
    "wardName": wardName,
    "assistWardCode": "",
    "assistWardName": "",
    "problemType": "",
    "content": "",
    "cause": "",
    "measure": ""
  } as any

  let report: Report = safetyCheckEditModel.getDataInAllData('report')

  const handleRecordChange = (idx: number, key: string, val: any) => {
    let list = cloneData.safetyCheckRecordList

    list[idx][key] = val

    setData(cloneData)
  }

  const handleChange = (idx: number, idx1: number, key: string, val: any) => {
    let list = cloneData.safetyCheckList

    list[idx].list[idx1][key] = val

    setData(cloneData)
  }

  const handleRecordAdd = () => {
    let list = cloneData.safetyCheckRecordList
    list.push(cloneJson(defaultRecordItem))

    setData(cloneData)
  }

  const handleAdd = (idx: number) => {
    let target = cloneData.safetyCheckList[idx]
    target.list.push({ ...cloneJson(defaultItem), contentType: target.code })

    setData(cloneData)
  }

  const handleRecordDelete = (idx: number) => {
    let list = cloneData.safetyCheckRecordList
    list.splice(idx, 1)

    setData(cloneData)
  }

  const handleDelete = (idx: number, idx1: number) => {
    let target = cloneData.safetyCheckList[idx]
    target.list.splice(idx1, 1)

    setData(cloneData)
  }

  useEffect(() => { }, [])

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='120' />
          <col width='130' />
          <col />
          <col />
          <col />
          {/* <col /> */}
          <col width='100' />
        </colgroup>
        <tbody>
          <tr className='header'>
            <td>问题种类</td>
            {/* <td>科室</td> */}
            <td>问题详情</td>
            <td>原因分析</td>
            <td>整改措施</td>
            <td>需协助科室</td>
            <td>操作</td>
          </tr>
          {cloneData.safetyCheckRecordList.length > 0 && cloneData.safetyCheckRecordList
            .map((item: any, idx: any) => <tr key={idx}>
              <td>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  value={item.problemType}
                  filterOption={(input: string, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  onSearch={(problemType: string) =>
                    handleRecordChange(idx, 'problemType', problemType)}
                  onChange={(problemType: string) =>
                    handleRecordChange(idx, 'problemType', problemType)}>
                  {wtzlList.map(
                    (itemWtzl: any, idxWtzl) =>
                      <Option
                        value={itemWtzl.code}
                        key={idxWtzl}>
                        {itemWtzl.name}
                      </Option>
                  )}
                </Select>
              </td>
              {/* <td>
                <TextArea
                  autosize
                  value={item.wardName}
                  onChange={(e: any) =>
                    handleRecordChange(idx, 'wardName', e.target.value)} />
              </td> */}
              <td>
                <TextArea
                  autosize
                  value={item.content}
                  onChange={(e: any) =>
                    handleRecordChange(idx, 'content', e.target.value)} />
              </td>
              <td>
                <TextArea
                  autosize
                  value={item.cause}
                  onChange={(e: any) =>
                    handleRecordChange(idx, 'cause', e.target.value)} />
              </td>
              <td>
                <TextArea
                  autosize
                  value={item.measure}
                  onChange={(e: any) =>
                    handleRecordChange(idx, 'measure', e.target.value)} />
              </td>
              <td>
                <TextArea
                  autosize
                  value={item.assistWardCode}
                  onChange={(e: any) => {
                    handleRecordChange(idx, 'assistWardName', e.target.value)
                    handleRecordChange(idx, 'assistWardCode', e.target.value)
                  }} />
              </td>
              <td className="operate align-left">
                <span style={{ color: 'red' }} onClick={() => handleRecordDelete(idx)}>删除</span>
                {idx == cloneData.safetyCheckRecordList.length - 1 &&
                  <span onClick={() => handleRecordAdd()}>新增</span>}
              </td>
            </tr>)}

          {cloneData.safetyCheckRecordList.length <= 0 &&
            <tr>
              <td colSpan={5}></td>
              <td className="operate align-left">
                <span onClick={() => handleRecordAdd()}>新增</span>
              </td>
            </tr>}

          {cloneData.safetyCheckList
            .map((item: any, idx: number) => <React.Fragment key={idx}>
              {item.list.length > 0 && item.list.map((item1: any, idx1: number) =>
                <tr key={`${idx}-${idx1}`}>
                  {idx1 === 0 && <td rowSpan={item.list.length} >{item.name}</td>}
                  {/* <td>
                    <TextArea
                      autosize
                      value={item1.wardName}
                      onChange={(e: any) =>
                        handleChange(idx, idx1, 'wardName', e.target.value)} />
                  </td> */}
                  <td colSpan={4}>
                    <TextArea
                      autosize
                      value={item1.content}
                      onChange={(e: any) =>
                        handleChange(idx, idx1, 'content', e.target.value)} />
                  </td>
                  <td className="operate align-left">
                    <span style={{ color: 'red' }} onClick={() => handleDelete(idx, idx1)}>删除</span>
                    {idx1 == item.list.length - 1 && <span onClick={() => handleAdd(idx)}>新增</span>}
                  </td>
                </tr>)}

              {item.list.length <= 0 && <tr>
                <td>{item.name}</td>
                <td colSpan={4}>无</td>
                <td className="operate align-left">
                  <span onClick={() => handleAdd(idx)}>新增</span>
                </td>
              </tr>}
            </React.Fragment>)}
        </tbody>
      </table>

    </Wrapper>
  )
})

const defaultInputStyle = `
  border: none;
  outline: none;
  background: none;
  box-shadow: none;
`

const activeInputStyle = `
  outline: none;
  border: none;
  box-shadow: none;
`

const Wrapper = styled.div`
  position: relative;
  text {
    min-height: 200px !important;
    resize: none;
  }
  table {
    border-collapse: collapse;
    border-color: #cccccc;
    width: 100%;
    table-layout: fixed;
    tr {
      width: 100%;
      :hover{
        td{
          background: ${(p) => p.theme.$mlc};
        }
      }
    }
    .header,
    .footer {
      td {
        background: #f0f0f0;
      }
    }
    td {
      line-height:30px;
      text-align: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      border: 1px #cccccc solid;
      &.align-left{
        text-align: left;
      }
      &.operate{
        padding: 0 10px!important;
        span{
          margin: 0 5px;
          cursor: pointer;
          color: #1db38b;
          :hover{
            font-weight: bold;
          }
        }
      }
    }
  }
  .lm-arrow {
    height: 12px;
    position: relative;
    top: -2px;
    margin-right: 5px;
  }
  .button-con {
    position: absolute;
    top: -13px;
    right: 0;
  }

  td {
    padding: 0 !important;
  }
  textarea{
    resize: none;
    border: none;
    outline: none;
    background: none;
    box-shadow: none;
    :hover{
      outline: none;
      border: none;
      background: none;
      box-shadow: none;
    }
    :focus{
      outline: none;
      border: none;
      background: ${(p) => p.theme.$mlc};
      box-shadow: none;
    }
  }
  .ant-input{
      resize: none;
      ${defaultInputStyle}
      :hover{
        ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
      }
      :focus{
        ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
      }
    }
    .ant-select-selection{
      ${defaultInputStyle}
    }
  .ant-select-selection{
      ${defaultInputStyle}
    }

    .ant-select-open,.ant-select-focused{
      .ant-select-selection{
        ${activeInputStyle}
        &:focus{
          ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
        }
      }
    }
`

const HeadCon = styled.div``
