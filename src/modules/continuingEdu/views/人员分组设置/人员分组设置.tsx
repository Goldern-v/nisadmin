import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message, Modal } from 'antd'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { appStore } from 'src/stores';
import { Link } from 'react-router-dom';
import { Place } from 'src/components/common';
import EditModal from './components/editModal'
import UserListEditModal from './components/userListEditModal'
import { groupSettingService } from './api/GroupSettingService'

export interface Props { }

export default function 人员分组设置() {
  const { queryObj } = appStore
  const [loading, setLoading] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [recordSelected, setRecordSelected] = useState({} as any)
  const [isAdd, setIsAdd] = useState(false)
  const [groupIdSelected, setGroupIdSelected] = useState('')
  const [userListVisible, setUserListVisible] = useState(false)
  const isOtherEmp = queryObj.type == 'other' ? true : false

  const [groupData, setGroupData] = useState([] as any[])

  let listReq = groupSettingService.queryPersonGroupList.bind(groupSettingService)
  let deleteReq = groupSettingService.deletePersonGroup.bind(groupSettingService)

  if (isOtherEmp) {
    listReq = groupSettingService.otherEmpGroupList.bind(groupSettingService)
    deleteReq = groupSettingService.deleteOhterPersonGroup.bind(groupSettingService)
    groupSettingService
  }

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (text: any, record: any, index: number) => index + 1
    },
    {
      title: '小组名称',
      dataIndex: 'groupName',
      align: 'center',
      width: 150,
    },
    {
      title: '成员',
      dataIndex: 'groupPersonNameList',
      render: (list: any[]) => {
        return <div>
          {(list || []).join('、')}
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
          <span onClick={() => handleDelete(record)}>删除</span>
        </DoCon>
      }
    }
  ]

  const getGroupData = () => {
    setLoading(true)

    listReq().then(res => {
      setLoading(false)

      setGroupData(res.data ? res.data.sort((a: any, b: any) => a.sort - b.sort) : [])
    }, err => setLoading(false))
  }

  const handleUserEdit = (record: any) => {
    setGroupIdSelected(record.id)
    setUserListVisible(true)
  }

  const handleAddGroup = () => {
    setIsAdd(true)
    setEditVisible(true)
  }

  const handleEdit = (record: any) => {
    setRecordSelected(record)
    setIsAdd(false)
    setEditVisible(true)
  }

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '删除',
      content: '是否删除该分组?',
      onOk: () => {
        setLoading(true)

        deleteReq(record.id)
          .then(res => {
            message.success('删除成功')
            getGroupData()
          }, () => setLoading(false))
      }
    })
  }

  useEffect(() => {
    getGroupData()
  }, [])

  return <Wrapper>
    <div className="top-bar">
      <div className="nav">
        <Link to="/continuingEdu">学习培训</Link>
        <span> / </span>
        {isOtherEmp && <Link to="/continuingEdu/其他人员">其他人员</Link>}
        {!isOtherEmp && <Link to="/continuingEdu/人员管理">正式人员</Link>}
        <span> / 分组设置</span>
      </div>
      <Place />
      <div className="btn-group">
        <Button onClick={() => handleAddGroup()} type="primary">添加</Button>
        <Button onClick={() => appStore.history.goBack()}>返回</Button>
      </div>
    </div>
    <BaseTable
      loading={loading}
      surplusHeight={180}
      dataSource={groupData}
      columns={columns} />
    <EditModal
      params={recordSelected}
      isAdd={isAdd}
      visible={editVisible}
      isOtherEmp={isOtherEmp}
      onOk={() => {
        getGroupData()
        setEditVisible(false)
      }}
      onCancel={() => setEditVisible(false)} />
    <UserListEditModal
      groupId={groupIdSelected}
      visible={userListVisible}
      isOtherEmp={isOtherEmp}
      onOk={() => {
        getGroupData()
        setUserListVisible(false)
      }}
      onCancel={() => {
        getGroupData()
        setUserListVisible(false)
      }} />
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
  .btn-group{
    &>*{
      margin-left: 10px;
    }
  }
`