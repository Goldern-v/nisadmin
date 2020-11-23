import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message, Modal } from 'antd'
import BaseTable, { DoCon } from "src/components/BaseTable"
import { ColumnProps } from "antd/lib/table"
import SelectPeopleModal from './selectNurseModal/SelectPeopleModal'
import { groupSettingService } from './../api/GroupSettingService'

export interface Props {
  visible: boolean,
  groupId?: string | number,
  onOk: Function,
  onCancel: Function,
  isOtherEmp?: boolean
}

export default function userListEditModal(props: Props) {
  const { visible, onOk, onCancel, isOtherEmp, groupId } = props

  const [query, setQuery] = useState({
    groupId: '' as any,
    pageSize: 20,
    pageIndex: 1,
  })
  const [totalCount, setTotalCount] = useState(0)

  const [userList, setUserList] = useState([] as any[])
  const [addVisible, setAddVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rowSelected, setRowSelected] = useState([] as any[])

  let listReq = groupSettingService.personPageListOfGroup.bind(groupSettingService)
  let deleteReq = groupSettingService.deletePersonsfromGroup.bind(groupSettingService)
  let addReq = groupSettingService.addPersonsForGroup.bind(groupSettingService)

  if (isOtherEmp) {
    listReq = groupSettingService.otherEmpGroupUserList.bind(groupSettingService)
    deleteReq = groupSettingService.deleteOtherPersonsfromGroup.bind(groupSettingService)
    addReq = groupSettingService.addOtherPersonsForGroup.bind(groupSettingService)
  }

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (text: any, record: any, index: number) =>
        query.pageSize * (query.pageIndex - 1) + index + 1
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      width: 150,
    },
    {
      title: '工号',
      dataIndex: isOtherEmp ? 'personIdentifier' : 'empNo',
      align: 'center',
      width: 150,
    },
    {
      title: '操作',
      align: 'center',
      width: 150,
      render: (text: any, record: any) => {
        return <DoCon>
          <span onClick={() => handleDelete([record.id])}>删除</span>
        </DoCon>
      }
    }
  ]

  const handleDelete = (arr: any[]) => {
    if (arr.length <= 0) return

    let deleteText = `确定要删除选中的${arr.length}项吗？`
    if (arr.length == 1) deleteText = `确定要删除当前项目吗？`

    Modal.confirm({
      title: '删除',
      content: deleteText,
      onOk: () => {
        setLoading(true)
        deleteReq(groupId, {
          ids: arr
        })
          .then(res => {
            message.success('操作成功')
            setQuery({ ...query, pageIndex: 1 })
          }, () => setLoading(false))
      }
    })
  }

  const saveAddEmpList = (empGroup: any[]) => {
    console.log(empGroup)
    let addEmpList = [] as any[]

    //不重复的加入新添加人员
    const addItem = (target: any) => {
      if (!target.empNo) return

      let sameItem = addEmpList.find((item: any) => item.empNo == target.empNo)

      if (!sameItem) addEmpList.push(target)
    }

    for (let i = 0; i < empGroup.length; i++) {
      let groupItem = empGroup[i]
      if (groupItem.empNo) {
        addItem({
          empName: groupItem.empName,
          empNo: groupItem.empNo
        })
      } else {
        let userList = groupItem.userList
        if (userList && userList.length > 0) {
          for (let j = 0; j < userList.length; j++) {
            let child = userList[j]
            if (child.empNo) {
              addItem({
                empName: child.empName,
                empNo: child.empNo
              })
            }
          }
        }
      }
    }

    if (addEmpList.length <= 0) return

    let saveParams = {
      groupId,
      personList: isOtherEmp ? addEmpList.map((item: any) => ({
        personIdentifier: item.empNo,
        name: item.empName
      })) : addEmpList
    }

    setLoading(true)

    addReq(saveParams)
      .then(res => {
        message.success('添加成功')
        getUserList()
      }, () => setLoading(false))
  }

  const getUserList = () => {
    setLoading(true)
    setRowSelected([])
    listReq(query)
      .then(res => {
        setLoading(false)
        setUserList(res.data.list || [])
        setTotalCount(res.data.totalCount || 0)
      }, () => setLoading(false))
  }

  useEffect(() => {
    if (query.groupId !== (undefined || ''))
      getUserList()
  }, [query])

  useEffect(() => {
    if (visible) {
      console.log(groupId)
      setQuery({
        ...query,
        groupId: groupId || '',
        pageIndex: 1,
      })
    }
  }, [visible])

  return <React.Fragment>
    <Modal
      title="编辑人员"
      centered
      confirmLoading={loading}
      forceRender
      width={800}
      visible={visible}
      onOk={() => onCancel()}
      onCancel={() => onCancel()}>
      <Wrapper>
        <div className="top-bar">
          <Button onClick={() => handleDelete(rowSelected)} type="danger">删除</Button>
          <Button onClick={() => setAddVisible(true)} type="primary">新增人员</Button>
        </div>
        <BaseTable
          surplusHeight={350}
          rowKey={'id'}
          rowSelection={{
            selections: rowSelected,
            onChange: (payload: any) => setRowSelected(payload)
          }}
          loading={loading}
          dataSource={userList}
          columns={columns}
          pagination={{
            current: query.pageIndex,
            pageSize: query.pageSize,
            total: totalCount,
            onChange: (pageIndex: number) =>
              setQuery({ ...query, pageIndex }),
            onShowSizeChange: (pageIndex: number, pageSize: number) =>
              setQuery({ ...query, pageIndex: 1, pageSize })
          }} />
      </Wrapper>
    </Modal>
    <SelectPeopleModal
      visible={addVisible}
      checkedUserList={[]}
      onOk={() => console.log('onOk')}
      isOtherEmp={isOtherEmp}
      onCancel={() => setAddVisible(false)}
      onClose={() => setAddVisible(false)}
      onOkCallBack={(payload: any) => {
        saveAddEmpList(payload)
      }} />
  </React.Fragment>
}
const Wrapper = styled.div`
  .top-bar{
    &>*{
      margin-right: 5px;
    }
  }
  #baseTable{
    padding: 15px 0 0 0;
  }
`