import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import { Table } from 'antd'
// import { authStore, scheduleStore } from 'src/stores'
import service from 'src/services/api'
import { scheduleStore } from 'src/stores'

import emitter from 'src/libs/ev'
import BaseTable from 'src/components/BaseTable'

// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

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
    title: '工号',
    dataIndex: 'empNo',
    key: 'empNo',
    width: '10'
  },
  {
    title: '姓名',
    dataIndex: 'empName',
    key: 'empName',
    width: '12%'
  },
  {
    title: '所在科室',
    dataIndex: 'deptName',
    width: '20%',
    key: 'deptName'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    width: '8%',
    render (text: any) {
      if (text === '0') return '男'
      if (text === '1') return '女'
      return text
    }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: '8%'
  },
  {
    title: '职称',
    dataIndex: 'title',
    width: '10%',
    key: 'title'
  },
  {
    title: '现任能级',
    dataIndex: 'currentLevel',
    key: 'currentLevel',
    width: '10%'
  },
  {
    title: '职务',
    dataIndex: 'roleJurisdict',
    key: 'roleJurisdict',
    width: '10%'
  }
]

let data = {
  key: '',
  id: '',
  empNo: '',
  empName: '',
  deptName: '',
  sex: '',
  age: '',
  title: '',
  currentLevel: '',
  roleJurisdict: '',
  rangeShow: null
}

let allUser = new Array()

// rowSelection objects indicates the need for row selection
let rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`onChange:selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record: any, selected: any, selectedRows: any) => {
    record.rangeShow = selected
    console.log('onSelect', record, selected, selectedRows)
  },
  onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
    selectedRows.map((recordItem: any) => {
      recordItem.rangeShow = selected
    })
    changeRows.map((record: any) => {
      record.rangeShow = selected
    })
    console.log('onSelectAll', selected, selectedRows, changeRows)
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.rangeShow === null, // Column configuration not to be checked
    defaultChecked: record.rangeShow,
    name: record.key + ''
  }),
  hideDefaultSelections: true
  // selections: [
  //   {
  //     key: 'all-data',
  //     text: '全选',
  //     onSelect: () => {
  //       // selectedRowKeys
  //     }
  //   },
  //   {
  //     key: 'odd',
  //     text: '单',
  //     onSelect: (changableRowKeys: any) => {
  //       let newSelectedRowKeys = []
  //       newSelectedRowKeys = changableRowKeys.filter((key: any, index: any) => {
  //         if (index % 2 !== 0) {
  //           return false
  //         }
  //         return true
  //       })
  //       console.log('单', newSelectedRowKeys, changableRowKeys)
  //       // selectedRowKeysGroup = newSelectedRowKeys
  //     }
  //   },
  //   {
  //     key: 'even',
  //     text: '双',
  //     onSelect: (changableRowKeys: any) => {
  //       let newSelectedRowKeys = []
  //       newSelectedRowKeys = changableRowKeys.filter((key: any, index: any) => {
  //         if (index % 2 !== 0) {
  //           return true
  //         }
  //         return false
  //       })
  //       console.log('双', newSelectedRowKeys, changableRowKeys)
  //       // selectedRowKeysGroup = newSelectedRowKeys
  //     }
  //   }
  // ]
}

export default function MainBox () {
  const [count, setCount] = useState(0)
  const [userList, setUserList] = useState(new Array())

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getUserList()

    emitter.removeAllListeners('获取选中人员列表')

    emitter.addListener('获取选中人员列表', (callback: any) => {
      if (callback) {
        callback(allUser)
      }
    })
    //
    console.log(count, setCount)
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const getUserList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    service.scheduleUserApiService.getByDeptCode(deptCode).then((res) => {
      console.log('查找排班人员res', res, data)
      let oneUser = new Object()
      allUser = new Array()
      // columns

      if (res && res.data) {
        let tableData = res.data

        let rowKeys = new Array()
        tableData.map((oneObj: any, index: number) => {
          console.log('oneObj', index, oneObj, oneObj.rangeShow)
          if (oneObj.rangeShow === true) {
            console.log('tableDataindex', index)
            rowKeys.push(oneObj.id)
          } else {
            oneObj.rangeShow = false
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
        })

        genEmptyTable(allUser)
        setUserList(allUser)
        console.log('查找排班人员', userList, allUser, tableData)
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
      <BaseTable
        bordered
        size='small'
        columns={columns}
        rowSelection={rowSelection}
        dataSource={userList}
        pagination={false}
        surplusHeight={300}
      />
      {/* <Table
        bordered
        size='small'
        columns={columns}
        rowSelection={rowSelection}
        dataSource={userList}
        pagination={false}
      /> */}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* background: #eee; */
  /* height: 100%; */
  /* padding: 0 20px 20px 20px; */
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
