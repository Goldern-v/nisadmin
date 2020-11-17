import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { appStore } from 'src/stores';
import { Link } from 'react-router-dom';
import { Place } from 'src/components/common';
import EditModal from './components/editModal'
import UserListEditModal from './components/userListEditModal'

export interface Props { }

export default function 人员分组设置() {
  const { queryObj } = appStore
  const [editVisible, setEditVisible] = useState(false)
  const [userListVisible, setUserListVisible] = useState(false)

  // console.log(queryObj)

  const [groupData, setGroupData] = useState([
    {
      itemIndex: 1, name: '护理实习生组', userList: [
        { empName: '张三', empNo: 'H1234561' },
        { empName: '李四', empNo: 'H1234562' },
      ]
    },
    {
      itemIndex: 3, name: '护理进修生组', userList: [
        { empName: '王五', empNo: 'H1234563' },
        { empName: '刘大', empNo: 'H1234564' },
      ]
    },
    {
      itemIndex: 2, name: '基地学员组', userList: [
        { empName: '关二', empNo: 'H1234565' },
        { empName: '刘大', empNo: 'H1234566' },
      ]
    },
  ] as any[])

  console.log(queryObj)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (text: any, record: any, index: number) => index + 1
    },
    {
      title: '小组名称',
      dataIndex: 'name',
      align: 'center',
      width: 150,
    },
    {
      title: '成员',
      dataIndex: 'userList',
      render: (list: any[]) => {
        return <div>
          {(list || []).map((item: any) => item.empName).join('、')}
        </div>
      }
    },
    {
      title: '操作',
      align: 'center',
      width: 150,
      render: (text: any, record: any) => {
        return <DoCon>
          <span onClick={() => handleUserEdit(record)}>添加人员</span>
          <span onClick={() => handleEdit(record)}>修改</span>
          <span>删除</span>
        </DoCon>
      }
    }
  ]

  const handleUserEdit = (record: any) => {
    console.log(record)
    setUserListVisible(true)
  }

  const handleEdit = (record: any) => {
    console.log(record)
    setEditVisible(true)
  }

  useEffect(() => {

  }, [])

  return <Wrapper>
    <div className="top-bar">
      <div className="nav">
        <Link to="/continuingEdu">学习培训</Link>
        <span> / </span>
        <Link to="/continuingEdu/人员管理">正式人员</Link>
        <span> / 分组设置</span>
      </div>
      <Place />
      <div className="btn-group">
        <Button onClick={() => appStore.history.goBack()}>返回</Button>
      </div>
    </div>
    <BaseTable
      surplusHeight={150}
      dataSource={groupData}
      columns={columns} />
    <EditModal
      visible={editVisible}
      onOk={() => setEditVisible(false)}
      onCancel={() => setEditVisible(false)} />
    <UserListEditModal
      visible={userListVisible}
      onOk={() => setUserListVisible(false)}
      onCancel={() => setUserListVisible(false)} />
  </Wrapper>
}

const Wrapper = styled.div`
  padding: 0 15px;
  .top-bar{
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    .nav{
      line-height: 32px;
      a {
        color: #666;
      }
    }
  }
`