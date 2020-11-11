import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import BaseTable, { DoCon } from "src/components/BaseTable"
import { ColumnProps } from "antd/lib/table"

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
}

export default function userListEditModal(props: Props) {
  const { visible, onOk, onCancel } = props
  const [userList, setUserList] = useState([] as any[])
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

  const handleOk = () => {

  }

  return <Modal
    title="编辑人员"
    centered
    visible={visible}
    onOk={() => handleOk()}
    onCancel={() => onCancel()}>
    <Wrapper>
      <div className="top-bar">

      </div>
      <BaseTable
        surplusHeight={200}
        rowSelection={{
          selections: rowSelected,
          onChange: (payload: any) => {
            console.log(payload)
          }
        }}
        dataSource={userList}
        columns={columns} />
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div``