import { Modal, Select } from 'antd'
import { message } from 'antd/es'
import React, { useLayoutEffect, useState } from 'react'
import { Obj } from 'src/libs/types'
import { authStore } from 'src/stores'
import styled from 'styled-components'
import { nurseFilesListViewModel } from '../NurseFilesListViewModel'

export interface Props extends Obj {
  visible: boolean
    handleOk: () => void
    handleCancel: () => void
    curItem: Obj
}
export default function DeptModal(props: Props) {
  const {
    visible,
    handleOk,
    handleCancel,
    curItem
  } = props
  const [list, setList] = useState<Obj[]>([])

  useLayoutEffect(() => {
    if (visible) {
      nurseFilesListViewModel.getDeptByEmpNo(curItem.empNo).then(res => {
        setList(res)
      })
    }
  }, [visible])
  
  const onSave = () => {
    nurseFilesListViewModel.updateDeptByEmpNo({
      deptList: list,
      empNo: curItem.empNo
    }).then(res => {
      message.success('更新成功')
      handleOk()
    })
  }
  
  return (
    <Modal
      title="护理单元配置"
      visible={visible}
      onOk={onSave}
      onCancel={handleCancel}
    >
      <Wrapper>
        <span>护理单元：</span>
        <Select mode='multiple' value={list} onChange={(e: any) => {
          setList(e)
        }}
        filterOption={(input, option: any) =>
          option?.props?.children
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        }>
          {
            authStore.deptList.map(v => <Select.Option value={v.code} key={v.code}>{ v.name }</Select.Option>)
          }
        </Select>
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
.ant-select {
  width: 80%;
}
`