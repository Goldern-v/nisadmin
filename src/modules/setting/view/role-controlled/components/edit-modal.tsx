import { Input, Modal } from 'antd'
import { message } from 'antd/es'
import React, { useLayoutEffect, useState } from 'react'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'
import SettingApi from '../../../api/SettingApi'

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
  const [val, setVal] = useState('')

  useLayoutEffect(() => {
    if (visible) {
      setVal(curItem.roleDescribe || '')
    }
  }, [visible])

  const onSave = () => {
    SettingApi.updateRoleDescribe({
      roleCode: curItem.roleCode,
      roleDescribe: val
    }).then(() => {
      message.success('更新成功')
      handleOk()
    })
  }

  return (
    <Modal
      title="角色描述"
      visible={visible}
      onOk={onSave}
      onCancel={handleCancel}
    >
      <Wrapper>
        <Input.TextArea value={val} onChange={(e) => setVal(e.target.value)} rows={4} placeholder="请输入角色描述内容"></Input.TextArea>
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
.ant-select {
  width: 80%;
}
`