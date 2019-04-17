import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import { Table, message, Popconfirm, Divider, Tag } from 'antd'
// import { authStore, scheduleStore } from 'src/stores'
import service from 'src/services/api'
import { scheduleStore } from 'src/stores'

import emitter from 'src/libs/ev'

// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

const columns = [
  {
    title: '班次名称',
    dataIndex: 'name',
    key: 'name',
    width: '8%'
    // render: (text: string, record: any) =>
    //   text.length > 0 ? (
    //     <span>
    //       <Tag color={record.nameColor} key={text}>
    //         {text.toUpperCase()}
    //       </Tag>
    //     </span>
    //   ) : (
    //     ''
    //   )
  },
  {
    title: '类别',
    dataIndex: 'shiftType',
    key: 'shiftType',
    width: '12%'
  },
  {
    title: '颜色标记',
    dataIndex: 'nameColor',
    key: 'nameColor',
    width: '12%',
    render: (text: string, record: any) =>
      text.length > 0 ? (
        <span>
          <Tag color={record.nameColor} key={text}>
            {text.toUpperCase()}
          </Tag>
        </span>
      ) : (
        ''
      )
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    width: '30%',
    key: 'startTime'
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime',
    width: '8%'
  },
  {
    title: '工时(小时）',
    dataIndex: 'effectiveTime',
    key: 'effectiveTime'
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
              emitter.emit('弹窗编辑排班', record)
            }}
          >
            编辑
          </a>
          <Divider type='vertical' />
          <Popconfirm
            title='确认要删除?'
            onConfirm={() => {
              service.scheduleShiftApiService.delete(record.key).then((res) => {
                emitter.emit('更新班次列表')
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
  effectiveTime: '',
  endTime: '',
  name: '',
  nameColor: '',
  shiftType: '',
  startTime: '',
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
    defaultChecked: record.status === true,
    name: record.key + ''
  }),
  hideDefaultSelections: true
}

export default function MainBox () {
  const [count, setCount] = useState(0)
  const [ShiftList, setShiftList] = useState(new Array())

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getShiftList()

    emitter.removeAllListeners('获取选中班次列表')
    emitter.removeAllListeners('更新班次列表')

    emitter.addListener('获取选中班次列表', (callback: any) => {
      if (callback) {
        callback(selectedRowsArray)
      }
    })

    emitter.addListener('更新班次列表', () => {
      getShiftList()
    })

    //
    console.log(count, setCount)
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const getShiftList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    service.scheduleShiftApiService.getShiftListByCode(deptCode).then((res) => {
      console.log('查找排班班次res', res, data)
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
        setShiftList(allUser)
        console.log('查找排班班次', ShiftList, allUser, tableData, selectedRowsArray)
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
      <Table bordered size='middle' columns={columns} rowSelection={rowSelection} dataSource={ShiftList} />
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
