import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, InputNumber } from 'antd'
import { Input, Radio, ColumnProps, AutoComplete, message, Select } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare } from '../../types'
import { badEventReportModel } from '../../BadEventReportModel'
import { DictItem } from 'src/services/api/CommonApiService'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 上报例数比较弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data.obj ? data : {
    obj: {
      beforeYearList: [],
      lastYearList: [],
      curYearList: [],
    }
  })

  let keys = { 'beforeYearList': '', 'lastYearList': '', 'curYearList': '' } as any
  let keyArr = Object.keys(keys)
  let tableData = []

  for (let i = 0; i < keyArr.length; i++) {
    let rowArr = cloneData.obj[keyArr[i]]

    if (rowArr && rowArr.length > 0) {
      let keysVal = rowArr[0].timeSection.split('年')[0] + '年'
      keys[keyArr[i]] = keysVal
      let rowObj = {} as any
      for (let j = 0; j < rowArr.length; j++) {
        let rowArrItem = rowArr[j]
        let colKey = rowArrItem.timeSection.split('年')[1]
        if (colKey) rowObj[colKey] = rowArrItem.happenNum
      }
      tableData.push(rowObj)
    }
  }

  let columns: ColumnProps<any>[] = [
    {
      title: '年份',
      align: 'center',
      render: (text: any, record: any, index: number) => keys[keyArr[index]],
      width: 80,
    },
  ]

  if (tableData[0])
    columns = columns.concat(
      ...Object.keys(tableData[0]).map((item: any) => {
        return {
          title: item,
          dataIndex: item,
          align: 'center',
          render(text: any, record: any, index: number) {
            return <InputNumber
              value={text}
              style={{ width: '100%' }}
              min={0}
              precision={0}
              onChange={(val) => {
                let key = keyArr[index]

                let target = cloneData.obj[key]
                  .find((originItem: any) => originItem.timeSection.indexOf(item) > 0)

                if (target) target.happenNum = val

                setData(cloneData)
              }} />
          }
        } as ColumnProps<any>
      })
    )

  useEffect(() => { }, [])

  return (
    <Wrapper>
      <BaseTable
        columns={columns}
        dataSource={tableData}
        wrapperStyle={{
          padding: 0,
          paddingTop: 20
        }}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  text {
    min-height: 200px !important;
    resize: none;
  }
  .button-con {
    position: absolute;
    top: -13px;
    right: 0;
  }
  .cell-input {
    padding: 0 !important;
    outline: none;
    .ant-select-selection__rendered {
      margin: 0 !important;
      box-shadow: none;
    }
    .ant-select {
      width: 100%;
      box-shadow: none;
    }
    textarea {
      box-shadow: none;
      width: 100%;
      height: 100%;
      resize: none;
      border: 0;
      outline: none;
      border-radius: 0;
      padding: 4px !important;
      &:focus {
        background: ${(p) => p.theme.$mlc};
      }
    }
  }
  .cell-input input,
  .cell-input .ant-select-selection,
  input.cell-input {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    background: transparent;
    padding: 0 5px;
    border-radius: 0;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }

  td {
    padding: 0 !important;
  }
  input {
    text-align: center;
  }
`

const HeadCon = styled.div``
