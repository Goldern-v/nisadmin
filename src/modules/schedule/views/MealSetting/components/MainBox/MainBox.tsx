import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import { Table, message, Popconfirm, Divider, Tag } from 'antd'
// import { authStore, scheduleStore } from '@/stores'
import service from 'src/services/api'
import { scheduleStore } from '@/stores'

import emitter from 'src/libs/ev'

// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

const getTextColor = (text: string, record: any, colorName: string) =>
  text && text.length > 0 ? (
    <span>
      <Tag color={colorName} key={text}>
        {text.toUpperCase()}
      </Tag>
    </span>
  ) : (
    ''
  )

const columns = [
  {
    title: '班次套餐名',
    dataIndex: 'name',
    key: 'name',
    width: '8%'
  },
  {
    title: '周一',
    dataIndex: 'mondayName',
    key: 'mondayName',
    width: '12%',
    render: (text: string, record: any) => getTextColor(text, record, record.mondayNameColor)
  },
  {
    title: '周二',
    dataIndex: 'tuesdayName',
    key: 'tuesdayName',
    width: '12%',
    render: (text: string, record: any) => getTextColor(text, record, record.tuesdayNameColor)
  },
  {
    title: '周三',
    dataIndex: 'wednesdayName',
    key: 'wednesdayName',
    width: '12%',
    render: (text: string, record: any) => getTextColor(text, record, record.thursdayNameColor)
  },
  {
    title: '周四',
    dataIndex: 'thursdayName',
    key: 'thursdayName',
    width: '12%',
    render: (text: string, record: any) => getTextColor(text, record, record.thursdayNameColor)
  },
  {
    title: '周五',
    dataIndex: 'fridayName',
    key: 'fridayName',
    width: '12%',
    render: (text: string, record: any) => getTextColor(text, record, record.fridayNameColor)
  },
  {
    title: '周六',
    dataIndex: 'saturdayName',
    key: 'saturdayName',
    width: '12%',
    render: (text: string, record: any) => getTextColor(text, record, record.saturdayNameColor)
  },
  {
    title: '周日',
    dataIndex: 'sundayName',
    key: 'sundayName',
    width: '12%',
    render: (text: string, record: any) => getTextColor(text, record, record.sundayNameColor)
  },
  {
    title: '操作',
    dataIndex: 'title',
    width: '12%',
    key: 'title',
    render: (text: string, record: any) =>
      record.id ? (
        <span>
          <a
            href='javascript:;'
            onClick={(e: any) => {
              console.log('编辑e', e)
              // message.success(`编辑${record.key}`)
              emitter.emit('弹窗编辑排班套餐', record)
            }}
          >
            编辑
          </a>
          <Divider type='vertical' />
          <Popconfirm
            title='确认要删除?'
            onConfirm={() => {
              service.scheduleMealApiService.delete(record.key).then((res) => {
                emitter.emit('更新班次套餐列表')
              })
              message.success(`删除${record.key}`)
            }}
          >
            <a href='javascript:;'>删除</a>
          </Popconfirm>
        </span>
      ) : (
        ''
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

// rowSelection objects indicates the need for row selection
let rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    // selectedRowsArray = selectedRows
    console.log(`onChange:selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record: any, selected: any, selectedRows: any) => {
    record.status = selected
    selectedRowsArray.map((res: any) => {
      if (res.id === record.id) {
        res.status = selected
      }
    })
    // selectedRowsArray
    console.log('onSelect', record, selected, selectedRows)
  },
  onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
    if (selectedRows && selectedRows.length === 0) {
      selectedRowsArray.map((res: any) => {
        res.status = false
      })
    } else {
      selectedRows.map((res: any) => {
        res.status = true
      })
    }

    console.log('onSelectAll', selected, selectedRows, changeRows)
  },
  getCheckboxProps: (record: any) => ({
    disabled: !record.id, // Column configuration not to be checked
    defaultChecked: record.status === true || record.status === 1,
    name: record.key
  }),
  hideDefaultSelections: true
}

export default function MainBox () {
  const [count, setCount] = useState(0)
  const [MealList, setMealList] = useState(new Array())

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getMealList()

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

    //
    console.log(count, setCount)
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const getMealList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    service.scheduleMealApiService.getMealListByCode(deptCode, 'true').then((res) => {
      console.log('查找排班班次套餐res', res, data)
      let oneUser = new Object()
      allUser = new Array()
      selectedRowsArray = new Array()
      // columns

      if (res && res.data.data) {
        tableData = res.data.data

        let rowKeys = new Array()
        tableData.map((oneObj: any, index: number) => {
          console.log('oneObj', index, oneObj, oneObj.status)
          if (oneObj.status === true) {
            console.log('tableDataindex', index)
            rowKeys.push(oneObj.id)
          } else {
            oneObj.status = false
          }
          oneUser = new Object()
          for (const key in data) {
            if (data.hasOwnProperty(key) && oneObj.hasOwnProperty(key)) {
              (oneUser as any)[key] = oneObj[key]
            }
            if (key === 'id') {
              (oneUser as any).key = oneObj[key]
            }
          }
          (allUser as any).push(oneUser)
          selectedRowsArray.push(oneUser)
        })

        genEmptyTable(allUser)
        setMealList(allUser)
        console.log('查找排班班次套餐', MealList, allUser, tableData, selectedRowsArray)
      }
    })
  }

  const genEmptyTable = (newList: any) => {
    // 补空行
    let diff = 10 - (newList.length % 10)
    if (diff > 0) {
      for (let j = 0; j < diff; j++) {
        let newData = JSON.parse(JSON.stringify(data))
        if (newData.hasOwnProperty('key')) {
          newData.key = 'empty' + j
        }
        newList.push(newData)
      }
    }
  }

  return (
    <Wrapper>
      <Table bordered size='middle' columns={columns} rowSelection={rowSelection} dataSource={MealList} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* background: #eee; */
  /* height: 100%; */
  padding: 0 20px 20px 20px;
  width: 100%;
  table,
  tr,
  td,
  th,
  th div {
    text-align: center;
    padding: 5px !important;
  }
`
