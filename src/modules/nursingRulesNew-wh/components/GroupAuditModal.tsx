import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Radio, Input, message as Message } from 'antd'

const RadioGroup = Radio.Group
const TextArea = Input.TextArea
import { nursingRulesApiService } from './../api/nursingRulesNewService'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'

export interface Props {
  visible: boolean,
  defaultParams: any,
  onOk: Function,
  onCancel: Function
  title?: string,
  bookId?: string
  nodeNums?: any[]
}

export default observer(function GroupAuditModal(props: Props) {
  const { visible, defaultParams, title, onCancel, onOk, nodeNums, bookId } = props;
  const [loading, setLoading] = useState(false)
  const auditTime = moment().format('YYYY-MM-DD');
  const baseParams = {
    remark: '',
    audit: false,
  } as any

  const [params, setParams] = useState(baseParams)

  useEffect(() => {
    if (visible) {
      let newParams = { ...baseParams }

      for (let x in newParams) {
        if (defaultParams[x] !== null && defaultParams[x] !== undefined)
          newParams[x] = defaultParams[x]
      }

      setParams(newParams)
    }

  }, [visible])

  const handleOk = () => {
    if (!bookId) return
    if (!nodeNums || nodeNums.length <= 0) {
      Message.error('缺失待审核章节')
      return
    }

    let reqParams = {
      remark: params.remark,
      auditResult: params.audit ? '1' : '-1',
      nodeNums,
      bookId
    }
    setLoading(true)
    nursingRulesApiService.auditChapters(reqParams)
      .then(res => {
        setLoading(false)
        Message.success('审核成功')
        onOk && onOk()
      }, () => setLoading(false))
  }

  const handleCancel = () => {
    onCancel && onCancel();
  }

  return <Modal
    centered
    title={title || '批量审核'}
    confirmLoading={loading}
    onOk={handleOk}
    onCancel={handleCancel}
    visible={visible}>
    <Wrapper>
      <Row gutter={8}>
        <Col span={4}>当前进度:</Col>
        <Col span={20}>待护理部审核</Col>
      </Row>
      <Row gutter={8}>
        <Col span={4}>审核结果:</Col>
        <Col span={20}>
          <RadioGroup value={params.audit} onChange={(e: any) => setParams({ ...params, audit: e.target.value })}>
            <Radio value={true}>通过</Radio>
            {(authStore.user?.empNo || '').toLowerCase() === 'admin' && <Radio value={false}>退回</Radio>}
          </RadioGroup>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={4}>审核意见:</Col>
        <Col span={20}>
          <TextArea value={params.remark} onChange={(e: any) => setParams({ ...params, remark: e.target.value })} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={4}>审核人:</Col>
        <Col span={6}>
          <Input value={authStore.getUser() && authStore.getUser().empName} disabled />
        </Col>
        <Col span={4}>审核时间:</Col>
        <Col span={6}>
          <Input value={auditTime} disabled />
        </Col>
      </Row>
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
  .ant-row{
    margin-bottom: 8px;
    line-height: 30px;
    font-size: 14px;
  }
`