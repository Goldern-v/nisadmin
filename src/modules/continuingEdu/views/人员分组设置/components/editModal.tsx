import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, InputNumber, Modal, Row } from 'antd'
import { groupSettingService } from './../api/GroupSettingService'
import { message } from 'antd/es'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
  isAdd?: boolean,
}

export default function editModal(props: Props) {
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp } = props
  const [loading, setLoading] = useState(false)
  const [editParmas, setEditPrams] = useState({
    sort: 1,
    groupName: ''
  } as any)

  let saveReq = groupSettingService.addOrUpdatePersonGroup.bind(groupSettingService)

  if (isOtherEmp) {
    saveReq = groupSettingService.addOrUpdateOtherPersonGroup.bind(groupSettingService)
  }

  const handleOk = () => {
    if (editParmas.groupName.trim() == '') {
      message.error('分组名称不能为空')
      return
    }

    setLoading(true)

    saveReq(editParmas)
      .then(res => {
        setLoading(false)
        message.success('操作成功')
        onOk && onOk()
      }, () => setLoading(false))
  }

  useEffect(() => {
    if (visible) {
      if (!isAdd) {
        setEditPrams({
          id: params.id,
          sort: params.sort,
          groupName: params.groupName
        })
      }
    } else {
      setEditPrams({
        sort: 1,
        groupName: ''
      })
    }
  }, [visible])

  return <Modal
    title={isAdd ? "添加分组" : "修改分组"}
    confirmLoading={loading}
    centered
    visible={visible}
    onOk={() => handleOk()}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Row>
        <Col span={6} className="label">分组名称：</Col>
        <Col span={15}>
          <Input
            value={editParmas.groupName}
            onChange={(e: any) =>
              setEditPrams({ ...editParmas, groupName: e.target.value })} />
        </Col>
      </Row>
      <Row>
        <Col span={6} className="label">排序：</Col>
        <Col span={15}>
          <InputNumber
            min={0}
            precision={0}
            step={1}
            value={editParmas.sort}
            onChange={(val: any) => setEditPrams({
              ...editParmas,
              sort: val,
            })} />
        </Col>
      </Row>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  line-height: 30px;
  &>*{
    margin-bottom: 10px;
  }
  .label{
    padding-right: 15px;
    text-align: right;
  }
`