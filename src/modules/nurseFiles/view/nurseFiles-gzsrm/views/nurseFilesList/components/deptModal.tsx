import { Modal, Select } from 'antd'
import { message } from 'antd/es'
import React, { useLayoutEffect, useState } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { Obj } from 'src/libs/types'
import SettingApi from 'src/modules/setting/api/SettingApi'
import { authStore } from 'src/stores'
import styled from 'styled-components'
import { nurseFilesListViewModel } from '../NurseFilesListViewModel'

export interface Props extends Obj {
  visible: boolean
  handleOk: () => void
  handleCancel: () => void
  curItem: Obj
  modalType: string
}
const titleObj = {
  role: '角色设置',
  dept: '护理单元配置'
}
const labelObj = {
  role: '角色',
  dept: '护理单元'
}
/**设置科室和角色权限 */
export default function DeptModal(props: Props) {
  const {
    visible,
    handleOk,
    handleCancel,
    curItem,
    modalType = ''
  } = props
  const [selected, setSelected] = useState<string[]>([])
  const [list, setList] = useState<Obj[]>([])

  useLayoutEffect(() => {
    if (visible) {
      if (modalType === 'role') return getRole()
      return getDept()
    }
    unstable_batchedUpdates(() => {
      setSelected([])
      setList([])
    })
  }, [visible, modalType])
  const getRole = () => {
    SettingApi.getRoleByEmpNo(curItem.empNo).then(res => {
      const selectedList: string[] = []
      const allList = (res?.data?.roleList || []).map((v: Obj) => {
        if (v.hasCheck) selectedList.push(v.roleCode as string)
        return { code: v.roleCode, name: v.roleName }
      })
      setList(allList)
      setSelected(selectedList)
    })
  }
  const getDept = () => {
    nurseFilesListViewModel.getDeptByEmpNo(curItem.empNo).then(res => {
      setSelected(res)
      setList(authStore.deptList)
    })
  }

  const onSave = () => {
    let fn = () => nurseFilesListViewModel.updateDeptByEmpNo({
      deptList: selected,
      empNo: curItem.empNo
    })
    if (modalType === 'role') {
      fn = () => SettingApi.setRoleForEmpNo({
        roleList: list.map(v => ({ hasCheck: selected.includes(v.code), roleCode: v.code })),
        empNo: curItem.empNo
      })
    }
    fn().then(res => {
      message.success('更新成功')
      handleOk()
    })
  }

  return (
    <Modal
      title={titleObj[modalType] || ''}
      visible={visible}
      onOk={onSave}
      onCancel={handleCancel}
    >
      <Wrapper>
        <span>{labelObj[modalType] || ''}：</span>
        <Select mode='multiple' value={selected} onChange={(e: any) => {
          setSelected(e)
        }}
          filterOption={(input, option: any) =>
            option?.props?.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }>
          {
            list.map(v => <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>)
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