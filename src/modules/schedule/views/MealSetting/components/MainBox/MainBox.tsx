import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import { Table, message, Popconfirm, Divider, Tag } from 'antd'
// import { authStore, scheduleStore } from 'src/stores'
import service from 'src/services/api'
import { scheduleStore } from 'src/stores'

import BaseTable, { DoCon } from 'src/components/BaseTable'
import emitter from 'src/libs/ev'
import { Switch } from 'src/vendors/antd'
import { globalModal } from 'src/global/globalModal'

// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function MainBox() {
  const [mealList, setMealList] = useState(new Array())
  const [tableLoading, setTableLoading] = useState(false)
  const getTextColor = (text: string, record: any, colorName: string) =>
    text && text.length > 0 ? (
      <span>
        <span color={colorName} key={text} style={{ color: colorName }}>
          {text.toUpperCase()}
        </span>
      </span>
    ) : (
      ''
    )

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (text: string, record: any, index: any) =>
        record.id ? <span style={{ width: '60px' }}>{index + 1}</span> : ''
    },
    {
      title: '列入排班',
      dataIndex: 'status',
      key: '是否排班',
      width: 100,
      render: (text: any, record: any, index: any) =>
        record.id ? (
          <span>
            <Switch
              size='small'
              onChange={(check: any) => {
                record.status = check
                setMealList([...mealList])
              }}
              checked={text}
            />
          </span>
        ) : (
          ''
        )
    },
    {
      title: '班次套餐名',
      dataIndex: 'name',
      key: 'name',
      width: 100
    },
    {
      title: '周一',
      dataIndex: 'mondayName',
      key: 'mondayName',
      width: 100,
      render: (text: string, record: any) => getTextColor(text, record, record.mondayNameColor)
    },
    {
      title: '周二',
      dataIndex: 'tuesdayName',
      key: 'tuesdayName',
      width: 100,
      render: (text: string, record: any) => getTextColor(text, record, record.tuesdayNameColor)
    },
    {
      title: '周三',
      dataIndex: 'wednesdayName',
      key: 'wednesdayName',
      width: 100,
      render: (text: string, record: any) => getTextColor(text, record, record.thursdayNameColor)
    },
    {
      title: '周四',
      dataIndex: 'thursdayName',
      key: 'thursdayName',
      width: 100,
      render: (text: string, record: any) => getTextColor(text, record, record.thursdayNameColor)
    },
    {
      title: '周五',
      dataIndex: 'fridayName',
      key: 'fridayName',
      width: 100,
      render: (text: string, record: any) => getTextColor(text, record, record.fridayNameColor)
    },
    {
      title: '周六',
      dataIndex: 'saturdayName',
      key: 'saturdayName',
      width: 100,
      render: (text: string, record: any) => getTextColor(text, record, record.saturdayNameColor)
    },
    {
      title: '周日',
      dataIndex: 'sundayName',
      key: 'sundayName',
      width: 100,
      render: (text: string, record: any) => getTextColor(text, record, record.sundayNameColor)
    },
    {
      title: '操作',
      dataIndex: 'title',
      width: 100,
      key: 'title',
      render: (text: string, record: any) => (
        <DoCon>
          <span
            onClick={(e: any) => {
              emitter.emit('弹窗编辑排班套餐', record)
            }}
          >
            编辑
          </span>
          <span
            onClick={() => {
              globalModal.confirm('确认删除', '确认删除该套餐？').then((res) => {
                service.scheduleMealApiService.delete(record.id).then((res) => {
                  emitter.emit('更新班次套餐列表')
                })
                message.success(`删除${record.name}成功`)
              })
            }}
          >
            删除
          </span>
        </DoCon>
      )
    }
  ]

  let data = {
    key: '',
    id: '',
    createTime: '',
    deptCode: '',
    name: '',
    mondayName: '',
    tuesdayName: '',
    wednesdayName: '',
    thursdayName: '',
    fridayName: '',
    saturdayName: '',
    sundayName: '',
    mondayNameColor: '',
    tuesdayNameColor: '',
    wednesdayNameColor: '',
    thursdayNameColor: '',
    fridayNameColor: '',
    saturdayNameColor: '',
    sundayNameColor: '',
    status: ''
  }

  let allUser = new Array()

  let tableData = new Array()
  let selectedRowsArray = new Array()

  useEffect(() => {
    getMealList()
  }, [])
  emitter.removeAllListeners('获取选中班次套餐列表')
  emitter.removeAllListeners('更新班次套餐列表')

  emitter.addListener('获取选中班次套餐列表', (callback: any) => {
    if (callback) {
      callback(selectedRowsArray)
    }
  })

  emitter.addListener('更新班次套餐列表', () => {
    getMealList()
  })

  const getMealList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    setTableLoading(true)
    service.scheduleMealApiService.getMealListByCode(deptCode, 'true').then((res) => {
      setTableLoading(false)
      let oneUser = new Object()
      allUser = new Array()
      selectedRowsArray = new Array()

      if (res && res.data) {
        tableData = res.data

        let rowKeys = new Array()
        tableData.map((oneObj: any, index: number) => {
          if (oneObj.status === true) {
            rowKeys.push(oneObj.id)
          } else {
            oneObj.status = false
          }
          oneUser = new Object()
          for (const key in data) {
            if (data.hasOwnProperty(key) && oneObj.hasOwnProperty(key)) {
              ;(oneUser as any)[key] = oneObj[key]
            }
            if (key === 'id') {
              ;(oneUser as any).key = oneObj[key]
            }
          }
          ;(allUser as any).push(oneUser)
          selectedRowsArray.push(oneUser)
        })

        setMealList(allUser)
      }
    })
  }

  return (
    <Wrapper>
      <BaseTable
        loading={tableLoading}
        columns={columns}
        dataSource={mealList}
        pagination={false}
        surplusHeight={190}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: 0;
  width: 100%;
  table,
  tr,
  td,
  th,
  th div {
    text-align: center !important;
    padding: 3px !important;
  }
`
