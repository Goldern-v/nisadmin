import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Select, Input, AutoComplete } from 'src/vendors/antd'
import { qcOneSelectViewModal } from '../../../QcOneSelectViewModal'
import { DictItem } from 'src/services/api/CommonApiService'
import { observer } from 'src/vendors/mobx-react-lite'
export interface Props {
  safetyCheckList: any[]
  setSafetyCheckList: any
}

interface RowItem {
  problemType: string
  content: string
  cause: string
  measure: string,
  assistWardCode: string
}

export default observer(function Table(props: Props) {
  const { safetyCheckList, setSafetyCheckList } = props
  const [wardList, setWardList]: any = useState([
    {
      code: '总务处',
      name: '总务处'
    },
    {
      code: '设备科',
      name: '设备科'
    },
    {
      code: '药学部',
      name: '药学部'
    },
    {
      code: '无',
      name: '无'
    }
  ])

  const updateData = () => {
    setSafetyCheckList([...safetyCheckList])
  }

  const addRow = () => {
    safetyCheckList.push({})
    updateData()
  }

  const canEdit = (row: RowItem) => {
    if (row.problemType && row.problemType != '无') {
      return true
    }
  }
  return (
    <Wrapper>
      <TableCon>
        <colgroup>
          <col width='50px' />
          <col width='100px' />
          <col width='150px' />
          <col width='150px' />
          <col width='150px' />
          <col width='150px' />
        </colgroup>
        <thead>
          <tr>
            <th>序号</th>
            <th>问题种类</th>
            <th>问题详情</th>
            <th>原因分析</th>
            <th>整改措施</th>
            <th>需协助科室</th>
          </tr>
        </thead>
        <tbody>
          {safetyCheckList.map((row: RowItem, index: number) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <AutoComplete
                    className='noborder-input'
                    value={row.problemType}
                    allowClear={true}
                    dataSource={qcOneSelectViewModal.wtzlList.map((item: DictItem, index: number) => item.name)}
                    onChange={(value: any) => {
                      row.problemType = value
                      if (row.problemType == '无' || row.problemType == '') {
                        row.content = ''
                        row.cause = ''
                        row.measure = ''
                        row.assistWardCode = ''
                      }
                      updateData()
                    }}
                  >
                    {/* {qcOneSelectViewModal.wtzlList.map((item: DictItem, index: number) => (
                      <Select.Option value={item.code} key={index}>
                        {item.name}
                      </Select.Option>
                    ))} */}
                  </AutoComplete>
                </td>
                <td>
                  <Input.TextArea
                    autosize={true}
                    className='noborder-input'
                    disabled={!canEdit(row)}
                    value={row.content}
                    onChange={(e) => {
                      row.content = e.target.value
                      updateData()
                    }}
                  />
                </td>
                <td>
                  <Input.TextArea
                    autosize={true}
                    className='noborder-input'
                    disabled={!canEdit(row)}
                    value={row.cause}
                    onChange={(e) => {
                      row.cause = e.target.value
                      updateData()
                    }}
                  />
                </td>
                <td>
                  <Input.TextArea
                    autosize={true}
                    className='noborder-input'
                    disabled={!canEdit(row)}
                    value={row.measure}
                    onChange={(e) => {
                      row.measure = e.target.value
                      updateData()
                    }}
                  />
                </td>
                <td>
                  <AutoComplete
                    className='noborder-input'
                    value={row.assistWardCode}
                    disabled={!canEdit(row)}
                    dataSource={wardList.map((item: any) => item.name)}
                    onChange={(value: any) => {
                      row.assistWardCode = value
                      updateData()
                    }} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </TableCon>
      <Button type='dashed' className='add-btn' onClick={addRow}>
        添加
      </Button>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  display: inline-block;
  .add-btn {
    display: block;
    margin: 10px auto;
  }
`

const TableCon = styled.table`
  border-collapse: collapse;
  width: 850px;
  margin: 5px 30px;
  table-layout: fixed;
  th,
  td {
    text-align: center;
    vertical-align: center;
    height: 30px;
    border: 1px solid #d8d8d8;
  }
  th {
    background: rgb(242, 244, 245);
  }
  .noborder-select {
    width: 100%;
    .ant-select-selection {
      border: 0;
    }
  }
  .noborder-input,
  .noborder-input input {
    width: 100%;
    border: 0;
    resize: none;
  }
  textarea {
    min-height: 100% !important;
  }
`
