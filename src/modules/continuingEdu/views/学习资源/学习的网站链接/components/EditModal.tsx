import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Col, Input, InputNumber, message, Modal, Row } from 'antd'
import { localityService } from './../api/LocalityService'

const TextArea = Input.TextArea

export interface Props {
  visible: boolean
  onOk?: Function
  onCancel?: Function
  originParams?: any
}

export default function EditModal(props: Props) {
  const { visible, onOk, onCancel, originParams } = props
  const [editParams, setEditParams] = useState({
    name: '',
    websideUrl: '',
    sort: 1,
    briefIntroduction: ''
  } as any)

  const [loading, setLoading] = useState(false)

  const handleOk = () => {
    let errMsg = [] as string[]
    Object.keys(editParams).map((key: string) => {
      let val = editParams[key]
      if (typeof val === 'string' && val.trim() === '') {
        switch (key) {
          case 'name':
            errMsg.push('名称不能为空')
            break
          case 'websideUrl':
            errMsg.push('网址不能为空')
            break
        }
      }
    })

    if (errMsg.length > 0) {
      Modal.warn({
        title: '提示',
        content: <div>
          <React.Fragment>
            {errMsg.map((str: string, idx: number) => <div key={idx}>{str}</div>)}
          </React.Fragment>
        </div>
      })
      return
    }

    setLoading(true)
    localityService
      .addOrUpdate(editParams)
      .then(res => {
        setLoading(false)
        message.success('操作成功')
        onOk && onOk()
      },
        () => setLoading(false))

    setLoading(false)
  }

  useEffect(() => {
    if (visible) {
      if (Object.keys(originParams).length > 0) {
        const {
          id, name, websideUrl, briefIntroduction, sort,
        } = originParams
        setEditParams({
          id, name, websideUrl, briefIntroduction, sort,
        })
      }
    } else {
      setEditParams({
        name: '',
        websideUrl: '',
        sort: 1,
        briefIntroduction: ''
      })
    }
  }, [visible])

  return <Modal
    centered
    onOk={handleOk}
    onCancel={() => onCancel && onCancel()}
    title={'编辑'}
    visible={visible}
    confirmLoading={loading}>
    <Wrapper>
      <Row className="edit-row">
        <Col span={4}>名称：</Col>
        <Col span={20}>
          <Input
            value={editParams.name}
            onChange={(e) =>
              setEditParams({ ...editParams, name: e.target.value })} />
        </Col>
      </Row>
      <Row className="edit-row">
        <Col span={4}>网址：</Col>
        <Col span={20}>
          <Input
            value={editParams.websideUrl}
            onChange={(e) =>
              setEditParams({ ...editParams, websideUrl: e.target.value })} />
        </Col>
      </Row>
      <Row className="edit-row">
        <Col span={4}>排序：</Col>
        <Col span={20}>
          <InputNumber
            value={editParams.sort}
            onChange={(val) =>
              setEditParams({ ...editParams, sort: val })} />
        </Col>
      </Row>
      <Row className="edit-row">
        <Col span={4}>简介：</Col>
        <Col span={20}>
          <TextArea
            value={editParams.briefIntroduction}
            onChange={(e) =>
              setEditParams({ ...editParams, briefIntroduction: e.target.value })} />
        </Col>
      </Row>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  .edit-row{
    margin-bottom: 10px;
    &>*{
      line-height: 32px;
    }
    &:last-of-type{
      margin-bottom: 0;
    }
  }
`