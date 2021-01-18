import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Spin } from 'antd'
import FormEdit from './FormEdit'
import { localityService } from '../api/LocalityService'
import { authStore } from 'src/stores'
import moment from 'moment'
import { message } from 'antd/es'

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
    setLoading(true)
    let saveParams = { ...editData, actionType: 1 }

    if (!saveParams.id) delete saveParams.id
    // console.log(saveParams)
    localityService
      .addOrUpdate(saveParams)
      .then(res => {
        setLoading(false)
        message.success('保存成功', 1, () => onOk())
      }, () => setLoading(false))

  }

  const handleSubmit = () => {
    let submitParams = { ...editData, actionType: 2 }

    if (!submitParams.id) delete submitParams.id

    localityService
      .addOrUpdate(submitParams)
      .then(res => {
        setLoading(false)
        message.success('提交成功', 1, () => onOk())
      }, () => setLoading(false))

  }

  const initNewEditParams = () => {
    setLoading(true)

    localityService.queryFieldRemarks()
      .then(res => {
        setLoading(false)
        if (res.data) {
          let keyArr = Object.keys(res.data)
          if (keyArr.length >= 0) {
            let newEditData = {} as any
            keyArr.map((key: string) => {
              newEditData[key] = ''

              if (key == 'f00003') newEditData[key] = 0
              if (key == 'f00144') newEditData[key] = authStore.user?.empName
              if (key == 'f00142') newEditData[key] = moment().format('YYYY-MM-DD')
            })
            setEditData(newEditData)
          }
        }
      }, () => setLoading(false))

  }

  const getEditData = () => {
    setLoading(true)

    localityService
      .queryFormContent(params.id)
      .then(res => {
        setLoading(false)
        if (res.data)
          setEditData(res.data)
      }, () => setLoading(false))

  }

  useEffect(() => {
    if (visible) {
      if (params.id) {
        getEditData()
      } else if (editable) {
        if (Object.keys(params).length <= 0) {
          initNewEditParams()
        } else {
          getEditData()
        }
      }
    } else {
      setEditData({})
    }

  }, [visible, params])

  return <Modal
    title={`${(() => {
      if (!editable) return '查看'

      if (Object.keys(params).length <= 0)
        return '新建'

      return '修改'
    })()}典型案例库`}
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
      <Spin spinning={loading}>
        <FormEdit
          editData={editData}
          editable={editable}
          onEditDataChange={(payload: any) => setEditData(payload)} />
      </Spin>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div``