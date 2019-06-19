import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
// import { Link } from 'react-router-dom'

import { Table, Input, Switch, message } from 'antd'
// import { authStore, scheduleStore } from 'src/stores'
import service from 'src/services/api'
import { scheduleStore } from 'src/stores'

import emitter from 'src/libs/ev'
import BaseTable, { DoCon } from 'src/components/BaseTable'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import createModal from '../../../../../../libs/createModal'
import AddScheduleNursingModal from '../../modal/AddScheduleNursingModal'

// const Option = Select.Option
export interface Props extends RouteComponentProps {}

export default function MainBox() {
  const [count, setCount] = useState(0)
  const [userList, setUserList] = useState(new Array())
  const [loading, setLoading] = useState(false)

  const addScheduleNursingModal = createModal(AddScheduleNursingModal)

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 35,
      render: (text: string, record: any, index: any) => index + 1
    },
    {
      title: '列入排班',
      dataIndex: 'rangeShow',
      key: '是否排班',
      width: 50,
      render: (text: any, record: any, index: any) =>
        record.id ? (
          <span>
            <Switch
              size='small'
              onChange={(check: any) => {
                record.rangeShow = check
                // console.log(record, userList, 'chekc')
                setUserList([...userList])
              }}
              checked={text}
            />
          </span>
        ) : (
          ''
        )
    },
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
      render(text: any) {
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
    },
    {
      title: '操作',
      key: '操作',
      width: '10%',
      render(text: any, row: any) {
        return (
          <DoCon>
            <span
              onClick={() => {
                service.scheduleUserApiService.delete(row.id).then((res) => {
                  message.success('删除成功')
                  getUserList()
                })
              }}
            >
              删除
            </span>
          </DoCon>
        )
      }
    }
  ]

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
    addScheduleNursingModal.show({
      getTableData: getUserList
    })
  })

  const getUserList = () => {
    let deptCode = scheduleStore.getDeptCode() // '2508' ||
    setLoading(true)
    service.scheduleUserApiService.getByDeptCode(deptCode).then((res) => {
      setLoading(false)

      let tableData = res.data
        .sort((a: any, b: any) => a.sortValie - b.sortValie)
        .map((item: any, key: number) => ({ ...item, key, sortValue: key }))
      setUserList(tableData)
    })
  }

  /** 拖拽start */

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    console.log(dragIndex, hoverIndex, 'hoverIndexhoverIndexhoverIndex')
    const dragRow = userList[dragIndex]
    setUserList(
      update(userList, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
      })
    )
  }

  /** 拖拽end */

  return (
    <Wrapper>
      {/* {JSON.stringify(userList)} */}
      <BaseTable
        bordered
        size='small'
        columns={columns}
        dataSource={userList}
        pagination={false}
        surplusHeight={230}
        loading={loading}
        moveRow={moveRow}
        type={['diagRow', 'spaceRow']}
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
