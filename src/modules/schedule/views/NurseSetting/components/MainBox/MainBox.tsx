import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import { Table, Input, Switch } from 'antd'
// import { authStore, scheduleStore } from 'src/stores'
import service from 'src/services/api'
import { scheduleStore } from 'src/stores'

import emitter from 'src/libs/ev'
import BaseTable from 'src/components/BaseTable'

// import { DragDropContext, DragSource, DropTarget } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'
// import update from 'immutability-helper'

// let dragingIndex = -1

// import emitter from 'src/libs/ev'
import createModal from '../../../../../../libs/createModal'
import AddScheduleNursingModal from '../../modal/AddScheduleNursingModal'
import { Component } from 'react'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function MainBox () {
  const [count, setCount] = useState(0)
  const [userList, setUserList] = useState(new Array())
  const [loading, setLoading] = useState(false)

  const addScheduleNursingModal = createModal(AddScheduleNursingModal)
  const onPressEnter = (e: any, record: any) => {
    record.sortValue = ~~e.target.value
    // userList.sort((a, b) => {
    //   return ~~a.sortValue - ~~b.sortValue
    // })
    let newUserList = JSON.parse(JSON.stringify(userList))
    setUserList(new Array())
    console.log('onPressEnter', e, e.target.value, record, userList)
    setUserList(newUserList)
  }

  const onRow = (record: any, rowIndex: any) => {
    return {
      onClick: (event: any) => {
        console.log('onClick', event, record, record.sortValue, rowIndex)
      } // click row
      // onDoubleClick: event => {}, // double click row
      // onContextMenu: event => {}, // right button click row
      // onMouseEnter: event => {}, // mouse enter row
      // onMouseLeave: event => {}, // mouse leave row
    }
  }
  // const onHeaderRow={column => {
  //   return {
  //     onClick: () => {}, // click header row
  //   };
  // }}

  const columns = [
    {
      title: '序号',
      dataIndex: 'sortValue',
      key: 'sortValue',
      width: 35,
      render: (text: string, record: any, index: any) =>
        record.id ? (
          <span>
            <Input
              onChange={(e: any) => {
                onPressEnter(e, record)
              }}
              style={{ background: 'transparent', border: 'none' }}
              defaultValue={text}
            />
          </span>
        ) : (
          ''
        )
      // record.id ? <span style={{ width: '60px' }}><Input defaultValue={index + 1} /></span> : ''
    },
    // {
    //   title: '是否排班',
    //   dataIndex: 'rangeShow',
    //   key: '是否排班',
    //   width: 35,
    //   render: (text: any, record: any, index: any) =>
    //     record.id ? (
    //       <span>
    //         <Switch
    //           size='small'
    //           onChange={(check: any) => {
    //             record.rangeShow = check
    //             // console.log(record, userList, 'chekc')
    //             setUserList([...userList])
    //           }}
    //           checked={text}
    //         />
    //       </span>
    //     ) : (
    //       ''
    //     )
    //   // record.id ? <span style={{ width: '60px' }}><Input defaultValue={index + 1} /></span> : ''
    // },
    // {
    //   title: 'rangeShow',
    //   dataIndex: 'rangeShow',
    //   width: 80,
    //   key: 'rangeShowrangeShow'
    // },
    {
      title: '所在科室',
      dataIndex: 'deptName',
      width: 120,
      key: 'deptName'
    },
    {
      title: '工号',
      dataIndex: 'empNo',
      key: 'empNo',
      width: 120
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      key: 'empName',
      width: 90
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: 65,
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
      width: 35
    },
    {
      title: '职称',
      dataIndex: 'newTitle',
      width: '10%',
      key: 'newTitle'
    },
    {
      title: '层级',
      dataIndex: 'nurseHierarchy',
      key: 'nurseHierarchy',
      width: '10%'
    },
    {
      title: '职务',
      dataIndex: 'job',
      key: 'job',
      width: '10%'
    }
  ]

  let data = {
    key: '',
    id: '',
    sortValue: '',
    empNo: '',
    empName: '',
    deptName: '',
    sex: '',
    age: '',
    newTitle: '',
    nurseHierarchy: '',
    job: '',
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

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getUserList()

    //
    console.log(count, setCount)
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  emitter.removeAllListeners('获取选中人员列表')

  emitter.addListener('获取选中人员列表', (callback: any) => {
    if (callback) {
      callback(userList).then((res: any) => {
        getUserList()
      })
    }
  })

  emitter.removeAllListeners('刷新人员列表')

  emitter.addListener('刷新人员列表', () => {
    getUserList()
  })

  emitter.removeAllListeners('删除排班人员')

  emitter.addListener('删除排班人员', () => {
    getUserList()
  })

  emitter.removeAllListeners('添加排班人员')

  emitter.addListener('添加排班人员', () => {
    addScheduleNursingModal.show({})
  })

  const getUserList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    setLoading(true)
    service.scheduleUserApiService.getByDeptCode(deptCode).then((res) => {
      setLoading(false)

      let oneUser = new Object()
      allUser = new Array()
      // columns

      if (res && res.data) {
        let tableData = res.data

        let rowKeys = new Array()
        tableData.map((oneObj: any, index: number) => {
          console.log('oneObj', index, oneObj.sortValue, oneObj, oneObj.rangeShow)
          //
          if (oneObj.rangeShow === true) {
            console.log('tableDataindex', index)
            rowKeys.push(oneObj.id)
          } else {
            oneObj.rangeShow = false
          }
          // if (oneObj.sortValue === undefined || oneObj.sortValue == null || oneObj.sortValue == '') {
          //   oneObj.sortValue = index + ''
          // } else {
          //   oneObj.sortValue = oneObj.sortValue
          // }
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

        // genEmptyTable(allUser)
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
      {/* {JSON.stringify(userList)} */}
      <BaseTable
        bordered
        size='small'
        columns={columns}
        rowSelection={rowSelection}
        dataSource={userList}
        pagination={false}
        surplusHeight={240}
        onRow={onRow}
        loading={loading}
      />
      <addScheduleNursingModal.Component />
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
    /* .ant-table-selection-column{
      width: 30px!important;
    } */
  }

  /* 表格前端打勾样式 */
  .ant-table-thead > tr > th.ant-table-selection-column,
  .ant-table-tbody > tr > td.ant-table-selection-column,
  .ant-table-thead > tr:first-child > th:first-child {
    width: 20px !important;
    max-width: 20px !important;
  }

  /* tr > th .ant-table-selection-column {
    width: 30px!important;
  } */

  .ant-input {
    width: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  .ant-input:focus {
    outline: none !important;
    border: none !important;
    background: yellow !important;
    color: black !important;
    border-radius: 0px;
  }
`
