import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import { Table } from 'antd'
// import { authStore, scheduleStore } from '@/stores'
import service from 'src/services/api'
import { scheduleStore } from '@/stores'

import emitter from 'src/libs/ev'

// import emitter from 'src/libs/ev'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

const columns = [
  {
    title: '工号',
    dataIndex: 'empNo',
    key: 'empNo',
    width: '8%'
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
    width: '30%',
    key: 'deptName'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    width: '8%'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '职称',
    dataIndex: 'title',
    width: '12%',
    key: 'title'
  },
  {
    title: '现任能级',
    dataIndex: 'currentLevel',
    key: 'currentLevel'
  },
  {
    title: '职务',
    dataIndex: 'roleJurisdict',
    key: 'roleJurisdict'
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
    console.log('onSelectAll', selected, selectedRows, changeRows)
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.rangeShow === null, // Column configuration not to be checked
    defaultChecked: record.rangeShow,
    name: record.key
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

      if (res && res.data.data) {
        let tableData = res.data.data

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
      <Table bordered size='middle' columns={columns} rowSelection={rowSelection} dataSource={userList} />
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
