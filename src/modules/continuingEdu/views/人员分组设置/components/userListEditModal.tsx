import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import BaseTable, { DoCon } from "src/components/BaseTable"
import { ColumnProps } from "antd/lib/table"
import SelectPeopleModal from './selectNurseModal/SelectPeopleModal'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
}

export default function userListEditModal(props: Props) {
  const { visible, onOk, onCancel } = props
  const [userList, setUserList] = useState([] as any[])
  const [addVisible, setAddVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rowSelected, setRowSelected] = useState([] as any[])

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (text: any, record: any, index: number) => index + 1
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      align: 'center',
      width: 150,
    },
    {
      title: '工号',
      dataIndex: 'empNo',
      align: 'center',
      width: 150,
    },
    {
      title: '操作',
      align: 'center',
      width: 150,
      render: (text: any, record: any) => {
        return <DoCon>
          <span>删除</span>
        </DoCon>
      }
    }
  ]

  const handleDelete = (arr: any[]) => {
    console.log(arr.length)
  }

  const handleOk = () => {

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

    console.log(addEmpList)
    setUserList(addEmpList.concat(userList))
  }

  return <React.Fragment>
    <Modal
      title="编辑人员"
      centered
      forceRender
      width={800}
      visible={visible}
      onOk={() => handleOk()}
      onCancel={() => onCancel()}>
      <Wrapper>
        <div className="top-bar">
          <Button onClick={() => handleDelete(rowSelected)} type="danger">删除</Button>
          <Button onClick={() => setAddVisible(true)} type="primary">新增人员</Button>
        </div>
        <BaseTable
          surplusHeight={300}
          rowSelection={{
            selections: rowSelected,
            onChange: (payload: any) => setRowSelected(payload)
          }}
          dataSource={userList}
          columns={columns} />
      </Wrapper>
    </Modal>
    <SelectPeopleModal
      visible={addVisible}
      checkedUserList={[]}
      onOk={() => console.log('onOk')}
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