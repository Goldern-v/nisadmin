import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import FormEdit from './FormEdit'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  editable: boolean,
  params: any,
}

export default function PreviewOrEditModal(props: Props) {
  const { visible, onOk, onCancel, editable, params } = props
  const [editData, setEditData] = useState({} as any)
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    console.log('save')
  }

  const handleSubmit = () => {
    console.log('submit')
  }

  useEffect(() => {
    if (visible) {
      if (params.id) {

      } else if (editable) {

      }
    } else {
      setEditData({})
    }

  }, [visible, params])

  return <Modal
    title={`${editable ? '修改' : '新建'}典型案例库`}
    visible={visible}
    width={900}
    bodyStyle={{ padding: 0 }}
    footer={editable ? (
      <div>
        <Button disabled={loading} onClick={() => onCancel()}>取消</Button>
        <Button loading={loading} ghost type="primary" onClick={() => handleSave()}>存草稿</Button>
        <Button loading={loading} type="primary" onClick={() => handleSubmit()}>提交</Button>
      </div>
    ) : null}
    onCancel={() => onCancel()}
    centered>
    <Wrapper>
      <FormEdit
        editData={editData}
        editable={editable}
        onEditDataChange={(payload: any) => setEditData(payload)} />
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div``